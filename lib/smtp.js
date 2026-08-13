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
 *   Example: smtp.gmail.com, smtp.office365.com, mail.yourdomain.com
 *   Required: Yes
 *
 * SMTP_PORT: Your SMTP server port
 *   Example: 587 (TLS), 465 (SSL), 25 (plain)
 *   Required: Yes
 *
 * SMTP_SECURE: Whether to use SSL/TLS
 *   Example: true for port 465, false for port 587/25
 *   Required: No (defaults to false)
 *
 * SMTP_USER: Your SMTP authentication email/username
 *   Example: your-email@gmail.com, no-reply@yourdomain.com
 *   Required: Yes
 *
 * SMTP_PASS: Your SMTP password or app-specific password
 *   Example: your-app-password (for Gmail use App Password)
 *   Required: Yes
 *
 * SMTP_FROM: The "From" address for outgoing emails
 *   Example: SA Thread & Accessories <noreply@sathread.com>
 *   Required: Yes
 *
 * SMTP_TO: Default recipient email address
 *   Example: muntasiralamresti@gmail.com
 *   Required: Yes
 */

// TODO: Replace these with your actual SMTP credentials
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
const smtpUser = process.env.SMTP_USER || "your-email@gmail.com";
const smtpPass = process.env.SMTP_PASS || "your-app-password";
const smtpFrom = process.env.SMTP_FROM || "SA Thread & Accessories <noreply@sathread.com>";
const smtpTo = process.env.SMTP_TO || "muntasiralamresti@gmail.com";

/**
 * Create Nodemailer transporter
 * Do NOT edit this unless you need custom SMTP options
 */
export const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

/**
 * Verify SMTP connection
 * Call this to test if SMTP credentials are working
 */
export async function verifySmtpConnection() {
  try {
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
  return smtpFrom;
}

/**
 * Get default "to" address
 */
export function getToAddress() {
  return smtpTo;
}
