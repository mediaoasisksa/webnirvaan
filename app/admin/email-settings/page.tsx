'use client'

import { useEffect, useState } from 'react'

export default function EmailSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [formData, setFormData] = useState({
    smtpHost: '',
    smtpPort: '587',
    smtpSecure: false,
    smtpUser: '',
    smtpPassword: '',
    adminEmail: '',
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/email-settings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setFormData({
          smtpHost: data.smtpHost || '',
          smtpPort: data.smtpPort?.toString() || '587',
          smtpSecure: data.smtpSecure || false,
          smtpUser: data.smtpUser || '',
          smtpPassword: '', // Don't populate password field
          adminEmail: data.adminEmail || '',
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setMessage({ type: 'error', text: 'Failed to load email settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/email-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Email settings updated successfully!' })
        // Clear password field if saved
        setFormData({ ...formData, smtpPassword: '' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update settings' })
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'An error occurred while saving settings' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">Loading email settings...</div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Email Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configure SMTP settings for contact form email notifications
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message && (
            <div
              className={`rounded-md p-4 ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="smtpHost" className="block text-sm font-medium text-gray-700">
                SMTP Host *
              </label>
              <input
                type="text"
                name="smtpHost"
                id="smtpHost"
                required
                value={formData.smtpHost}
                onChange={handleChange}
                placeholder="smtp.gmail.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
              />
              <p className="mt-1 text-xs text-gray-500">e.g., smtp.gmail.com, smtp-mail.outlook.com</p>
            </div>

            <div>
              <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-700">
                SMTP Port *
              </label>
              <input
                type="number"
                name="smtpPort"
                id="smtpPort"
                required
                value={formData.smtpPort}
                onChange={handleChange}
                placeholder="587"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
              />
              <p className="mt-1 text-xs text-gray-500">Usually 587 (TLS) or 465 (SSL)</p>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center">
                <input
                  id="smtpSecure"
                  name="smtpSecure"
                  type="checkbox"
                  checked={formData.smtpSecure}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="smtpSecure" className="ml-2 block text-sm text-gray-900">
                  Use SSL/TLS (usually for port 465)
                </label>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="smtpUser" className="block text-sm font-medium text-gray-700">
                SMTP Username/Email *
              </label>
              <input
                type="email"
                name="smtpUser"
                id="smtpUser"
                required
                value={formData.smtpUser}
                onChange={handleChange}
                placeholder="your-email@gmail.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-700">
                SMTP Password *
              </label>
              <input
                type="password"
                name="smtpPassword"
                id="smtpPassword"
                value={formData.smtpPassword}
                onChange={handleChange}
                placeholder={formData.smtpPassword ? '••••••••' : 'Leave blank to keep current password'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
              />
              <p className="mt-1 text-xs text-gray-500">
                For Gmail: Use an App Password, not your regular password. Leave blank to keep current password.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
                Admin Email (Notification Recipient) *
              </label>
              <input
                type="email"
                name="adminEmail"
                id="adminEmail"
                required
                value={formData.adminEmail}
                onChange={handleChange}
                placeholder="admin@webnirvaan.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
              />
              <p className="mt-1 text-xs text-gray-500">
                Email address where contact form notifications will be sent
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Gmail Setup Instructions</h3>
        <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
          <li>Enable 2-Step Verification on your Google Account</li>
          <li>Go to <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="underline">App Passwords</a></li>
          <li>Generate an App Password for "Mail"</li>
          <li>Use the 16-character password in the SMTP Password field above</li>
        </ol>
      </div>
    </div>
  )
}
