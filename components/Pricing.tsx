export default function Pricing() {
    return (
      <section className="bg-gray-50 py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Simple & Transparent Pricing
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Choose a plan that fits your business needs. No hidden costs.
            </p>
          </div>
  
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Starter */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900">
                Starter Website
              </h3>
  
              <p className="text-4xl font-bold mt-4 text-gray-900">
                ₹25,000
              </p>
  
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✔ Up to 5 Pages</li>
                <li>✔ Responsive Design</li>
                <li>✔ Contact Form</li>
                <li>✔ Basic SEO</li>
              </ul>
  
              <a
                href="#contact"
                className="mt-8 block text-center rounded-lg py-3 font-semibold text-white
                bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
              >
                Get Started
              </a>
            </div>
  
            {/* Business (Highlighted) */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent
                bg-clip-padding">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2
                  bg-gradient-to-r from-purple-600 to-blue-500
                  text-white text-sm font-semibold px-4 py-1 rounded-full">
                Most Popular
              </div>
  
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                Business Website
              </h3>
  
              <p className="text-4xl font-bold mt-4 text-gray-900">
                ₹55,000
              </p>
  
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✔ Up to 12 Pages</li>
                <li>✔ Admin Panel</li>
                <li>✔ SEO Optimized</li>
                <li>✔ 1 Month Support</li>
              </ul>
  
              <a
                href="#contact"
                className="mt-8 block text-center rounded-lg py-3 font-semibold text-white
                bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
              >
                Choose Plan
              </a>
            </div>
  
            {/* Custom */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900">
                Custom Solution
              </h3>
  
              <p className="text-4xl font-bold mt-4 text-gray-900">
                ₹1,00,000+
              </p>
  
              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✔ Custom UI / UX</li>
                <li>✔ API Integrations</li>
                <li>✔ Cloud Deployment</li>
              </ul>
  
              <a
                href="#contact"
                className="mt-8 block text-center rounded-lg py-3 font-semibold text-white
                bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  