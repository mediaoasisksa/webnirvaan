"use client";

import { useState } from "react";

type PricingResult = {
  priceMin: number;
  priceMax: number;
  timeline: string;
  breakdown: string[];
};

export default function AiPricingCalculator() {
  const [pages, setPages] = useState(5);
  const [ecommerce, setEcommerce] = useState(false);
  const [ai, setAi] = useState(false);
  const [result, setResult] = useState<PricingResult | null>(null);
  const [loading, setLoading] = useState(false);

  const estimateCost = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/ai/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages, ecommerce, ai }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h2 className="text-4xl font-extrabold text-gray-900">
        AI Pricing Estimator
      </h2>
      <p className="mt-3 text-gray-600">
        Get a real-time estimate powered by AI.
      </p>

      {/* Inputs */}
      <div className="mt-10 space-y-6 text-left">
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Pages
          </label>
          <input
            type="number"
            min={1}
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ecommerce}
            onChange={(e) => setEcommerce(e.target.checked)}
          />
          E-commerce functionality
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ai}
            onChange={(e) => setAi(e.target.checked)}
          />
          AI features (chatbot, automation)
        </label>

        <button
          onClick={estimateCost}
          disabled={loading}
          className="w-full py-4 rounded-xl text-white font-semibold
          bg-gradient-to-r from-purple-600 to-blue-500 disabled:opacity-60"
        >
          {loading ? "Estimating…" : "Estimate Cost"}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-12 bg-gray-50 rounded-2xl p-6 text-left">
          <h3 className="text-xl font-bold mb-2">
            🤖 AI Cost Estimate
          </h3>

          <p className="text-lg font-semibold">
            ₹ {result.priceMin.toLocaleString()} – ₹{" "}
            {result.priceMax.toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Estimated timeline: <strong>{result.timeline}</strong>
          </p>

          <ul className="mt-4 list-disc ml-6 space-y-1 text-sm">
            {result.breakdown.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <a
            href="https://wa.me/917827448032?text=Hi%20WebNirvaan%20👋%0AI%20used%20your%20AI%20pricing%20estimator%20and%20want%20to%20discuss."
            target="_blank"
            className="inline-block mt-6 bg-green-500 text-white
            px-5 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Discuss on WhatsApp →
          </a>
        </div>
      )}
    </section>
  );
}
