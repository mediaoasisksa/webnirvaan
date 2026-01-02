"use client";

import { useState } from "react";
import { projects } from "./PortfolioData";
import ProjectModal from "./ProjectModal";

const filters = ["All", "AI", "Business", "Corporate"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<any>(null);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="py-24 bg-white" id="portfolio">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Our Work
          </h2>
          <p className="mt-4 text-gray-600">
            Real projects delivered for real businesses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full font-semibold transition
              ${
                active === f
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {filtered.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelected(project)}
              className="group cursor-pointer bg-gray-50 rounded-2xl shadow-lg p-6
              hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-40 bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-400">
                Screenshot
              </div>

              <span className="inline-block mb-3 text-sm font-semibold
                bg-gradient-to-r from-purple-600 to-blue-500
                text-white px-3 py-1 rounded-full">
                {project.tag}
              </span>

              <h3 className="text-xl font-semibold">{project.name}</h3>

              <p className="mt-2 text-gray-600 text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((t: string) => (
                  <span
                    key={t}
                    className="text-xs bg-white px-3 py-1 rounded-full shadow"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
