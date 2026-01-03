"use client";

import { useState } from "react";

export default function AiPricingCalculator() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculate = async () => {
    try {
      setLoading(true);
      setError("");
      setResult("");

      const res = await fetch("/api/ai/pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessType: "Startup",
          pages: 10,
          ecommerce: true,
          ai: true,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch pricing");
      }

      const data = await res.json();
      setResult(data.estimate);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold">AI Pricing Estimator</h2>

      <button
        onClick={calculate}
        disabled={loading}
        className="mt-6 px-6 py-3 rounded text-white font-semibold
        bg-gradient-to-r from-purple-600 to-blue-500 disabled:opacity-60"
      >
        {loading ? "Calculating..." : "Estimate Cost"}
      </button>

      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}

      {result && (
        <div className="mt-6 max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <pre className="whitespace-pre-wrap text-left">{result}</pre>
        </div>
      )}
    </section>
  );
}
