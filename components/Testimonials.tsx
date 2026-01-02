export default function Testimonials({ items }: { items: any[] }) {
    if (!items || items.length === 0) return null;
  
    return (
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Client Testimonials
        </h2>
  
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl p-6 shadow"
            >
              <p className="text-gray-700 italic">
                “{t.quote}”
              </p>
  
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.role}, {t.company}
                  </p>
                </div>
  
                {t.rating && (
                  <div className="text-yellow-500">
                    {"★".repeat(t.rating)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  