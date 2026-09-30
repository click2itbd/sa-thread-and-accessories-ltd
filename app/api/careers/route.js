import Application from '@/lib/models/Application';
import connectToDatabase from '@/lib/mongoose';
import ImageKit from "imagekit";

function getImageKit() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  if (!publicKey || !privateKey || !urlEndpoint) {
    return null;
  }
  return new ImageKit({ publicKey, privateKey, urlEndpoint });
}

// ============================================================================
// EMAIL PROVIDER: Resend (DISABLED)
// ============================================================================
// Original code used Resend API to send job application emails.
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


const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

    if (honeypot) {
      return Response.json({ success: true, message: "Application sent successfully" });
    }

    if (!name || !email || !phone || !department || !experience || !message) {
      return Response.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    let cvFileUrl = "";
    let attachments = [];
    if (resume && typeof resume === "object" && resume.size > 0) {
      if (!ALLOWED_FILE_TYPES.includes(resume.type)) {
        return Response.json({ success: false, error: "Invalid resume file type." }, { status: 400 });
      }
      if (resume.size > MAX_FILE_SIZE) {
        return Response.json({ success: false, error: "Resume file too large (max 5MB)." }, { status: 400 });
      }

      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const imagekit = getImageKit();
      if (imagekit) {
        try {
          const uploadResult = await imagekit.upload({
            file: buffer,
            fileName: resume.name || `resume-${Date.now()}`,
            folder: "sathread/applications",
          });
          cvFileUrl = uploadResult.url;
        } catch (uploadErr) {
          console.warn("ImageKit upload failed:", uploadErr.message);
        }
      }

      const base64Content = Buffer.from(bytes).toString("base64");
      attachments.push({
        filename: resume.name || "resume",
        content: base64Content,
      });
    } else {
      return Response.json({ success: false, error: "Resume file is required." }, { status: 400 });
    }

    await connectToDatabase();
    await Application.create({
      fullName: name,
      email,
      phone,
      appliedPosition: department,
      cvFile: cvFileUrl,
      coverLetter: message,
    });

    // ============================================================================
    // EMAIL: Resend (DISABLED)
    // ============================================================================
    // const { data, error } = await resend.emails.send({
    //   from: 'SA Thread & Accessories <onboarding@resend.dev>',
    //   to: ['asif.sathread@gmail.com'],
    //   reply_to: email,
    //   subject: `New Job Application: ${name} — ${department}`,
    //   attachments,
    //   html: `...`
    // });
    // ============================================================================

    // ============================================================================
    // EMAIL: SMTP via Nodemailer (ACTIVE)
    // ============================================================================
    // Sends job application notification to site admin via SMTP
    // Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local
    // ============================================================================
    
    let emailSent = false;
    try {
      if (process.env.RESEND_API_KEY) {
        const { Resend } = require('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const { data, error } = await resend.emails.send({
          from: process.env.RESEND_FROM || 'SA Thread & Accessories <onboarding@resend.dev>',
          to: [process.env.SMTP_TO || 'asif.sathread@gmail.com'],
          reply_to: email,
          subject: `New Job Application: ${name} - ${department}`,
          attachments,
          text: `New Job Application\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDepartment: ${department}\nExperience: ${experience}\nEducation: ${education || "N/A"}\nExpected Salary: ${expectedSalary || "N/A"}\n\nCover Letter/Message:\n${message}\n\n[Resume attached as file: ${resume.name}]\n\n--\nThis email was automatically generated from your website careers form.`,
          html: `<!DOCTYPE html><html><body><h1>New Job Application</h1><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Department: ${department}</p><p>Experience: ${experience}</p><p>Message:</p><p>${message}</p></body></html>`
        });
        
        if (error) {
          console.error("Resend error:", error);
        } else {
          emailSent = true;
        }
      }
    } catch (e) {}

    return Response.json({ 
      success: true, 
      data: { emailSent },
      message: emailSent ? "Application sent successfully" : "Application saved but email notification failed. We will contact you soon."
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

