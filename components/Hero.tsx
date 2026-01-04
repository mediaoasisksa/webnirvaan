'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            We Build High-Performing Websites & Apps
            <span className="block bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 bg-clip-text text-transparent mt-2">
              That Drive Growth for Small & Mid-Size Businesses
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Increase conversions, launch faster, and scale your business with custom web and mobile solutions. 
            <span className="block mt-2 font-semibold text-gray-900">
              Average 20% revenue growth for our clients.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#contact"
              className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-primary-700 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get a Free Quote
            </Link>
            <Link
              href="#portfolio"
              className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all duration-200"
            >
              View Case Studies
            </Link>
            <Link
              href="#services"
              className="bg-gray-100 text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all duration-200"
            >
              Our Services
            </Link>
          </div>

          {/* Stats or Features */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-1">100+</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent mb-1">50+</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent mb-1">20%</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">Avg Revenue Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-1">5+</div>
              <div className="text-sm md:text-base text-gray-600 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}
