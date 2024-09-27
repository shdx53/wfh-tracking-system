import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

// To send to Mailtrap Sandbox
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

import dotenv from "dotenv";

export async function sendNotification(to, subject, body) {
  try {
    await transporter.sendMail({
      from: '"WFH Tracking System" <noreply@wfh-tracking-system.com>',
      to: to,
      subject: subject,
      text: body,
      html: `<p>${body}</p>`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
