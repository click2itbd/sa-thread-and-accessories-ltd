import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple rate limiter using a Map (in-memory, works for a single instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
  try {
    // Basic rate limiting by IP
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

    // Parse multipart form data (fields + resume file)
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const department = formData.get("department")?.toString() || "";
    const experience = formData.get("experience")?.toString() || "";
    const education = formData.get("education")?.toString() || "";
    const expectedSalary = formData.get("expectedSalary")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    const honeypot = formData.get("honeypot")?.toString() || "";
    const resume = formData.get("resume");

    // Honeypot check (if it's filled out, it's likely a bot)
    if (honeypot) {
      // Return a fake success response to trick the bot
      return Response.json({ success: true, message: "Application sent successfully" });
    }

    // Basic required-field validation
    if (!name || !email || !phone || !department || !experience || !message) {
      return Response.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // Resume validation
    let attachments = [];
    if (resume && typeof resume === "object" && resume.size > 0) {
      if (!ALLOWED_FILE_TYPES.includes(resume.type)) {
        return Response.json({ success: false, error: "Invalid resume file type." }, { status: 400 });
      }
      if (resume.size > MAX_FILE_SIZE) {
        return Response.json({ success: false, error: "Resume file too large (max 5MB)." }, { status: 400 });
      }

      const arrayBuffer = await resume.arrayBuffer();
      const base64Content = Buffer.from(arrayBuffer).toString("base64");

      attachments.push({
        filename: resume.name || "resume",
        content: base64Content,
      });
    } else {
      return Response.json({ success: false, error: "Resume file is required." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'SA Thread & Accessories <onboarding@resend.dev>',
      to: ['muntasiralamresti@gmail.com'], // Use a verified email in production
      reply_to: email,
      subject: `New Job Application: ${name} — ${department}`,
      attachments,
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
          .grid { display: table; width: 100%; margin-bottom: 24px; }
          .grid-row { display: table-row; }
          .grid-cell { display: table-cell; width: 50%; padding-bottom: 20px; vertical-align: top; }
          .footer { background-color: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
          .footer p { margin: 0; font-size: 12px; color: #8c98a4; }
          .attachment-note { background-color: #f0f4ff; border: 1px solid #dbe4ff; border-radius: 8px; padding: 14px 18px; font-size: 13px; color: #1F4D2C; margin-top: 8px; }
        </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>SA Thread &amp; Accessories</h1>
              <p>New Job Application</p>
            </div>
            <div class="content">
              <div class="grid">
                <div class="grid-row">
                  <div class="grid-cell">
                    <span class="label">Full Name</span>
                    <p class="value">${name}</p>
                  </div>
                  <div class="grid-cell">
                    <span class="label">Phone Number</span>
                    <p class="value">${phone}</p>
                  </div>
                </div>
                <div class="grid-row">
                  <div class="grid-cell">
                    <span class="label">Email Address</span>
                    <p class="value"><a href="mailto:${email}" style="color: #1F4D2C; text-decoration: none; font-weight: 600;">${email}</a></p>
                  </div>
                  <div class="grid-cell">
                    <span class="label">Department / Section</span>
                    <p class="value">${department}</p>
                  </div>
                </div>
                <div class="grid-row">
                  <div class="grid-cell">
                    <span class="label">Experience Level</span>
                    <p class="value">${experience}</p>
                  </div>
                  <div class="grid-cell">
                    <span class="label">Education</span>
                    <p class="value">${education || "—"}</p>
                  </div>
                </div>
                <div class="grid-row">
                  <div class="grid-cell">
                    <span class="label">Expected Salary</span>
                    <p class="value">${expectedSalary || "—"}</p>
                  </div>
                </div>
              </div>

              <div class="field">
                <span class="label">Cover Letter / Message</span>
                <div class="message-box">${message}</div>
              </div>

              <div class="attachment-note">
                📎 Resume/CV attached: <strong>${resume.name}</strong>
              </div>
            </div>
            <div class="footer">
              <p>This email was automatically generated from your website careers form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      return Response.json({ success: false, error }, { status: 400 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}