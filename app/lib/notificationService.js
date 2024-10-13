import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

// To send to Mailtrap Sandbox
var transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});


export async function sendNotification(subject, body) {
  try {
    await transporter.sendMail({
      from: '"WFH Tracking System" <noreply@demomailtrap.com>',
      to: '"User" <spm.wfh.tracking.sys@gmail.com>',
      subject: subject,
      text: body,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
