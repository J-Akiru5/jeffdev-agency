import Link from 'next/link';
import { ArrowLeft, Calendar, DollarSign, Clock, User, Mail, Building } from 'lucide-react';
import { db } from '@/lib/firebase/admin';

/**
 * Admin Quotes Page
 * ------------------
 * View all quote requests from Firestore.
 * Server Component - fetches data on server.
 */

interface Quote {
  id: string;
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company?: string;
  details: string;
  status: 'new' | 'contacted' | 'in-progress' | 'closed';
  createdAt: string;
}

async function getQuotes(): Promise<Quote[]> {
  try {
    const snapshot = await db
      .collection('quotes')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Quote[];
  } catch (error) {
    console.error('[FETCH QUOTES ERROR]', error);
    return [];
  }
}

const projectTypeLabels: Record<string, string> = {
  web: 'Web App',
  saas: 'SaaS',
  mobile: 'Mobile',
  ai: 'AI Integration',
  other: 'Other',
};

export default async function AdminQuotesPage() {
  const quotes = await getQuotes();

  return (
    <div className="min-h-screen bg-void px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white">Quote Requests</h1>
          <p className="mt-2 text-white/50">{quotes.length} total submissions</p>
        </div>

        {quotes.length === 0 ? (
          <div className="mt-12 rounded-md border border-white/[0.08] bg-white/[0.02] p-12 text-center">
            <p className="text-white/40">No quote requests yet</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-md border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
                          quote.status === 'new'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : quote.status === 'contacted'
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : quote.status === 'in-progress'
                            ? 'bg-purple-500/10 text-purple-400'
                            : 'bg-white/10 text-white/40'
                        }`}
                      >
                        {quote.status}
                      </span>
                      <span className="font-mono text-xs text-white/40">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {/* Client Info */}
                      <div>
                        <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-white/40">
                          Client
                        </h3>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-white">
                            <User className="h-4 w-4 text-white/40" />
                            {quote.name}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Mail className="h-4 w-4 text-white/40" />
                            <a
                              href={`mailto:${quote.email}`}
                              className="hover:text-cyan-400"
                            >
                              {quote.email}
                            </a>
                          </div>
                          {quote.company && (
                            <div className="flex items-center gap-2 text-sm text-white/70">
                              <Building className="h-4 w-4 text-white/40" />
                              {quote.company}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div>
                        <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-white/40">
                          Project
                        </h3>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-white">
                            <Calendar className="h-4 w-4 text-white/40" />
                            {projectTypeLabels[quote.projectType] || quote.projectType}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <DollarSign className="h-4 w-4 text-white/40" />
                            {quote.budget}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Clock className="h-4 w-4 text-white/40" />
                            {quote.timeline}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 border-t border-white/[0.06] pt-4">
                      <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-white/40">
                        Details
                      </h3>
                      <p className="text-sm leading-relaxed text-white/60">
                        {quote.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
