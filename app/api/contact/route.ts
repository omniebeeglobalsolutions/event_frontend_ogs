import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine if we should use credentials or a test setup.
    // If SMTP_USER is not provided, this will likely fail in production but allows for local error testing.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1. Send the notification email to the Owner
    await transporter.sendMail({
      from: `"Lumina Notifications" <${process.env.SMTP_USER}>`,
      replyTo: email, // If owner replies, it goes to the user
      to: process.env.CONTACT_EMAIL_RECEIVER || process.env.SMTP_USER,
      subject: `New Lead: ${name} via Website`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; max-width: 600px; margin: 0 auto; background-color: #f4f4f5;">
          <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="background-color: #0f172a; padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">New Contact Submission</h2>
            </div>
            <div style="padding: 30px;">
              <p style="margin-top: 0; color: #475569; font-size: 14px;">You have received a new message from the website contact form.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; width: 100px;">
                    <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Name</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #0f172a; font-weight: 600; font-size: 15px;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Email</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 30px;">
                <span style="color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Message</span>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-top: 10px; border: 1px solid #e2e8f0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
            </div>
          </div>
          <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px;">System generated notification • RS (OPC) PVT LTD</p>
        </div>
      `,
    });

    // 2. Send an Auto-Responder "Thank You" email to the User
    await transporter.sendMail({
      from: `"Lumina Support" <${process.env.SMTP_USER}>`,
      to: email, // Send back to the user
      subject: `We received your message, ${name}!`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px 15px; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0f172a; font-size: 24px; letter-spacing: 3px; text-transform: uppercase; margin: 0;">Lumina</h1>
            <p style="color: #94a3b8; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">Curated Events & Experiences</p>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 40px 0;">
            <h2 style="color: #0f172a; font-size: 18px; font-weight: 600; margin-top: 0;">Thank you for reaching out, ${name}.</h2>
            <p style="color: #475569; font-size: 15px; line-height: 1.6;">We have successfully received your inquiry. A member of our dedicated team will review your message and get back to you as soon as possible.</p>
            
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-top: 25px;">For your records, here is a copy of your message:</p>
            <blockquote style="border-left: 3px solid #2563eb; padding-left: 20px; margin-left: 0; margin-right: 0; color: #64748b; font-size: 14px; font-style: italic; background: #f8fafc; padding: 15px 20px;">
              ${message}
            </blockquote>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #94a3b8; font-size: 12px; margin-bottom: 5px;">Best regards,</p>
            <p style="color: #0f172a; font-weight: bold; font-size: 14px; margin-top: 0;">The Lumina Team</p>
            <p style="color: #94a3b8; font-size: 10px; margin-top: 20px;">RS (OPC) PRIVATE LIMITED<br/>123 Corporate Ave, Suite 500<br/><a href="#" style="color: #94a3b8;">hello@rakeshsuagdnh.com</a></p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please check your SMTP configuration.' },
      { status: 500 }
    );
  }
}
