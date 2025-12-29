import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CTA } from '@/components/sections/cta';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import type { Metadata } from 'next';

/**
 * Service Detail Page
 * -------------------
 * Individual service with full description,
 * features, deliverables, and investment info.
 */

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Get other services for cross-linking
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 2);

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-2">
              {/* Left: Content */}
              <div>
                <div className="inline-flex rounded-md border border-white/10 bg-white/5 p-3">
                  <service.icon className="h-8 w-8 text-cyan-400" />
                </div>

                <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-2 font-mono text-sm text-cyan-400">
                  {service.tagline}
                </p>
                <p className="mt-6 text-lg leading-relaxed text-white/60">
                  {service.description}
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/quote"
                    className="group relative overflow-hidden rounded-md border border-cyan-500/50 bg-cyan-500/10 px-6 py-3 backdrop-blur-md transition-all hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                  >
                    <span className="relative z-10 flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-white">
                      Get_Quote
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 rounded-md border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md transition-all hover:border-white/20"
                  >
                    <span className="font-mono text-sm uppercase tracking-wider text-white/70 transition-colors group-hover:text-white">
                      Book_Call
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right: Investment Card */}
              <div className="rounded-md border border-white/[0.08] bg-white/[0.02] p-8">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white/40">
                  Investment
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    {service.investment.starting}
                  </span>
                  <span className="text-white/50">starting</span>
                </div>
                <div className="mt-2 text-sm text-white/50">
                  Timeline: {service.investment.timeline}
                </div>

                <div className="mt-8 border-t border-white/[0.06] pt-8">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/40">
                    Deliverables
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-white/70"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-white">What&apos;s Included</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-white">Other Services</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-4 rounded-md border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <div className="rounded-md border border-white/10 bg-white/5 p-2">
                    <s.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{s.title}</div>
                    <div className="mt-0.5 text-sm text-white/50">
                      {s.tagline}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-white" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
