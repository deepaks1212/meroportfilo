// utils/emailService.js
const nodemailer = require("nodemailer");

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password
    },
  });
};

/**
 * Send notification email to portfolio owner
 */
const sendOwnerNotification = async ({ name, email, subject, message }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `📬 New Contact: ${subject || "Portfolio Message"} — from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <div style="background: #0A0F1E; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #00D9B8; margin: 0; font-size: 22px;">📩 New Portfolio Message</h1>
        </div>
        <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 80px;">From</td>
              <td style="padding: 8px 0; color: #111827; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00D9B8;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Subject</td>
              <td style="padding: 8px 0; color: #111827;">${subject || "Portfolio Contact"}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
          <p style="color: #374151; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          <div style="margin-top: 20px; padding: 12px; background: #f0fdf4; border-left: 4px solid #00D9B8; border-radius: 4px;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your Portfolio Message')}" 
               style="color: #00D9B8; font-weight: 600; text-decoration: none;">
              ↩ Reply to ${name}
            </a>
          </div>
        </div>
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
          Sent from your portfolio contact system
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send confirmation / AI auto-reply to the sender
 */
const sendSenderConfirmation = async ({ name, email, aiReply }) => {
  const transporter = createTransporter();

  const defaultReply = `Hi ${name},\n\nThank you for reaching out! I've received your message and will get back to you within 24–48 hours.\n\nBest,\nAlex`;

  const mailOptions = {
    from: `"Alex Chen" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thanks for reaching out! ✉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <div style="background: #0A0F1E; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #00D9B8; margin: 0; font-size: 22px;">&lt;Alex /&gt;</h1>
          <p style="color: #7A8BA8; margin: 8px 0 0; font-size: 14px;">Full-Stack Developer</p>
        </div>
        <div style="background: #fff; padding: 28px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <p style="color: #374151; line-height: 1.8; white-space: pre-wrap; font-size: 15px;">${aiReply || defaultReply}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
          <div style="display: flex; gap: 12px;">
            <a href="https://github.com/alexchen" style="color: #6b7280; font-size: 13px; text-decoration: none;">GitHub</a>
            <a href="https://linkedin.com/in/alexchen" style="color: #6b7280; font-size: 13px; text-decoration: none;">LinkedIn</a>
          </div>
        </div>
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
          This is an automated confirmation — your message has been received.
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOwnerNotification, sendSenderConfirmation };
