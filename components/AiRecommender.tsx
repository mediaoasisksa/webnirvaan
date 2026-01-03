"use client";
import { useState } from "react";

export default function AiRecommender() {
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const generate = () => {
    if (!business || !goal) return;

    setResult(
      `Based on your inputs, we recommend a ${business} website built with 
      Next.js, optimized for ${goal}. Estimated delivery: 3–5 weeks.`
    );
  };

  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">
          AI Website Recommendation
        </h2>
        <p className="mt-4 text-gray-600">
          Let our AI suggest the best solution for your business.
        </p>

        <div className="mt-10 grid gap-4">
          <input
            placeholder="Your business type (e.g. Startup, Salon, SaaS)"
            className="border rounded-lg px-4 py-3"
            onChange={(e) => setBusiness(e.target.value)}
          />
          <input
            placeholder="Your goal (leads, sales, branding)"
            className="border rounded-lg px-4 py-3"
            onChange={(e) => setGoal(e.target.value)}
          />

          <button
            onClick={generate}
            className="mt-4 py-3 rounded-lg text-white font-semibold
            bg-gradient-to-r from-purple-600 to-blue-500"
          >
            Ask AI
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-xl text-gray-800">
            🤖 {result}
          </div>
        )}
      </div>
    </section>
  );
}
