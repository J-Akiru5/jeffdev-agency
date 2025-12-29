import Link from 'next/link';
import { MessageSquare, Briefcase } from 'lucide-react';

/**
 * Admin Dashboard
 * ---------------
 * Protected admin panel homepage with links to quotes and messages.
 */

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-void px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-white/50">JeffDev Agency Management</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Quotes Card */}
          <Link
            href="/admin/quotes"
            className="group rounded-md border border-white/[0.08] bg-white/[0.02] p-8 transition-all hover:border-white/[0.15] hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-md border border-purple-500/20 bg-purple-500/10 p-2">
                    <Briefcase className="h-5 w-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Quote Requests</h2>
                </div>
                <p className="mt-3 text-sm text-white/50">
                  Manage incoming project quotes and proposals
                </p>
              </div>
            </div>
          </Link>

          {/* Messages Card */}
          <Link
            href="/admin/messages"
            className="group rounded-md border border-white/[0.08] bg-white/[0.02] p-8 transition-all hover:border-white/[0.15] hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-md border border-cyan-500/20 bg-cyan-500/10 p-2">
                    <MessageSquare className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Contact Messages</h2>
                </div>
                <p className="mt-3 text-sm text-white/50">
                  View and respond to contact form submissions
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
