/**
 * Email Service — SA Thread & Accessories Ltd.
 * =============================================
 * Abstraction layer over email delivery.
 *
 * EMAIL_MODE environment variable controls behavior:
 *
 *   EMAIL_MODE=console  (default / development)
 *     → Emails are printed to the server console only.
 *     → OTP is clearly marked [DEV ONLY].
 *     → No actual email is sent. No SMTP credentials required.
 *
 *   EMAIL_MODE=smtp  (production)
 *     → Emails are sent via Nodemailer using SMTP_* env vars.
 *     → SMTP credentials must be configured in environment.
 *
 * To switch from development to production:
 *   Set EMAIL_MODE=smtp and configure SMTP_HOST, SMTP_PORT,
 *   SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM in .env.local
 *
 * IMPORTANT: OTP must NEVER be returned in API responses or logged
 * in a way accessible to end users in production mode.
 */

import { createSmtpTransporter, getFromAddress } from "@/lib/smtp";

const EMAIL_MODE = process.env.EMAIL_MODE || "console";

/**
 * Send the password reset OTP email.
 *
 * @param {object} options
 * @param {string} options.toEmail     - Recipient email address
 * @param {string} options.otp         - The plaintext OTP (6 digits) — NEVER logged in production
 * @param {number} options.expiryMinutes - OTP validity in minutes
 * @returns {Promise<void>}
 */
export async function sendPasswordResetOtp({ toEmail, otp, expiryMinutes = 10 }) {
  if (EMAIL_MODE === "smtp") {
    await sendOtpViaSMTP({ toEmail, otp, expiryMinutes });
  } else {
    // Console / development mode
    sendOtpToConsole({ toEmail, otp, expiryMinutes });
  }
}

// ─── Internal: Console Mode ──────────────────────────────────────────────────

function sendOtpToConsole({ toEmail, otp, expiryMinutes }) {
  const separator = "═".repeat(60);
  console.log(`\n${separator}`);
  console.log(`  [DEV ONLY] Password Reset OTP`);
  console.log(`  To:      ${toEmail}`);
  console.log(`  OTP:     ${otp}`);
  console.log(`  Expires: ${expiryMinutes} minutes`);
  console.log(`  NOTE:    This OTP is shown in console because`);
  console.log(`           EMAIL_MODE=console (development mode).`);
  console.log(`           Set EMAIL_MODE=smtp for real email delivery.`);
  console.log(`${separator}\n`);
}

// ─── Internal: SMTP Mode ─────────────────────────────────────────────────────

async function sendOtpViaSMTP({ toEmail, otp, expiryMinutes }) {
  const transporter = createSmtpTransporter();
  const from = getFromAddress();

  const mailOptions = {
    from,
    to: toEmail,
    subject: "SA Thread & Accessories Ltd. — Password Reset OTP",
    html: buildOtpEmailHtml({ otp, expiryMinutes }),
    text: buildOtpEmailText({ otp, expiryMinutes }),
  };

  await transporter.sendMail(mailOptions);
}

// ─── Email Templates ─────────────────────────────────────────────────────────

function buildOtpEmailHtml({ otp, expiryMinutes }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset OTP — SA Thread & Accessories Ltd.</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background-color: #1F4D2C; padding: 32px 40px; text-align: center; }
    .header-title { color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: 0.5px; }
    .header-sub { color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0; }
    .body { padding: 36px 40px; }
    .greeting { color: #1a1a2e; font-size: 16px; margin: 0 0 16px; }
    .description { color: #4a5568; font-size: 14px; line-height: 1.6; margin: 0 0 28px; }
    .otp-box { background: #f0faf4; border: 2px solid #1F4D2C; border-radius: 10px; padding: 24px; text-align: center; margin: 0 0 28px; }
    .otp-label { color: #4a5568; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 10px; }
    .otp-code { color: #1F4D2C; font-size: 40px; font-weight: 700; letter-spacing: 10px; margin: 0; font-variant-numeric: tabular-nums; }
    .otp-expiry { color: #718096; font-size: 13px; margin: 10px 0 0; }
    .warning-box { background: #fffbeb; border-left: 3px solid #f59e0b; padding: 14px 16px; border-radius: 6px; margin: 0 0 24px; }
    .warning-text { color: #78350f; font-size: 13px; line-height: 1.5; margin: 0; }
    .footer { background: #f7fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e8ecf0; }
    .footer-text { color: #a0aec0; font-size: 12px; margin: 0; }
    .company-name { color: #4a5568; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <p class="header-title">SA Thread &amp; Accessories Ltd.</p>
      <p class="header-sub">Admin Panel — Security Notification</p>
    </div>
    <div class="body">
      <p class="greeting">Hello, Admin</p>
      <p class="description">
        We received a request to reset the password for your admin account.
        Use the one-time password (OTP) below to verify your identity and proceed
        with resetting your password.
      </p>

      <div class="otp-box">
        <p class="otp-label">Your Password Reset OTP</p>
        <p class="otp-code">${otp}</p>
        <p class="otp-expiry">This OTP expires in <strong>${expiryMinutes} minutes</strong></p>
      </div>

      <div class="warning-box">
        <p class="warning-text">
          ⚠️ <strong>Security Notice:</strong> If you did not request a password reset,
          please ignore this email. Your account remains secure. Do not share this OTP
          with anyone — our team will never ask for it.
        </p>
      </div>

      <p class="description">
        This OTP is valid for a single use only. After use or expiry, it becomes invalid.
        If you need a new OTP, please use the "Forgot Password" option again.
      </p>
    </div>
    <div class="footer">
      <p class="footer-text">
        &copy; ${new Date().getFullYear()} <span class="company-name">SA Thread &amp; Accessories Ltd.</span><br />
        This is an automated security email. Please do not reply.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildOtpEmailText({ otp, expiryMinutes }) {
  return `SA Thread & Accessories Ltd. — Password Reset OTP

Hello, Admin,

We received a request to reset the password for your admin account.

Your Password Reset OTP: ${otp}

This OTP expires in ${expiryMinutes} minutes. It is valid for a single use only.

SECURITY NOTICE: If you did not request a password reset, please ignore this email.
Do not share this OTP with anyone.

— SA Thread & Accessories Ltd. (Automated Security Notification)
`;
}
