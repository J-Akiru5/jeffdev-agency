/**
 * Contact Form Server Action
 * ---------------------------
 * Handles contact form submissions:
 * 1. Validates input with Zod
 * 2. Saves to Firestore
 * 3. Sends email notification to contact@jeffdev.studio
 */

'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase/admin';
import {
  sendEmail,
  contactEmailTemplate,
  EMAIL_ADDRESSES,
} from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate input
    const validated = contactSchema.parse(data);

    // Save to Firestore
    const docRef = await db.collection('messages').add({
      ...validated,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Send email notification
    await sendEmail({
      to: EMAIL_ADDRESSES.contact,
      subject: `New Contact: ${validated.subject}`,
      html: contactEmailTemplate(validated),
      replyTo: validated.email,
    });

    return {
      success: true,
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
      id: docRef.id,
    };
  } catch (error) {
    console.error('[CONTACT FORM ERROR]', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error',
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: 'Failed to send message. Please try again or email us directly.',
    };
  }
}
