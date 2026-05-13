import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, Users, Briefcase, CheckCircle2 } from 'lucide-react'
import { api } from '../lib/api'

const MEMBER_TYPES = [
  { key: 'farmer',      label: 'Smallholder Farmer', icon: Sprout,    desc: 'Individual farmer with smallholder operations' },
  { key: 'cooperative', label: 'Cooperative',        icon: Users,     desc: 'Registered farmer cooperative or chama' },
  { key: 'sme',         label: 'Agribusiness SME',   icon: Briefcase, desc: 'Small/medium enterprise in agricultural value chain' },
]

export default function Register() {
  const navigate = useNavigate()
  const [memberType, setMemberType] = useState('farmer')
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    id_number: '',
    password: '',
    password2: '',
  })
  const [idPhoto, setIdPhoto] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password !== form.password2) {
      setError('Passwords do not match')
      return
    }
    if (!idPhoto) {
      setError('Please upload a photo of your National ID')
      return
    }
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('member_type', memberType)
      fd.append('id_photo', idPhoto)
      await api('/api/members/', { method: 'POST', body: fd, auth: false })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 4000)
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-dark via-green to-green-light flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-12 text-center">
          <CheckCircle2 size={64} className="text-green mx-auto mb-4" />
          <h1 className="font-poppins font-bold text-2xl text-green-dark mb-3">Application Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Your application is pending admin approval. You'll be able to log in once a KESME staff member verifies your details. We'll be in touch.
          </p>
          <p className="text-sm text-gray-500">Redirecting to login…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-dark via-green to-green-light px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-green-dark px-8 py-6 text-center">
          <img src="/logo.png" alt="KESME SACCO" className="h-14 w-auto mx-auto mb-3" />
          <h1 className="font-poppins font-bold text-white text-2xl">Become a Member</h1>
          <p className="text-white/70 text-sm mt-1">Register to access loans, savings, and member benefits</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-8" encType="multipart/form-data">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Member type tabs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select your member type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {MEMBER_TYPES.map(t => {
                const Icon = t.icon
                const active = memberType === t.key
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setMemberType(t.key)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      active
                        ? 'border-green bg-green-pale shadow-sm'
                        : 'border-gray-200 hover:border-green/40'
                    }`}
                  >
                    <Icon size={24} className={active ? 'text-green-dark' : 'text-gray-500'} />
                    <div className={`font-poppins font-semibold text-sm mt-2 ${active ? 'text-green-dark' : 'text-gray-800'}`}>
                      {t.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="First name" value={form.first_name} onChange={v => update('first_name', v)} required />
            <Field label="Last name"  value={form.last_name}  onChange={v => update('last_name', v)}  required />
            <Field label="Username"   value={form.username}   onChange={v => update('username', v)}   required />
            <Field label="Email"      type="email" value={form.email} onChange={v => update('email', v)} required />
            <Field label="Phone number"      value={form.phone}     onChange={v => update('phone', v)}     required placeholder="07XXXXXXXX" />
            <Field label="National ID number" value={form.id_number} onChange={v => update('id_number', v)} required />
          </div>

          {/* ID Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo of your National ID <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={e => setIdPhoto(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-dark file:text-white hover:file:bg-green file:cursor-pointer cursor-pointer border border-gray-300 rounded-lg p-2"
            />
            {idPhoto && (
              <p className="text-xs text-gray-500 mt-1">Selected: {idPhoto.name}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Password"          type="password" value={form.password}  onChange={v => update('password', v)}  required />
            <Field label="Confirm password" type="password" value={form.password2} onChange={v => update('password2', v)} required />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-dark hover:bg-green text-white font-poppins font-medium py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            {submitting ? 'Submitting application…' : 'Submit Application'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already a member?{' '}
            <Link to="/login" className="text-green-dark font-medium hover:underline">Sign in</Link>
          </p>
        </form>
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
