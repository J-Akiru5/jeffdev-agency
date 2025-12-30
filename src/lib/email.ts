/**
 * Resend Email Helper
 * --------------------
 * Centralized email sending logic using Resend API.
 */

import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_ADDRESSES = {
  contact: process.env.CONTACT_EMAIL || 'contact@jeffdev.studio',
  hire: process.env.HIRE_EMAIL || 'hire@jeffdev.studio',
  noreply: process.env.NOREPLY_EMAIL || 'noreply@jeffdev.studio',
} as const;

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = EMAIL_ADDRESSES.noreply,
  replyTo,
}: SendEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo,
    });

    if (error) {
      console.error('[RESEND ERROR]', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('[EMAIL SEND ERROR]', error);
    throw error;
  }
}

/**
 * Email Templates
 */

export function contactEmailTemplate(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
  </div>
  
  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
    <div style="background: white; padding: 25px; border-radius: 6px; margin-bottom: 20px;">
      <h2 style="margin: 0 0 20px 0; color: #333; font-size: 18px; font-weight: 600;">Contact Information</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 100px; font-weight: 600; color: #666;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 100px; font-weight: 600; color: #666;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 100px; font-weight: 600; color: #666;">Subject:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.subject}</td>
        </tr>
      </table>
    </div>
    
    <div style="background: white; padding: 25px; border-radius: 6px;">
      <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px; font-weight: 600;">Message</h2>
      <p style="margin: 0; white-space: pre-wrap; color: #555;">${data.message}</p>
    </div>
    
    <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px; color: #1565c0;">
        <strong>Quick Action:</strong> Reply directly to this email to respond to ${data.name}.
      </p>
    </div>
  </div>
  
  <div style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
    <p>JD Studio • Enterprise Web Solutions</p>
    <p>This is an automated notification from your contact form.</p>
  </div>
</body>
</html>
  `;
}

export function quoteEmailTemplate(data: {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
}) {
  const projectTypes: Record<string, string> = {
    web: 'Web Application',
    saas: 'SaaS Platform',
    mobile: 'Mobile App',
    ai: 'AI Integration',
    other: 'Other/Custom',
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">🎯 New Quote Request</h1>
  </div>
  
  <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
    <div style="background: white; padding: 25px; border-radius: 6px; margin-bottom: 20px;">
      <h2 style="margin: 0 0 20px 0; color: #333; font-size: 18px; font-weight: 600;">Client Information</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px; font-weight: 600; color: #666;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #f5576c; text-decoration: none;">${data.email}</a></td>
        </tr>
        ${
          data.company
            ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Company:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.company}</td>
        </tr>`
            : ''
        }
      </table>
    </div>
    
    <div style="background: white; padding: 25px; border-radius: 6px; margin-bottom: 20px;">
      <h2 style="margin: 0 0 20px 0; color: #333; font-size: 18px; font-weight: 600;">Project Details</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px; font-weight: 600; color: #666;">Type:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${
            projectTypes[data.projectType] || data.projectType
          }</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Budget:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.budget}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Timeline:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.timeline}</td>
        </tr>
      </table>
    </div>
    
    <div style="background: white; padding: 25px; border-radius: 6px; margin-bottom: 20px;">
      <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px; font-weight: 600;">Project Description</h2>
      <p style="margin: 0; white-space: pre-wrap; color: #555;">${data.details}</p>
    </div>
    
    <div style="margin-top: 20px; padding: 15px; background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px; color: #e65100;">
        <strong>⏰ Action Required:</strong> Respond within 24 hours to maintain SLA.
      </p>
    </div>
  </div>
  
  <div style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
    <p>JD Studio • Enterprise Web Solutions</p>
    <p>This is an automated notification from your quote form.</p>
  </div>
</body>
</html>
  `;
}
