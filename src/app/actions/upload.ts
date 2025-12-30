'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2, R2_BUCKET_NAME } from '@/lib/r2';
import { randomUUID } from 'crypto';

/**
 * GENERATE PRESIGNED URL
 * ----------------------
 * Allows the client to upload files directly to Cloudflare R2
 * without passing the file through our server (Performance + Security).
 */
export async function getSignedUploadUrl(
  fileName: string,
  fileType: string
): Promise<{ url: string; fileUrl: string } | { error: string }> {
  try {
    // 1. Auth Check (TODO: Add when Auth is ready)
    // const session = await getSession();
    // if (!session) return { error: 'Unauthorized' };

    // 2. Validate File Type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(fileType)) {
      return { error: 'Invalid file type. Only images and PDFs are allowed.' };
    }

    // 3. Generate Unique Filename
    const ext = fileName.split('.').pop();
    const uniqueKey = `uploads/${randomUUID()}.${ext}`;

    // 4. Create Command
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: fileType,
    });

    // 5. Generate Signed URL (valid for 5 minutes)
    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 300 });

    // 6. Return Data
    // Use the local proxy API to bypass CORS and keep bucket private
    const fileUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/file/${uniqueKey}`;

    return {
      url: signedUrl,
      fileUrl,
    };
  } catch (error) {
    console.error('R2 Presign Error:', error);
    return { error: 'Failed to generate upload URL.' };
  }
}
