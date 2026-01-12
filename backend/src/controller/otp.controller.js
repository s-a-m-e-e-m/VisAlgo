import crypto from "crypto";
import bcrypt from 'bcryptjs'
import Otp from '../models/otp.model.js';
import nodemailer from 'nodemailer';

function isValidEmail(email) {
  // Require: local-part@(label{2,}.)(label{2,}.)*TLD{2,}
  // This prevents single-letter domain labels (e.g. `g.com`).
  const regex = /^[^\s@]+@([A-Za-z0-9-]{2,}\.)+[A-Za-z]{2,}$/;
  return regex.test(email);
}

const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    const mailOptions = {
      from: `"Team VisAlgo" `,
      to,
      subject: "Verify your email - OTP",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 2px;">${otp}</h1>
          <p>This OTP is valid for <b>5 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send OTP email");
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const existing = await Otp.findOne({ email });

  // resend cooldown (60 sec)
  if (existing && Date.now() - existing.lastSentAt < 60000) {
    return res.status(429).json({ message: "Wait before requesting OTP again" });
  }

  const otp = crypto.randomInt(100000, 1000000);
  const otpHash = await bcrypt.hash(otp.toString(), 10);

  await Otp.findOneAndUpdate(
    { email },
    {
      otpHash,
      expiresAt: Date.now() + 5 * 60 * 1000,
      attempts: 0,
      lastSentAt: Date.now(),
    },
    { upsert: true }
  );

  await sendEmail(email, otp);

  res.json({ message: "OTP sent successfully" });
};


export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const record = await Otp.findOne({ email });

  if (!record) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  if (record.attempts >= 5) {
    return res.status(429).json({ message: "Too many attempts. Try later." });
  }

  if (record.expiresAt < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const isMatch = await bcrypt.compare(otp.toString(), record.otpHash);

  if (!isMatch) {
    record.attempts += 1;
    await record.save();
    return res.status(400).json({ message: "Incorrect OTP" });
  }

  await Otp.deleteOne({ email });

  res.json({ message: "Email verified successfully" });
};
