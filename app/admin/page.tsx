'use client'

import { useEffect, useState } from 'react'

interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  message: string
  createdAt: string
}

type Tab = 'dashboard' | 'contacts' | 'email-settings'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [stats, setStats] = useState({
    totalContacts: 0,
    recentContacts: 0,
    loading: true,
  })

  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactsLoading, setContactsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const limit = 20

  // Email settings state
  const [emailLoading, setEmailLoading] = useState(true)
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

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const response = await fetch('/api/admin/contacts?limit=100', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          const recentDate = new Date()
          recentDate.setDate(recentDate.getDate() - 7)

          const recent = data.contacts.filter((contact: any) => {
            return new Date(contact.createdAt) >= recentDate
          })

          setStats({
            totalContacts: data.total,
            recentContacts: recent.length,
            loading: false,
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats({ ...stats, loading: false })
      }
    }

    fetchStats()
  }, [])

  // Fetch contacts
  const fetchContacts = async () => {
    setContactsLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
      const response = await fetch(
        `/api/admin/contacts?limit=${limit}&skip=${skip}${searchParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
        setTotal(data.total)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setContactsLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts()
    }
  }, [skip, activeTab])

  useEffect(() => {
    if (activeTab === 'contacts') {
      const timer = setTimeout(() => {
        setSkip(0)
        fetchContacts()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [search])

  // Fetch email settings
  useEffect(() => {
    if (activeTab === 'email-settings') {
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
              smtpPassword: '',
              adminEmail: data.adminEmail || '',
            })
          }
        } catch (error) {
          console.error('Error fetching settings:', error)
          setMessage({ type: 'error', text: 'Failed to load email settings' })
        } finally {
          setEmailLoading(false)
        }
      }

      fetchSettings()
    }
  }, [activeTab])

  const handleEmailSubmit = async (e: React.FormEvent) => {
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const tabs = [
    { id: 'dashboard' as Tab, name: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: 'contacts' as Tab, name: 'Contacts', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )},
    { id: 'email-settings' as Tab, name: 'Email Settings', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
  ]

  return (
    <div className="px-3 py-4 sm:px-4 sm:py-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
          Welcome to the WebNirvaan Admin Dashboard
        </p>
      </div>

      {/* Tabs - Mobile optimized with scroll */}
      <div className="border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto -mx-3 sm:mx-0">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 px-3 sm:px-0 min-w-max sm:min-w-0" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group inline-flex items-center py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span className={`mr-1.5 sm:mr-2 transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className="hidden sm:inline">{tab.name}</span>
              <span className="sm:hidden text-xs">{tab.name.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg">
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                          Total Contacts
                        </dt>
                        <dd className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                          {stats.loading ? (
                            <span className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></span>
                          ) : (
                            stats.totalContacts
                          )}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 text-white shadow-lg">
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                          Recent (7 days)
                        </dt>
                        <dd className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                          {stats.loading ? (
                            <span className="inline-block w-8 h-8 border-4 border-accent-200 border-t-accent-500 rounded-full animate-spin"></span>
                          ) : (
                            stats.recentContacts
                          )}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-secondary-500 to-accent-500 text-white shadow-lg">
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                          Growth Rate
                        </dt>
                        <dd className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                          {stats.loading ? (
                            <span className="inline-block w-8 h-8 border-4 border-secondary-200 border-t-secondary-500 rounded-full animate-spin"></span>
                          ) : stats.totalContacts > 0 ? (
                            `${Math.round((stats.recentContacts / stats.totalContacts) * 100)}%`
                          ) : (
                            '0%'
                          )}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="group relative rounded-xl border-2 border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6 shadow-md flex items-center space-x-3 sm:space-x-4 hover:border-primary-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">View Contacts</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Manage all contact form submissions
                    </p>
                  </div>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => setActiveTab('email-settings')}
                  className="group relative rounded-xl border-2 border-gray-200 bg-white px-4 py-4 sm:px-6 sm:py-6 shadow-md flex items-center space-x-3 sm:space-x-4 hover:border-accent-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">Email Settings</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Configure SMTP and email preferences
                    </p>
                  </div>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-accent-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="animate-fadeIn">
            <div className="mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contacts</h2>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                  View and manage all contact form submissions ({total} total)
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Contacts Table */}
            {contactsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500">Loading contacts...</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="mt-4 text-gray-500">No contacts found</p>
              </div>
            ) : (
              <>
                <div className="bg-white shadow-lg overflow-hidden sm:rounded-xl border border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <li key={contact.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <div className="px-3 py-4 sm:px-6 sm:py-5">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                                  {contact.name}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 truncate sm:ml-3">
                                  {contact.email}
                                </p>
                              </div>
                              {contact.phone && (
                                <p className="mt-2 text-xs sm:text-sm text-gray-600">
                                  <span className="font-medium">Phone:</span> {contact.phone}
                                </p>
                              )}
                              {contact.service && (
                                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                                  <span className="font-medium">Service:</span> {contact.service}
                                </p>
                              )}
                              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                                {contact.message}
                              </p>
                              <p className="mt-2 sm:mt-3 text-xs text-gray-400">
                                {formatDate(contact.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pagination */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white px-3 sm:px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                    Showing <span className="font-medium">{skip + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(skip + limit, total)}</span> of{' '}
                    <span className="font-medium">{total}</span> results
                  </div>
                  <div className="flex space-x-2 justify-center sm:justify-end">
                    <button
                      onClick={() => setSkip(Math.max(0, skip - limit))}
                      disabled={skip === 0}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-1 sm:flex-initial"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setSkip(skip + limit)}
                      disabled={skip + limit >= total}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex-1 sm:flex-initial"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Email Settings Tab */}
        {activeTab === 'email-settings' && (
          <div className="animate-fadeIn">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Email Settings</h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                Configure SMTP settings for contact form email notifications
              </p>
            </div>

            {emailLoading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-gray-500">Loading email settings...</p>
              </div>
            ) : (
              <div className="bg-white shadow-lg sm:rounded-xl border border-gray-200">
                <form onSubmit={handleEmailSubmit} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                  {message && (
                    <div
                      className={`rounded-lg p-4 border-2 ${
                        message.type === 'success'
                          ? 'bg-green-50 text-green-800 border-green-200'
                          : 'bg-red-50 text-red-800 border-red-200'
                      }`}
                    >
                      <div className="flex items-center">
                        {message.type === 'success' ? (
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        {message.text}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="smtpHost" className="block text-sm font-semibold text-gray-700 mb-2">
                        SMTP Host *
                      </label>
                      <input
                        type="text"
                        name="smtpHost"
                        id="smtpHost"
                        required
                        value={formData.smtpHost}
                        onChange={handleEmailChange}
                        placeholder="smtp.gmail.com"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 sm:text-sm px-4 py-3 border transition-all duration-200"
                      />
                      <p className="mt-2 text-xs text-gray-500">e.g., smtp.gmail.com, smtp-mail.outlook.com</p>
                    </div>

                    <div>
                      <label htmlFor="smtpPort" className="block text-sm font-semibold text-gray-700 mb-2">
                        SMTP Port *
                      </label>
                      <input
                        type="number"
                        name="smtpPort"
                        id="smtpPort"
                        required
                        value={formData.smtpPort}
                        onChange={handleEmailChange}
                        placeholder="587"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 sm:text-sm px-4 py-3 border transition-all duration-200"
                      />
                      <p className="mt-2 text-xs text-gray-500">Usually 587 (TLS) or 465 (SSL)</p>
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                          id="smtpSecure"
                          name="smtpSecure"
                          type="checkbox"
                          checked={formData.smtpSecure}
                          onChange={handleEmailChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="smtpSecure" className="ml-3 block text-sm font-medium text-gray-900">
                          Use SSL/TLS (usually for port 465)
                        </label>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="smtpUser" className="block text-sm font-semibold text-gray-700 mb-2">
                        SMTP Username/Email *
                      </label>
                      <input
                        type="email"
                        name="smtpUser"
                        id="smtpUser"
                        required
                        value={formData.smtpUser}
                        onChange={handleEmailChange}
                        placeholder="your-email@gmail.com"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 sm:text-sm px-4 py-3 border transition-all duration-200"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="smtpPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                        SMTP Password *
                      </label>
                      <input
                        type="password"
                        name="smtpPassword"
                        id="smtpPassword"
                        value={formData.smtpPassword}
                        onChange={handleEmailChange}
                        placeholder={formData.smtpPassword ? '••••••••' : 'Leave blank to keep current password'}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 sm:text-sm px-4 py-3 border transition-all duration-200"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        For Gmail: Use an App Password, not your regular password. Leave blank to keep current password.
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="adminEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                        Admin Email (Notification Recipient) *
                      </label>
                      <input
                        type="email"
                        name="adminEmail"
                        id="adminEmail"
                        required
                        value={formData.adminEmail}
                        onChange={handleEmailChange}
                        placeholder="admin@webnirvaan.com"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 sm:text-sm px-4 py-3 border transition-all duration-200"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Email address where contact form notifications will be sent
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 sm:pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full sm:w-auto inline-flex justify-center py-2.5 sm:py-3 px-4 sm:px-6 border border-transparent shadow-lg text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        'Save Settings'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="mt-4 sm:mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2 sm:mb-3 flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Gmail Setup Instructions
              </h3>
              <ol className="text-xs sm:text-sm text-blue-800 list-decimal list-inside space-y-1.5 sm:space-y-2">
                <li>Enable 2-Step Verification on your Google Account</li>
                <li>Go to <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-blue-900">App Passwords</a></li>
                <li>Generate an App Password for "Mail"</li>
                <li>Use the 16-character password in the SMTP Password field above</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
