import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Pricing from '@/components/Pricing'
import Portfolio from "@/components/Portfolio";
import HomeTestimonials from "@/components/HomeTestimonials";

export default function Home() {
  return (
    <div className="bg-white">
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>

      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="testimonials">
        <HomeTestimonials /> {/* trust */}

      </section>

      {/* NEW: Pricing Section */}
      <Pricing />
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  )
}
