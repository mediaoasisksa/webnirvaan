'use client'

// Placeholder client logos - replace with actual client logos if available
const clients = [
  { name: 'Jynak AI', logo: '🤖' },
  { name: 'Janagate', logo: '🏢' },
  { name: 'CONSL2', logo: '💼' },
  { name: 'TechCorp', logo: '⚡' },
  { name: 'StartupHub', logo: '🚀' },
  { name: 'DigitalFlow', logo: '🌊' },
]

export default function ClientLogos() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Trusted by Leading Businesses
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full h-16 text-4xl md:text-5xl grayscale hover:grayscale-0 transition-all duration-300"
              title={client.name}
            >
              {client.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

