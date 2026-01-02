import { testimonials, Testimonial } from "@/data/testimonials";

type TestimonialWithSlug = Testimonial & {
  slug: string;
};

export default function HomeTestimonials() {
  // Flatten testimonials and keep slug reference
  const items: TestimonialWithSlug[] = Object.entries(testimonials)
    .flatMap(([slug, list]) =>
      list.map((t) => ({ ...t, slug }))
    )
    .slice(0, 4); // limit for homepage

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Trusted by startups and businesses worldwide.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-10">
          {items.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <p className="text-gray-700 italic leading-relaxed">
                “{t.quote}”
              </p>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.role}, {t.company}
                  </p>
                </div>

                {t.rating && (
                  <div className="text-yellow-500 text-lg">
                    {"★".repeat(t.rating)}
                  </div>
                )}
              </div>

              {/* Case Study Link */}
              <a
                href={`/work/${t.slug}`}
                className="inline-block mt-4 text-sm font-semibold
                text-transparent bg-clip-text
                bg-gradient-to-r from-purple-600 to-blue-500"
              >
                View Case Study →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
