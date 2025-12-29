import Link from 'next/link';
import {
  MessageSquare,
  Mail,
  FolderKanban,
  Receipt,
  Activity,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { getQuotes, getMessages, getProjects } from '@/lib/data';
import { getAuditLogs } from '@/lib/audit';

/**
 * Admin Dashboard
 * ----------------
 * Overview with metrics widgets and quick actions.
 */

export default async function AdminDashboardPage() {
  // Fetch data for metrics
  const [quotes, messages, projects, auditLogs] = await Promise.all([
    getQuotes(),
    getMessages(),
    getProjects(),
    getAuditLogs(10),
  ]);

  // Calculate metrics
  const newQuotes = quotes.filter((q) => q.status === 'new').length;
  const newMessages = messages.filter((m) => m.status === 'new').length;
  const activeProjects = projects.filter((p) => p.featured).length; // TODO: Replace with real status
  const pendingProjects = projects.length - activeProjects;

  // Recent activity (last 24 hours)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const recentActivity = auditLogs.filter(
    (log) => log.timestamp > oneDayAgo
  ).length;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-white/50">Welcome back, here&apos;s your overview.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Quotes */}
        <MetricCard
          title="Quote Requests"
          value={quotes.length}
          badge={newQuotes > 0 ? `${newQuotes} new` : undefined}
          href="/admin/quotes"
          icon={MessageSquare}
          color="purple"
        />

        {/* Messages */}
        <MetricCard
          title="Messages"
          value={messages.length}
          badge={newMessages > 0 ? `${newMessages} unread` : undefined}
          href="/admin/messages"
          icon={Mail}
          color="cyan"
        />

        {/* Active Projects */}
        <MetricCard
          title="Active Projects"
          value={activeProjects}
          subtitle={`${pendingProjects} pending`}
          href="/admin/projects"
          icon={FolderKanban}
          color="emerald"
        />

        {/* Recent Activity */}
        <MetricCard
          title="Recent Activity"
          value={recentActivity}
          subtitle="Last 24 hours"
          href="/admin/audit"
          icon={Activity}
          color="orange"
        />
      </div>

      {/* Secondary Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Recent Quotes */}
        <div className="rounded-md border border-white/[0.08] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent Quotes</h2>
            <Link
              href="/admin/quotes"
              className="flex items-center gap-1 text-sm text-white/40 transition-colors hover:text-white"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {quotes.slice(0, 4).map((quote) => (
              <div
                key={quote.id}
                className="flex items-center justify-between rounded-md bg-white/[0.02] p-3"
              >
                <div>
                  <div className="text-sm font-medium text-white">{quote.name}</div>
                  <div className="text-xs text-white/40">{quote.projectType} • {quote.budget}</div>
                </div>
                <span
                  className={`rounded-sm px-2 py-0.5 text-[10px] uppercase tracking-wider ${quote.status === 'new'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-white/10 text-white/40'
                    }`}
                >
                  {quote.status}
                </span>
              </div>
            ))}
            {quotes.length === 0 && (
              <p className="text-sm text-white/30">No quotes yet</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-md border border-white/[0.08] bg-white/[0.02] p-6">
          <h2 className="font-semibold text-white">Quick Actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <QuickAction
              href="/admin/invoices/new"
              icon={Receipt}
              label="Create Invoice"
            />
            <QuickAction
              href="/admin/calendar"
              icon={Clock}
              label="View Calendar"
            />
            <QuickAction
              href="/admin/projects"
              icon={FolderKanban}
              label="Manage Projects"
            />
            <QuickAction
              href="/"
              icon={TrendingUp}
              label="View Public Site"
              external
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Components ----------

interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  badge?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'purple' | 'cyan' | 'emerald' | 'orange';
}

function MetricCard({
  title,
  value,
  subtitle,
  badge,
  href,
  icon: Icon,
  color,
}: MetricCardProps) {
  const colorClasses = {
    purple: 'border-purple-500/20 bg-purple-500/10 text-purple-400',
    cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
    emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    orange: 'border-orange-500/20 bg-orange-500/10 text-orange-400',
  };

  return (
    <Link
      href={href}
      className="group rounded-md border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-white/[0.15] hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between">
        <div className={`rounded-md border p-2 ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {badge && (
          <span className="rounded-sm bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cyan-400">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="mt-1 text-sm text-white/50">{title}</div>
        {subtitle && <div className="text-xs text-white/30">{subtitle}</div>}
      </div>
    </Link>
  );
}

interface QuickActionProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}

function QuickAction({ href, icon: Icon, label, external }: QuickActionProps) {
  const Component = external ? 'a' : Link;
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component
      href={href}
      className="flex items-center gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] p-3 text-sm text-white/70 transition-all hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
      {...props}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Component>
  );
}
