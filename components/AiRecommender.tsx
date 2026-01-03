"use client";

import { useState } from "react";

type Recommendation = {
  title: string;
  stack: string;
  features: string[];
  timeline: string;
  summary: string;
};

export default function AiRecommender() {
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendation = async () => {
    if (!business || !goal) {
      setError("Please enter both business type and goal.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/ai/recommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ business, goal }),
    });

    if (!res.ok) {
      setError("Failed to get recommendation.");
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
        AI Website Recommendation
      </h2>
      <p className="mt-3 text-gray-600">
        Get a personalized recommendation powered by AI.
      </p>

      {/* Inputs */}
      <div className="mt-10 space-y-6 text-left">
        <input
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          placeholder="Business type (e.g. Salon, Ecommerce, Restaurant)"
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Goal (Leads, Sales, Branding)"
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          onClick={getRecommendation}
          disabled={loading}
          className="w-full py-4 rounded-xl text-white font-semibold
          bg-gradient-to-r from-purple-600 to-blue-500 disabled:opacity-60"
        >
          {loading ? "Thinking…" : "Ask AI"}
        </button>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="mt-12 bg-gray-50 rounded-2xl p-6 text-left">
          <h3 className="text-xl font-bold mb-2">
            🤖 {result.title}
          </h3>

          <p className="text-sm text-gray-600 mb-2">
            {result.summary}
          </p>

          <p className="text-sm mb-2">
            <strong>Tech Stack:</strong> {result.stack}
          </p>

          <ul className="list-disc ml-6 space-y-1 text-sm">
            {result.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <p className="mt-4 font-medium">
            Estimated timeline: {result.timeline}
          </p>

          <a
            href="https://wa.me/917827448032?text=Hi%20WebNirvaan%20👋%0AI%20used%20your%20AI%20website%20recommender%20and%20want%20to%20discuss."
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
