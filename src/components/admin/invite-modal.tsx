'use client';

/**
 * Invite User Modal
 * -----------------
 * Modal for sending magic link invites to new team members.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Loader2, Send, Copy, Check } from 'lucide-react';
import { createInvite } from '@/app/actions/invites';
import type { UserRole } from '@/types/rbac';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviterUid: string;
}

const roleOptions: { value: UserRole; label: string; description: string }[] = [
  { value: 'admin', label: 'Admin', description: 'Full access except user management' },
  { value: 'partner', label: 'Partner', description: 'View assigned projects only' },
  { value: 'employee', label: 'Employee', description: 'Limited view access' },
];

export function InviteModal({ isOpen, onClose, inviterUid }: InviteModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await createInvite({
      email,
      role,
      invitedBy: inviterUid,
    });

    if (result.success && result.token) {
      // Generate invite link using the token (not inviteId!)
      const link = `${window.location.origin}/auth/invite/${result.token}`;
      setInviteLink(link);
      router.refresh();
    } else {
      setError(result.error || 'Failed to create invite');
    }

    setIsLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setEmail('');
    setRole('employee');
    setError('');
    setInviteLink('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-lg border border-white/8 bg-[#0a0a0a] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-md p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Invite Team Member</h2>
          <p className="mt-1 text-sm text-white/50">
            Send a magic link to invite new users
          </p>
        </div>

        {inviteLink ? (
          // Success state - show link
          <div className="space-y-4">
            <div className="rounded-md bg-emerald-500/10 border border-emerald-500/20 p-4">
              <p className="text-sm text-emerald-400">
                Invite created successfully!
              </p>
            </div>

            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                Invite Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 font-mono"
                />
                <button
                  onClick={handleCopy}
                  className="rounded-md bg-cyan-500/10 border border-cyan-500/20 px-3 py-2 text-cyan-400 hover:bg-cyan-500/20"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-white/40">
                Share this link with the user. It expires in 7 days.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full rounded-md bg-white/5 border border-white/10 py-2 text-sm text-white hover:bg-white/10"
            >
              Done
            </button>
          </div>
        ) : (
          // Form state
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  required
                  className="w-full rounded-md border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/20"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                Role
              </label>
              <div className="space-y-2">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                      role === option.value
                        ? 'border-cyan-500/30 bg-cyan-500/5'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-medium text-white">{option.label}</div>
                      <div className="text-xs text-white/40">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-cyan-500/10 border border-cyan-500/20 py-2.5 text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-500/20 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send Invite
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
