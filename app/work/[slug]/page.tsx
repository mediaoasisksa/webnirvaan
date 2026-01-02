import Testimonials from "@/components/Testimonials";
import { testimonials } from "@/data/testimonials";
import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";

export async function generateMetadata({ params }: any) {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.description,
  };
}

export default function CaseStudyPage({ params }: any) {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) return notFound();

  const projectTestimonials = testimonials[study.slug] || [];

  return (
    <main className="max-w-5xl mx-auto px-6 py-24">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900">
        {study.client}
      </h1>

      <p className="mt-4 text-gray-600">{study.description}</p>

      {/* Challenge */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Challenge</h2>
        <p className="mt-2 text-gray-600">{study.challenge}</p>
      </section>

      {/* Solution */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Solution</h2>
        <p className="mt-2 text-gray-600">{study.solution}</p>
      </section>

      {/* Results */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Results</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          {study.results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-8">
        {study.tech.map((t) => (
          <span
            key={t}
            className="bg-gray-100 px-4 py-1 rounded-full text-sm"
          >
            {t}
          </span>
        ))}
      </div>

      {/* ✅ Testimonials (NEW) */}
      <Testimonials items={projectTestimonials} />

      {/* CTA */}
      <a
        href={study.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-14 px-6 py-3 rounded-lg text-white
        bg-gradient-to-r from-purple-600 to-blue-500"
      >
        Visit Live Website →
      </a>
    </main>
  );
}
