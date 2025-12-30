import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProfileForm } from '@/components/admin/profile-form';
import { cookies } from 'next/headers';

/**
 * Admin Profile Page
 * ------------------
 * Edit user profile, bio, photo, and namecard settings.
 */

// TODO: Replace with actual auth session
async function getCurrentUser() {
  // This would normally come from Firebase Auth session
  // For now, return a mock user profile
  return {
    uid: 'founder-001',
    email: 'jeff@jeffdev.studio',
    displayName: 'Jeff Martinez',
    photoURL: undefined,
    bio: '',
    title: 'Founder & Lead Developer',
    phone: '',
    location: 'Iloilo, Philippines',
    social: {
      linkedin: '',
      github: '',
      twitter: '',
      website: 'https://jeffdev.studio',
    },
    role: 'founder' as const,
    status: 'active' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    namecard: {
      username: 'jeff',
      tagline: 'Building the future, one line at a time',
      showEmail: true,
      showPhone: false,
      accentColor: '#06b6d4',
    },
  };
}

export default async function AdminProfilePage() {
  const _ = await cookies(); // Ensure dynamic rendering
  const profile = await getCurrentUser();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mt-8">
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        <p className="mt-2 text-white/50">
          Manage your profile, photo, and digital namecard.
        </p>
      </div>

      <div className="mt-8 max-w-3xl">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
