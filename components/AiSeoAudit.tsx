"use client";
import { useState } from "react";

export default function AiSeoAudit() {
  const [audit, setAudit] = useState("");

  const runAudit = async () => {
    const res = await fetch("/api/ai/seo-audit", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    });
    const data = await res.json();
    setAudit(data.audit);
  };

  return (
    <section className="py-24 bg-white text-center">
      <h2 className="text-3xl font-bold">AI SEO Audit</h2>
      <button
        onClick={runAudit}
        className="mt-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded"
      >
        Run Free Audit
      </button>
      {audit && <pre className="mt-6 text-left max-w-3xl mx-auto">{audit}</pre>}
    </section>
  );
}
