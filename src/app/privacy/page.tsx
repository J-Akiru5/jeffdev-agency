import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for JeffDev Web Development Services.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <h1 className="mt-8 text-4xl font-bold tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="mt-2 font-mono text-xs text-white/40">
              Last updated: December 2024
            </p>

            <div className="prose prose-invert mt-12 max-w-none prose-headings:font-semibold prose-headings:text-white prose-p:text-white/60 prose-strong:text-white prose-li:text-white/60">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, including:
              </p>
              <ul>
                <li>Name and contact information (email, phone)</li>
                <li>Company name and business details</li>
                <li>Project requirements and specifications</li>
                <li>Payment and billing information</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and deliver our services</li>
                <li>Communicate with you about projects</li>
                <li>Send invoices and process payments</li>
                <li>Improve our services and website</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell or rent your personal information. We may share
                information:
              </p>
              <ul>
                <li>With service providers who assist in our operations</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights and property</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>

              <h2>5. Data Retention</h2>
              <p>
                We retain your information for as long as necessary to fulfill
                the purposes outlined in this policy, unless a longer retention
                period is required by law.
              </p>

              <h2>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>
                We use essential cookies to operate our website. We may also
                use analytics cookies to understand how visitors interact with
                our site. You can control cookie settings in your browser.
              </p>

              <h2>8. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this
                page.
              </p>

              <h2>Contact</h2>
              <p>
                For privacy-related inquiries, contact us at{' '}
                <a href="mailto:privacy@jeffdev.studio" className="text-cyan-400">
                  privacy@jeffdev.studio
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
