import nodemailer from "nodemailer";

const sendMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Email verification.",
    text: `Your OTP for email verification is: ${otp}. The otp is valid for 10 min. Do not share otp with anyone else.`,
    html: `Your OTP for email verification is: ${otp}.<br>The otp is valid for 10 min.<br>Do not share otp with anyone else.`,
  });
};

export default sendMail;
