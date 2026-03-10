import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // SSL on port 465 — works on Render (port 587/STARTTLS is blocked)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOTP(email: string, otp: string) {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Gov Services Team" <noreply@govservices.com>',
            to: email,
            subject: "Your OTP for Grievance Submission",
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
            html: `<b>Your OTP is ${otp}</b><br/>It will expire in 10 minutes.`,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Failed to send email:", err);
    }
}
