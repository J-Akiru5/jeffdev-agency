'use client';

/**
 * Profile Settings Form
 * ---------------------
 * Form for editing user profile, bio, photo, and namecard settings.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Loader2, Save, ExternalLink, Linkedin, Github, Globe } from 'lucide-react';
import { updateUserProfile, checkUsernameAvailable } from '@/app/actions/users';
import type { UserProfile } from '@/types/user';

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    displayName: profile.displayName || '',
    title: profile.title || '',
    bio: profile.bio || '',
    phone: profile.phone || '',
    location: profile.location || '',
    social: {
      linkedin: profile.social?.linkedin || '',
      github: profile.social?.github || '',
      twitter: profile.social?.twitter || '',
      website: profile.social?.website || '',
    },
    namecard: {
      username: profile.namecard?.username || '',
      tagline: profile.namecard?.tagline || '',
      showEmail: profile.namecard?.showEmail ?? true,
      showPhone: profile.namecard?.showPhone ?? false,
      accentColor: profile.namecard?.accentColor || '#06b6d4',
    },
  });

  const handleChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleUsernameBlur = async () => {
    if (!formData.namecard.username) return;
    
    const isAvailable = await checkUsernameAvailable(
      formData.namecard.username,
      profile.uid
    );
    
    if (!isAvailable) {
      setUsernameError('This username is already taken');
    } else {
      setUsernameError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameError) return;

    setIsLoading(true);
    setSuccessMessage('');

    const result = await updateUserProfile(profile.uid, formData);

    if (result.success) {
      setSuccessMessage('Profile updated successfully!');
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile Photo */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-white/10 overflow-hidden">
            {profile.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photoURL}
                alt={profile.displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-white/40">
                {profile.displayName?.charAt(0) || '?'}
              </div>
            )}
          </div>
          <button
            type="button"
            className="absolute -bottom-1 -right-1 rounded-full bg-cyan-500 p-2 text-white shadow-lg transition-transform hover:scale-110"
            title="Upload Photo"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h3 className="font-medium text-white">{profile.displayName}</h3>
          <p className="text-sm text-white/40">{profile.email}</p>
          <p className="text-xs text-white/30 mt-1 capitalize">{profile.role}</p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="rounded-md border border-white/8 bg-white/2 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Display Name"
            value={formData.displayName}
            onChange={(v) => handleChange('displayName', v)}
            required
          />
          <InputField
            label="Title / Role"
            value={formData.title}
            onChange={(v) => handleChange('title', v)}
            placeholder="e.g., Lead Developer"
          />
          <InputField
            label="Phone"
            value={formData.phone}
            onChange={(v) => handleChange('phone', v)}
            placeholder="+63 XXX XXX XXXX"
          />
          <InputField
            label="Location"
            value={formData.location}
            onChange={(v) => handleChange('location', v)}
            placeholder="e.g., Iloilo, PH"
          />
        </div>
        <div className="mt-4">
          <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={3}
            className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/20 resize-none"
            placeholder="A short bio about yourself..."
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-md border border-white/8 bg-white/2 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="LinkedIn"
            value={formData.social.linkedin}
            onChange={(v) => handleChange('social.linkedin', v)}
            placeholder="https://linkedin.com/in/..."
            icon={Linkedin}
          />
          <InputField
            label="GitHub"
            value={formData.social.github}
            onChange={(v) => handleChange('social.github', v)}
            placeholder="https://github.com/..."
            icon={Github}
          />
          <InputField
            label="Twitter / X"
            value={formData.social.twitter}
            onChange={(v) => handleChange('social.twitter', v)}
            placeholder="https://x.com/..."
          />
          <InputField
            label="Website"
            value={formData.social.website}
            onChange={(v) => handleChange('social.website', v)}
            placeholder="https://..."
            icon={Globe}
          />
        </div>
      </div>

      {/* Namecard Settings */}
      <div className="rounded-md border border-white/8 bg-white/2 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Digital Namecard</h3>
          {formData.namecard.username && (
            <a
              href={`/card/${formData.namecard.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan-400 flex items-center gap-1 hover:underline"
            >
              Preview <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <InputField
              label="Username (URL Slug)"
              value={formData.namecard.username}
              onChange={(v) => handleChange('namecard.username', v.toLowerCase().replace(/\s/g, '-'))}
              placeholder="yourname"
              onBlur={handleUsernameBlur}
            />
            {usernameError && (
              <p className="text-xs text-red-400 mt-1">{usernameError}</p>
            )}
            {formData.namecard.username && !usernameError && (
              <p className="text-xs text-white/30 mt-1">
                jeffdev.studio/card/{formData.namecard.username}
              </p>
            )}
          </div>
          <InputField
            label="Tagline"
            value={formData.namecard.tagline}
            onChange={(v) => handleChange('namecard.tagline', v)}
            placeholder="Building the future, one line at a time"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.namecard.showEmail}
              onChange={(e) => handleChange('namecard.showEmail', e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-white/70">Show email on namecard</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.namecard.showPhone}
              onChange={(e) => handleChange('namecard.showPhone', e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-white/70">Show phone on namecard</span>
          </label>
        </div>
        <div className="mt-4">
          <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
            Accent Color
          </label>
          <input
            type="color"
            value={formData.namecard.accentColor}
            onChange={(e) => handleChange('namecard.accentColor', e.target.value)}
            className="h-10 w-20 rounded border border-white/10 bg-transparent cursor-pointer"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isLoading || !!usernameError}
          className="inline-flex items-center gap-2 rounded-md bg-cyan-500/10 border border-cyan-500/20 px-6 py-2 text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-500/20 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </button>
        {successMessage && (
          <span className="text-sm text-emerald-400">{successMessage}</span>
        )}
      </div>
    </form>
  );
}

// Helper input field component
function InputField({
  label,
  value,
  onChange,
  placeholder,
  required,
  icon: Icon,
  onBlur,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  onBlur?: () => void;
}) {
  return (
    <div>
      <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/20 ${
            Icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
}
