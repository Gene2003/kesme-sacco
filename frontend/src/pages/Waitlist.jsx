import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList, CheckCircle2, Bell } from 'lucide-react'
import { api } from '../lib/api'

export default function Waitlist() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await api('/api/contact/waitlist/', { method: 'POST', auth: false, body: form })
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-dark via-green to-green-light flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-12 text-center">
          <CheckCircle2 size={64} className="text-green mx-auto mb-4" />
          <h1 className="font-poppins font-bold text-2xl text-green-dark mb-3">You're on the list!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in KESME SACCO. We'll notify you by email and phone as soon as member registration opens.
          </p>
          <Link to="/" className="inline-block bg-green-dark hover:bg-green text-white font-poppins font-medium px-6 py-3 rounded-lg transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 mb-4">
            <ClipboardList size={32} className="text-gold-dark" />
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-4xl text-green-dark">
            Join the Waiting List
          </h1>
          <p className="text-gray-600 mt-3 max-w-md mx-auto">
            Member registration is opening soon. Leave your details and we'll notify you the moment we're ready to onboard new members.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-green-dark px-8 py-5 flex items-center gap-3">
            <Bell size={20} className="text-gold" />
            <h2 className="font-poppins font-semibold text-white">
              We'll notify you when registration is on
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <Field
              label="Full name"
              required
              value={form.name}
              onChange={v => update('name', v)}
              placeholder="John Mwangi"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Email address"
                type="email"
                required
                value={form.email}
                onChange={v => update('email', v)}
                placeholder="you@example.com"
              />
              <Field
                label="Phone number"
                type="tel"
                required
                value={form.phone}
                onChange={v => update('phone', v)}
                placeholder="07XXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={e => update('message', e.target.value)}
                placeholder="Tell us a bit about yourself or what you're hoping to do with KESME (farming, agribusiness, savings group, etc.)"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-dark hover:bg-green text-white font-poppins font-medium py-3 rounded-lg transition-colors disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Join the Waiting List'}
            </button>

            <p className="text-center text-xs text-gray-500">
              By submitting, you agree to be contacted by KESME SACCO regarding membership opportunities.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
      />
    </div>
  )
}
