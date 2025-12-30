import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Detailed information about how JeffDev Studio uses cookies.',
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-6 pt-32 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Cookie Policy</h1>
        <p className="mt-4 text-white/50">Last updated: December 30, 2025</p>
      </div>

      <div className="prose prose-invert prose-cyan max-w-none space-y-10">
        <Section title="1. What Are Cookies?">
          <p>
            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
          </p>
        </Section>

        <Section title="2. How We Use Cookies">
          <p>
            We use cookies to enhance the functionality of our website, analyze our traffic, and personalize content. We do not use cookies to collect sensitive personal information without your explicit consent.
          </p>
        </Section>

        <Section title="3. Types of Cookies We Use">
          <div className="grid gap-6 md:grid-cols-2">
            <CookieType 
              title="Essential Cookies" 
              description="These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as logging in or filling in forms."
              examples={["Session ID", "Auth Token"]}
            />
            <CookieType 
              title="Analytics Cookies" 
              description="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site."
              examples={["_ga (Google Analytics)", "_vercel_insights"]}
            />
          </div>
        </Section>

        <Section title="4. Managing Cookies">
          <p>
            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">www.allaboutcookies.org</a>.
          </p>
          <p>
            You can also change your preferences for this website specifically by using our cookie consent banner. If you rejected cookies initially, they are blocked. If you accepted, you can clear your browser cookies for this site to reset your choice.
          </p>
        </Section>

        <Section title="5. Contact Us">
          <p>
            If you have any questions about our use of cookies, please contact us at: <a href="mailto:contact@jeffdev.studio" className="text-cyan-400 hover:underline">contact@jeffdev.studio</a>.
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

function CookieType({ title, description, examples }: { title: string; description: string; examples: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-4 text-sm text-white/60">{description}</p>
      <div className="flex flex-wrap gap-2">
        {examples.map((ex) => (
          <span key={ex} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 font-mono">
            {ex}
          </span>
        ))}
      </div>
    </div>
  );
}
