import { text } from 'express';
import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }    
        });
        await transporter.sendMail({
            from:  `"Nitin Sharma" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            text: text,
            html: htmlContent,
            replyTo: process.env.EMAIL_USER
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
};

export default sendEmail;
