'use server';

/**
 * Services CRUD Actions
 * ---------------------
 * Server actions for managing services in Firestore.
 */

import { db } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { FirestoreService } from '@/types/firestore';
import { logAuditEvent } from '@/lib/audit';

// Validation schema
const serviceSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  icon: z.string().min(1),
  title: z.string().min(1).max(100),
  tagline: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  features: z.array(z.string()).min(1).max(10),
  deliverables: z.array(z.string()).min(1).max(10),
  investment: z.object({
    starting: z.string().min(1),
    timeline: z.string().min(1),
  }),
  order: z.number().int().min(1),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * Create a new service
 */
export async function createService(data: ServiceFormData): Promise<ActionResult> {
  try {
    const validated = serviceSchema.parse(data);
    
    // Check if slug already exists
    const existing = await db.collection('services').doc(validated.slug).get();
    if (existing.exists) {
      return { success: false, error: 'A service with this slug already exists' };
    }
    
    await db.collection('services').doc(validated.slug).set(validated);
    
    await logAuditEvent({
      action: 'CREATE',
      resource: 'services',
      resourceId: validated.slug,
      details: { title: validated.title },
    });
    
    revalidatePath('/services');
    revalidatePath('/admin/services');
    
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error('[CREATE SERVICE ERROR]', error);
    return { success: false, error: 'Failed to create service' };
  }
}

/**
 * Update an existing service
 */
export async function updateService(
  slug: string,
  data: ServiceFormData
): Promise<ActionResult> {
  try {
    const validated = serviceSchema.parse(data);
    
    const existing = await db.collection('services').doc(slug).get();
    if (!existing.exists) {
      return { success: false, error: 'Service not found' };
    }
    
    // If slug changed, delete old doc and create new
    if (slug !== validated.slug) {
      const newExists = await db.collection('services').doc(validated.slug).get();
      if (newExists.exists) {
        return { success: false, error: 'A service with the new slug already exists' };
      }
      await db.collection('services').doc(slug).delete();
      await db.collection('services').doc(validated.slug).set(validated);
    } else {
      await db.collection('services').doc(slug).set(validated, { merge: true });
    }
    
    await logAuditEvent({
      action: 'UPDATE',
      resource: 'services',
      resourceId: validated.slug,
      details: { title: validated.title, oldSlug: slug !== validated.slug ? slug : undefined },
    });
    
    revalidatePath('/services');
    revalidatePath('/admin/services');
    revalidatePath(`/services/${slug}`);
    if (slug !== validated.slug) {
      revalidatePath(`/services/${validated.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error('[UPDATE SERVICE ERROR]', error);
    return { success: false, error: 'Failed to update service' };
  }
}

/**
 * Delete a service
 */
export async function deleteService(slug: string): Promise<ActionResult> {
  try {
    const existing = await db.collection('services').doc(slug).get();
    if (!existing.exists) {
      return { success: false, error: 'Service not found' };
    }
    
    const data = existing.data() as FirestoreService;
    await db.collection('services').doc(slug).delete();
    
    await logAuditEvent({
      action: 'DELETE',
      resource: 'services',
      resourceId: slug,
      details: { title: data.title },
    });
    
    revalidatePath('/services');
    revalidatePath('/admin/services');
    
    return { success: true };
  } catch (error) {
    console.error('[DELETE SERVICE ERROR]', error);
    return { success: false, error: 'Failed to delete service' };
  }
}
