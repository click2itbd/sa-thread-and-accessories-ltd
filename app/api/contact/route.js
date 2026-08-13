import ContactMessage from '@/lib/models/ContactMessage';
import connectToDatabase from '@/lib/mongoose';

// ============================================================================
// EMAIL PROVIDER: Resend (DISABLED)
// ============================================================================
// Original code used Resend API to send contact form emails.
// It is commented out below and replaced with SMTP/Nodemailer.
//
// To re-enable Resend later:
// 1. Uncomment the Resend import and initialization
// 2. Uncomment the resend.emails.send() block
// 3. Comment out the Nodemailer transporter block
// ============================================================================

// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================================================
// EMAIL PROVIDER: SMTP (Nodemailer) - ACTIVE
// ============================================================================
// Using Nodemailer with SMTP configuration from lib/smtp.js
// Configure SMTP credentials in .env.local:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO
// ============================================================================
import { transporter, getFromAddress, getToAddress } from '@/lib/smtp';

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const currentTime = Date.now();

    if (ip !== "unknown") {
      const userRequests = rateLimitMap.get(ip) || [];
      const recentRequests = userRequests.filter(time => currentTime - time < RATE_LIMIT_WINDOW_MS);

      if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
        return Response.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
      }

      recentRequests.push(currentTime);
      rateLimitMap.set(ip, recentRequests);
    }

    const { name, email, phone, subject, message, honeypot } = await request.json();

    if (honeypot) {
      return Response.json({ success: true, message: "Message sent successfully" });
    }

    // ============================================================================
    // EMAIL: Resend (DISABLED)
    // ============================================================================
    // const { data, error } = await resend.emails.send({
    //   from: 'SA Thread & Accessories <onboarding@resend.dev>',
    //   to: ['muntasiralamresti@gmail.com'],
    //   reply_to: email,
    //   subject: `New Contact Form Submission: ${subject}`,
    //   html: `...`
    // });
    // ============================================================================

    // ============================================================================
    // EMAIL: SMTP via Nodemailer (ACTIVE)
    // ============================================================================
    // Sends contact form submission to site admin via SMTP
    // Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local
    // ============================================================================
    let emailSent = false;
    try {
      const mailOptions = {
        from: getFromAddress(),
        to: getToAddress(),
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
            .header { background-color: #1F4D2C; padding: 30px 40px; text-align: center; }
            .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
            .header p { margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px; }
            .content { padding: 40px; }
            .field { margin-bottom: 24px; }
            .label { display: block; font-size: 12px; text-transform: uppercase; color: #8c98a4; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 6px; }
            .value { font-size: 16px; color: #2c3b52; line-height: 1.5; margin: 0; }
            .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 8px; font-size: 15px; color: #4a5568; line-height: 1.6; white-space: pre-wrap; }
            .footer { background-color: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
            .footer p { margin: 0; font-size: 12px; color: #8c98a4; }
          </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>SA Thread &amp; Accessories</h1>
                <p>New Contact Form Inquiry</p>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Sender Name</span>
                  <p class="value">${name}</p>
                </div>
                <div class="field">
                  <span class="label">Email Address</span>
                  <p class="value"><a href="mailto:${email}" style="color: #1F4D2C; text-decoration: none; font-weight: 600;">${email}</a></p>
                </div>
                <div class="field">
                  <span class="label">Phone Number</span>
                  <p class="value">${phone}</p>
                </div>
                <div class="field">
                  <span class="label">Subject</span>
                  <p class="value" style="font-weight: 600;">${subject}</p>
                </div>
                <div class="field">
                  <span class="label">Message</span>
                  <div class="message-box">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was automatically generated from your website contact form.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
    } catch (emailError) {
      console.error("SMTP email send failed:", emailError);
      // Continue to save to database even if email fails
    }

    await connectToDatabase();
    await ContactMessage.create({
      fullName: name,
      email,
      phone,
      subject,
      message,
    });

    return Response.json({ 
      success: true, 
      data: { emailSent },
      message: emailSent ? "Message sent successfully" : "Message saved but email notification failed. We will contact you soon."
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
