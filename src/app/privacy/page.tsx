import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How JeffDev Studio collects, uses, and protects your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-6 pt-32 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-white/50">Last updated: December 30, 2025</p>
      </div>

      <div className="prose prose-invert prose-cyan max-w-none space-y-10">
        <Section title="1. Introduction">
          <p>
            JeffDev Studio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website [jeffdev.studio] (the "Site").
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <h3 className="text-xl font-semibold text-white">a. Personal Data</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you fill out a contact form, request a quote, or subscribe to our newsletter. This includes:
          </p>
          <ul className="list-disc pl-5 text-white/70">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company name</li>
            <li>Project details</li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold text-white">b. Usage Data</h3>
          <p>
            We automatically collect certain information when you visit, using cookies and similar tracking technologies. This includes:
          </p>
          <ul className="list-disc pl-5 text-white/70">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the collected data for the following purposes:</p>
          <ul className="list-disc pl-5 text-white/70">
            <li>To provide and maintain our Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our Service.</li>
            <li>To monitor the usage of our Service.</li>
            <li>To detect, prevent and address technical issues.</li>
          </ul>
        </Section>

        <Section title="4. Cookies">
          <p>
            We use cookies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>
          <p>
            For more details, please see our <Link href="/cookies" className="text-cyan-400 hover:underline">Cookie Policy</Link>.
          </p>
        </Section>

        <Section title="5. Data Security">
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </Section>

        <Section title="6. Third-Party Services">
          <p>
            We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
          </p>
          <ul className="list-disc pl-5 text-white/70">
            <li><strong>Google Analytics:</strong> We use Google Analytics to monitor and analyze the use of our Service.</li>
            <li><strong>Vercel Analytics:</strong> We use Vercel Analytics to measure performance and web vitals.</li>
          </ul>
        </Section>

        <Section title="7. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="mt-2 text-white">
            By email: <a href="mailto:contact@jeffdev.studio" className="text-cyan-400 hover:underline">contact@jeffdev.studio</a>
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
      <div className="text-lg leading-relaxed text-white/70">{children}</div>
    </section>
  );
}
