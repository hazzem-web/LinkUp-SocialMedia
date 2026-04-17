import nodemailer from 'nodemailer';
import { env } from './../../../config/env.service';
import Mail from 'nodemailer/lib/mailer/index.js';

// Create a transporter using Ethereal test credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: env.AppEmail,
    pass: env.AppPassword,
  },
});

// Send an email using async/await
export const sendEmail = async ({
  to ,
  subject , 
  html
} : Mail.Options = {}) : Promise<void> => {
  const info = await transporter.sendMail({
    from: `"LinkUp " <${env.AppEmail}>`,
    to,
    subject,
    html
  });

  console.log("Message sent:", info.messageId);
}

