export default function About() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
                About WebNirvaan
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We are a passionate team of developers, designers, and digital strategists dedicated to
              transforming ideas into exceptional digital experiences. With years of experience in the
              industry, we've helped countless businesses achieve their goals through innovative
              technology solutions.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to deliver high-quality, scalable, and user-friendly applications that
              not only meet but exceed our clients' expectations. We believe in building long-term
              partnerships and providing ongoing support to ensure your digital products continue to
              thrive.
            </p>

            {/* Key Points */}
            <div className="space-y-4">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-secondary-500 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Expert Team</h4>
                  <p className="text-gray-600">
                    Skilled professionals with expertise in the latest technologies and best practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-secondary-500 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Client-Focused</h4>
                  <p className="text-gray-600">
                    We prioritize understanding your business needs and delivering solutions that drive real results.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-secondary-500 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Innovation Driven</h4>
                  <p className="text-gray-600">
                    Always staying ahead with cutting-edge technologies and modern development approaches.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary-600 via-accent-500 to-secondary-500 rounded-2xl p-8 text-white shadow-2xl">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-2">Our Values</div>
                  <div className="h-1 w-20 bg-white rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">Quality First</h4>
                    <p className="text-white/90">
                      We never compromise on quality, ensuring every project meets the highest standards.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">Transparency</h4>
                    <p className="text-white/90">
                      Clear communication and honest feedback throughout the development process.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">Continuous Improvement</h4>
                    <p className="text-white/90">
                      We constantly learn and adapt to deliver better solutions for our clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
