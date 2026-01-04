'use client'

import Link from 'next/link'

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js. Responsive, fast, and scalable solutions tailored to your business needs.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Modern Stack'],
  },
  {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android. We create intuitive, feature-rich apps that engage users and drive business results.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: ['iOS & Android', 'Cross-Platform', 'Native Performance', 'App Store Ready'],
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful, user-centered designs that create memorable experiences. We combine aesthetics with functionality to deliver interfaces users love.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce platforms with secure payment integration, inventory management, and seamless shopping experiences.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    features: ['Payment Integration', 'Inventory Management', 'Order Tracking', 'Analytics'],
  },
  {
    title: 'API Development',
    description: 'RESTful and GraphQL APIs designed for scalability and performance. We build robust backends that power your applications.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ['REST & GraphQL', 'Documentation', 'Security', 'Scalable Architecture'],
  },
  {
    title: 'Consulting & Support',
    description: 'Expert guidance on technology choices, architecture, and best practices. Ongoing support to keep your digital products running smoothly.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: ['Technical Consulting', 'Code Reviews', 'Performance Optimization', '24/7 Support'],
  },
]

export default function Services() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions to help your business thrive in the modern world
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Icon */}
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-4 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 w-fit">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm text-gray-700">
                    <svg
                      className="w-5 h-5 text-secondary-500 mr-2.5 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`#contact?service=${encodeURIComponent(service.title.toLowerCase().replace(/\s+/g, '-'))}`}
                className="inline-block text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Get Quote →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
