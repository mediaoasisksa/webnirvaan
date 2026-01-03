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
  "https://wa.me/917827448032?text=Hi%20WebNirvaan%20👋%0AI’m%20interested%20in%20a%20website%20or%20AI%20solution.";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 via-accent-400 to-secondary-400 bg-clip-text text-transparent">
              WebNirvaan
            </h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              We build modern websites, AI-powered solutions, and digital
              experiences that help businesses grow faster.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-green-500 text-white
              px-5 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Let’s Work Together
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Have a project in mind or want to explore AI for your business?
              Let’s talk.
            </p>

            <Link
              href="#contact"
              className="inline-block bg-gradient-to-r
              from-primary-600 to-secondary-500 text-white
              px-6 py-2 rounded-lg shadow hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} WebNirvaan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
