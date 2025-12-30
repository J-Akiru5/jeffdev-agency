'use client';

/**
 * Admin Header
 * -------------
 * Top header bar with user info and quick actions.
 */

import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { toast } from 'sonner';

export function AdminHeader() {
  // TODO: Get user from context
  const user = {
    displayName: 'Jeff Martinez',
    email: 'jeff@jeffdev.studio',
    photoURL: null,
    role: 'founder',
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.06] bg-void/80 px-6 backdrop-blur-md">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-md border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/20 focus:bg-white/10"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          onClick={() => toast.info('Notifications module coming soon')}
          className="relative rounded-md p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-cyan-400" />
        </button>

        {/* User - Clickable to Profile */}
        <Link
          href="/admin/profile"
          className="flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-white/5"
        >
          <div className="text-right">
            <div className="text-sm font-medium text-white">{user.displayName}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
              {user.role}
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
        </Link>
      </div>
    </header>
  );
}

