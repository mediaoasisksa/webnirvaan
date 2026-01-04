import Hero from '@/components/Hero'
import ClientLogos from '@/components/ClientLogos'
import Services from '@/components/Services'
import AiRecommender from "@/components/AiRecommender"
import CaseStudySummary from '@/components/CaseStudySummary'
import Portfolio from '@/components/Portfolio'
import HomeTestimonials from '@/components/HomeTestimonials'
import AiPricingCalculator from "@/components/AiPricingCalculator"
import Pricing from '@/components/Pricing'
import AiSeoAudit from "@/components/AiSeoAudit"
import About from '@/components/About'
import Contact from '@/components/Contact'
import AiChatbot from "@/components/AiChatbot"
import StickyCTA from '@/components/StickyCTA'
import WhatsAppCTA from '@/components/WhatsAppCTA'

export default function Home() {
  return (
    <div className="bg-white">

      {/* 1️⃣ HERO – Value proposition */}
      <section id="home">
        <Hero />
      </section>

      {/* 1.5️⃣ CLIENT LOGOS – Trust signals */}
      <ClientLogos />

      {/* 2️⃣ SERVICES – What you do */}
      <section id="services">
        <Services />
      </section>

      {/* 3️⃣ AI RECOMMENDER – Engagement hook */}
      <section id="ai-recommender">
        <AiRecommender />
      </section>

      {/* 4️⃣ CASE STUDIES – Success stories */}
      <CaseStudySummary />

      {/* 4.5️⃣ PORTFOLIO – Proof of work */}
      <section id="portfolio">
        <Portfolio />
      </section>

      {/* 5️⃣ TESTIMONIALS – Trust */}
      <section id="testimonials">
        <HomeTestimonials />
      </section>

      {/* 6️⃣ AI PRICING – Intent */}
      <section id="ai-pricing-calculator">
        <AiPricingCalculator />
      </section>

      {/* 7️⃣ PRICING – Conversion */}
      <section id="pricing">
        <Pricing />
      </section>

      {/* 8️⃣ AI SEO AUDIT – Lead magnet */}
      <section id="ai-seo-audit">
        <AiSeoAudit />
      </section>

      {/* 9️⃣ ABOUT – Credibility */}
      <section id="about">
        <About />
      </section>

      {/* 🔟 CONTACT – Final CTA */}
      <section id="contact">
        <Contact />
      </section>

      {/* 🤖 AI CHATBOT – Persistent helper */}
      <AiChatbot />

      {/* 📱 STICKY CTA – Always visible */}
      <StickyCTA />

      {/* 💬 WHATSAPP CTA – Quick contact */}
      <WhatsAppCTA />

    </div>
  )
}
