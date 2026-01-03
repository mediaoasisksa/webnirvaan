"use client";

import { useState } from "react";

type SeoAuditResult = {
  score: number;
  strengths: string[];
  issues: string[];
  recommendations: string[];
  summary: string;
};

export default function AiSeoAudit() {
  const [website, setWebsite] = useState("");
  const [business, setBusiness] = useState("");
  const [result, setResult] = useState<SeoAuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runAudit = async () => {
    if (!website || !business) {
      setError("Please enter website URL and business type.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/ai/seo-audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ website, business }),
    });

    if (!res.ok) {
      setError("Failed to run SEO audit.");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h2 className="text-4xl font-extrabold text-gray-900">
        AI SEO Audit
      </h2>
      <p className="mt-3 text-gray-600">
        Get an instant AI-powered SEO audit for your website.
      </p>

      {/* Inputs */}
      <div className="mt-10 space-y-6 text-left">
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Website URL (e.g. https://example.com)"
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          placeholder="Business type (e.g. Salon, Ecommerce)"
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          onClick={runAudit}
          disabled={loading}
          className="w-full py-4 rounded-xl text-white font-semibold
          bg-gradient-to-r from-purple-600 to-blue-500 disabled:opacity-60"
        >
          {loading ? "Auditing…" : "Run AI SEO Audit"}
        </button>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="mt-12 bg-gray-50 rounded-2xl p-6 text-left">
          <h3 className="text-xl font-bold mb-2">
            🔍 SEO Score: {result.score}/100
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            {result.summary}
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">✅ Strengths</h4>
              <ul className="list-disc ml-4 space-y-1">
                {result.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">⚠️ Issues</h4>
              <ul className="list-disc ml-4 space-y-1">
                {result.issues.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">🚀 Recommendations</h4>
              <ul className="list-disc ml-4 space-y-1">
                {result.recommendations.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/917827448032?text=Hi%20WebNirvaan%20👋%0AI%20ran%20an%20AI%20SEO%20audit%20and%20want%20to%20improve%20my%20SEO."
            target="_blank"
            className="inline-block mt-6 bg-green-500 text-white
            px-5 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Improve My SEO →
          </a>
        </div>
      )}
    </section>
  );
}
