import nodemailer from "nodemailer";

/**
 * SMTP Configuration for SA Thread & Accessories Ltd
 * ===================================================
 * 
 * This file configures the Nodemailer transporter for sending emails
 * via SMTP (e.g., Gmail, Outlook, cPanel, Zoho, or any POP3 email hosting).
 * 
 * ENVIRONMENT VARIABLES REQUIRED:
 * -------------------------------
 * SMTP_HOST: Your SMTP server hostname
 * SMTP_PORT: Your SMTP server port
 * SMTP_SECURE: Whether to use SSL/TLS
 * SMTP_USER: Your SMTP authentication email/username
 * SMTP_PASS: Your SMTP password or app-specific password
 * SMTP_FROM: The "From" address for outgoing emails
 * SMTP_TO: Default recipient email address
 */

/**
 * Create Nodemailer transporter lazily
 * This ensures the app doesn't crash on startup if SMTP vars are missing
 */
export function createSmtpTransporter() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    if (process.env.EMAIL_MODE === "smtp") {
      console.warn("WARNING: EMAIL_MODE is smtp but SMTP credentials are not fully configured in environment variables.");
    }
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

/**
 * Verify SMTP connection
 * Call this to test if SMTP credentials are working
 */
export async function verifySmtpConnection() {
  try {
    const transporter = createSmtpTransporter();
    await transporter.verify();
    console.log("SMTP connection verified successfully");
    return true;
  } catch (error) {
    console.error("SMTP connection failed:", error.message);
    return false;
  }
}

/**
 * Get default "from" address
 */
export function getFromAddress() {
  return process.env.SMTP_FROM || "SA Thread & Accessories <noreply@sathread.com>";
}

/**
 * Get default "to" address
 */
export function getToAddress() {
  return process.env.SMTP_TO || "muntasiralamresti@gmail.com";
}
