'use client'

import { useState } from 'react'
import { emailTemplates, EmailTemplate, replacePlaceholders } from '@/data/email-templates'

export default function EmailTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    company: '',
    industry: '',
    problem: '',
    solution: '',
    similarCompany: '',
    metric: '',
    timeframe: '',
    topic: '',
    yourName: 'WebNirvaan Team',
  })

  const categories = ['all', 'outreach', 'follow-up', 'nurture', 'closing']
  
  const filteredTemplates = selectedCategory === 'all'
    ? emailTemplates
    : emailTemplates.filter(t => t.category === selectedCategory)

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template)
  }

  const generateEmail = () => {
    if (!selectedTemplate) return ''
    return replacePlaceholders(selectedTemplate.body, formData)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
        <p className="mt-2 text-sm text-gray-600">
          Professional email templates for outreach, follow-ups, and closing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900">{template.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{template.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Template Editor */}
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {replacePlaceholders(selectedTemplate.subject, formData)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variables
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Metric (%)"
                      value={formData.metric}
                      onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Body
                </label>
                <textarea
                  value={generateEmail()}
                  readOnly
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard(generateEmail())}
                  className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Select a template to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

