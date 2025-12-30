'use client';

/**
 * Users Page Client Component
 * ---------------------------
 * Wraps the users table and invite modal.
 */

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { UsersTable } from '@/components/admin/users-table';
import { InviteModal } from '@/components/admin/invite-modal';
import type { UserProfile } from '@/types/user';

interface UsersClientProps {
  users: UserProfile[];
  currentUserUid: string;
}

export function UsersClient({ users, currentUserUid }: UsersClientProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="mt-2 text-white/50">{users.length} team members</p>
        </div>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-500/20"
        >
          <Plus className="h-4 w-4" />
          Invite User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="rounded-md border border-white/8 bg-white/2 p-12 text-center">
          <p className="text-white/40">No team members yet</p>
          <p className="mt-2 text-sm text-white/30">
            Invite your first team member to get started.
          </p>
          <button
            onClick={() => setIsInviteOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-500/20"
          >
            <Plus className="h-4 w-4" />
            Invite User
          </button>
        </div>
      ) : (
        <UsersTable users={users} currentUserUid={currentUserUid} />
      )}

      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        inviterUid={currentUserUid}
      />
    </>
  );
}
