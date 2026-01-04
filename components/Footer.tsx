import Link from "next/link";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#ai-recommender", label: "AI" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

const WHATSAPP_LINK =
  "https://wa.me/917827448032?text=Hi%20WebNirvaan%20%F0%9F%91%8B%0AI%E2%80%99m%20interested%20in%20a%20website%20or%20AI%20solution.";

const socialLinks = [
  // Replace these with your real URLs (or remove items you don't need)
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://x.com/", label: "X (Twitter)" },
];

function SocialIcon({ label }) {
  // Minimal icons (no extra dependency). Swap for your icon set if you have one.
  const base = "w-5 h-5";
  if (label.toLowerCase().includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" className={base} aria-hidden="true" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 23.5h4V7.98h-4V23.5Zm7 0h4v-8.4c0-2.24.42-4.41 3.19-4.41 2.73 0 2.77 2.56 2.77 4.55v8.26h4V14.4c0-4.46-.96-7.88-6.18-7.88-2.51 0-4.19 1.38-4.88 2.69h-.07V7.98h-3.83V23.5Z" />
      </svg>
    );
  }
  if (label.toLowerCase().includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" className={base} aria-hidden="true" fill="currentColor">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.75-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    );
  }
  // X (Twitter) fallback
  return (
    <svg viewBox="0 0 24 24" className={base} aria-hidden="true" fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.8l-5.3-6.9L4.9 22H2l7.4-8.5L1 2h7l4.8 6.2L18.9 2Zm-1.2 18h1.8L6.2 4H4.3l13.4 16Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="#home"
              className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md"
              aria-label="Go to top"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 via-accent-400 to-secondary-400 bg-clip-text text-transparent">
                WebNirvaan
              </span>
            </Link>

            <p className="mt-4 max-w-xl text-sm text-gray-400 leading-relaxed">
              We build modern websites, AI-powered solutions, and digital experiences that help
              businesses grow faster.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-green-500 px-5 py-2 text-sm font-medium text-white
                           hover:bg-green-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                aria-label="Chat with WebNirvaan on WhatsApp"
              >
                Chat on WhatsApp
              </a>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-secondary-500 px-5 py-2 text-sm font-medium text-white
                           shadow hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                Get Started
              </Link>
            </div>

            {/* Social */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-white">Follow</p>
              <div className="mt-3 flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <SocialIcon label={s.label} />
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Navigation</h3>
            <nav aria-label="Footer navigation" className="mt-4">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition underline-offset-4 hover:underline
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <p>
                Prefer email?{" "}
                <a
                  href="mailto:hello@webnirvaan.com"
                  className="text-gray-300 hover:text-white underline-offset-4 hover:underline transition
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                >
                  hello@webnirvaan.com
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white underline-offset-4 hover:underline transition
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                >
                  +91 78274 48032
                </a>
              </p>

              <div className="pt-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">Working hours</p>
                <p>Mon–Sat, 10:00–19:00 IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            © {year} WebNirvaan. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-white transition underline-offset-4 hover:underline
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-white transition underline-offset-4 hover:underline
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
            >
              Terms
            </Link>
            <Link
              href="#home"
              className="text-gray-500 hover:text-white transition underline-offset-4 hover:underline
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
            >
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
