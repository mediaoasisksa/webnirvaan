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

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  const limit = 20

  const fetchContacts = async () => {
    setLoading(true)
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
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [skip])

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      setSkip(0)
      fetchContacts()
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage all contact form submissions ({total} total)
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-4 py-2 border"
        />
      </div>

      {/* Contacts Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500">Loading contacts...</div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500">No contacts found</div>
        </div>
      ) : (
        <>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {contact.name}
                          </p>
                          <p className="ml-2 text-sm text-gray-500">
                            {contact.email}
                          </p>
                        </div>
                        {contact.phone && (
                          <p className="mt-1 text-sm text-gray-500">
                            Phone: {contact.phone}
                          </p>
                        )}
                        {contact.service && (
                          <p className="mt-1 text-sm text-gray-500">
                            Service: {contact.service}
                          </p>
                        )}
                        <p className="mt-2 text-sm text-gray-600">
                          {contact.message}
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
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
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {skip + 1} to {Math.min(skip + limit, total)} of {total} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSkip(Math.max(0, skip - limit))}
                disabled={skip === 0}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setSkip(skip + limit)}
                disabled={skip + limit >= total}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
