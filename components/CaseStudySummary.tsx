'use client'

import Link from 'next/link'
import { caseStudies } from '@/data/caseStudies'

export default function CaseStudySummary() {
  const featuredStudies = caseStudies.slice(0, 3)

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real results from real businesses. See how we've helped companies grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-4">
                <span className="inline-block text-xs font-semibold bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full">
                  {study.industry}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {study.client}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                {study.description}
              </p>

              <div className="space-y-2 mb-4">
                {study.results.slice(0, 2).map((result, idx) => (
                  <div key={idx} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{result}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {study.tech.slice(0, 2).map((tech) => (
                    <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-primary-600 group-hover:translate-x-1 transition-transform inline-flex items-center">
                  View Case Study →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#portfolio"
            className="inline-block bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-primary-700 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  )
}

