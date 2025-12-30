import Link from 'next/link';
import { ShieldOff } from 'lucide-react';

/**
 * 403 Forbidden Page
 * ------------------
 * Displayed when user lacks permission to access a resource.
 */

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <ShieldOff className="h-10 w-10 text-red-400" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-bold text-white/10">403</h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-white">
          Access Denied
        </h2>

        {/* Description */}
        <p className="mt-3 text-white/50">
          You don&apos;t have permission to access this resource. If you believe this is
          an error, please contact your administrator.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white/5 border border-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-2.5 text-sm font-medium text-white/50 transition-all hover:text-white"
          >
            Return Home
          </Link>
        </div>

        {/* Contact */}
        <p className="mt-8 text-xs text-white/30">
          Need help?{' '}
          <a href="mailto:support@jeffdev.studio" className="text-cyan-400 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
