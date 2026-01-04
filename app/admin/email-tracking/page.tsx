'use client'

import { useState, useEffect } from 'react'

interface EmailRecord {
  id: string
  date: string
  recipient: string
  company: string
  template: string
  subject: string
  status: 'sent' | 'opened' | 'replied' | 'meeting-scheduled' | 'closed'
  notes: string
  followUpDate: string
}

export default function EmailTrackingPage() {
  const [emails, setEmails] = useState<EmailRecord[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState<Partial<EmailRecord>>({
    date: new Date().toISOString().split('T')[0],
    recipient: '',
    company: '',
    template: '',
    subject: '',
    status: 'sent',
    notes: '',
    followUpDate: '',
  })

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('email_tracking')
    if (saved) {
      setEmails(JSON.parse(saved))
    }
  }, [])

  const saveEmails = (newEmails: EmailRecord[]) => {
    setEmails(newEmails)
    localStorage.setItem('email_tracking', JSON.stringify(newEmails))
  }

  const handleAdd = () => {
    if (!formData.recipient || !formData.company) return
    
    const newEmail: EmailRecord = {
      id: Date.now().toString(),
      date: formData.date || new Date().toISOString().split('T')[0],
      recipient: formData.recipient,
      company: formData.company,
      template: formData.template || '',
      subject: formData.subject || '',
      status: formData.status || 'sent',
      notes: formData.notes || '',
      followUpDate: formData.followUpDate || '',
    }
    
    saveEmails([...emails, newEmail])
    setFormData({
      date: new Date().toISOString().split('T')[0],
      recipient: '',
      company: '',
      template: '',
      subject: '',
      status: 'sent',
      notes: '',
      followUpDate: '',
    })
    setShowAddForm(false)
  }

  const handleUpdateStatus = (id: string, status: EmailRecord['status']) => {
    saveEmails(emails.map(e => e.id === id ? { ...e, status } : e))
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this record?')) {
      saveEmails(emails.filter(e => e.id !== id))
    }
  }

  const filteredEmails = filter === 'all'
    ? emails
    : emails.filter(e => e.status === filter)

  const stats = {
    total: emails.length,
    sent: emails.filter(e => e.status === 'sent').length,
    opened: emails.filter(e => e.status === 'opened').length,
    replied: emails.filter(e => e.status === 'replied').length,
    meetings: emails.filter(e => e.status === 'meeting-scheduled').length,
    closed: emails.filter(e => e.status === 'closed').length,
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Tracking</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your cold email outreach campaigns
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          + Add Email
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.sent}</div>
          <div className="text-xs text-gray-500">Sent</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.opened}</div>
          <div className="text-xs text-gray-500">Opened</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
          <div className="text-xs text-gray-500">Replied</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">{stats.meetings}</div>
          <div className="text-xs text-gray-500">Meetings</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{stats.closed}</div>
          <div className="text-xs text-gray-500">Closed</div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Email</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Recipient Email"
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Template Used"
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as EmailRecord['status'] })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="sent">Sent</option>
              <option value="opened">Opened</option>
              <option value="replied">Replied</option>
              <option value="meeting-scheduled">Meeting Scheduled</option>
              <option value="closed">Closed</option>
            </select>
            <input
              type="date"
              placeholder="Follow-up Date"
              value={formData.followUpDate}
              onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg col-span-2"
              rows={3}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {['all', 'sent', 'opened', 'replied', 'meeting-scheduled', 'closed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Email List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmails.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No emails tracked yet. Add your first email above.
                </td>
              </tr>
            ) : (
              filteredEmails.map(email => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{email.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{email.recipient}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{email.company}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{email.template || '-'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={email.status}
                      onChange={(e) => handleUpdateStatus(email.id, e.target.value as EmailRecord['status'])}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="sent">Sent</option>
                      <option value="opened">Opened</option>
                      <option value="replied">Replied</option>
                      <option value="meeting-scheduled">Meeting Scheduled</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(email.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

