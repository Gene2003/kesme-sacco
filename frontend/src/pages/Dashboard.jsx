import { Link } from 'react-router-dom'
import { LogOut, Sprout, Users, Briefcase, User, Wallet, FileText, TrendingUp } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const TYPE_META = {
  farmer:      { label: 'Smallholder Farmer', icon: Sprout,    accent: 'Agri-finance for your farm' },
  cooperative: { label: 'Cooperative',        icon: Users,     accent: 'Group savings & financing' },
  sme:         { label: 'Agribusiness SME',   icon: Briefcase, accent: 'Working capital for your business' },
  individual:  { label: 'Individual Member',  icon: User,      accent: 'Personal savings & loans' },
  group:       { label: 'Group / Chama',      icon: Users,     accent: 'Group savings & loans' },
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const meta = TYPE_META[user?.member_type] || TYPE_META.individual
  const Icon = meta.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-green-dark text-white shadow-md">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="KESME SACCO" className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="font-poppins font-black text-base tracking-wide">KESME</div>
              <div className="font-opensans text-gold text-[10px] tracking-widest uppercase">Member Portal</div>
            </div>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>

      {/* Welcome header */}
      <section className="bg-gradient-to-br from-green-dark to-green text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 backdrop-blur flex items-center justify-center">
            <Icon size={32} className="text-gold" />
          </div>
          <div>
            <div className="text-white/70 text-sm">{meta.accent}</div>
            <h1 className="font-poppins font-bold text-2xl md:text-3xl mt-1">
              Welcome, {user?.first_name || user?.username}
            </h1>
            <div className="text-white/80 text-sm mt-1">
              Member No: <span className="font-mono">{user?.member_number}</span> · {meta.label}
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="max-w-[1200px] mx-auto px-6 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={<Wallet size={20} />} label="Total Savings" value={formatKES(user?.total_savings)} />
          <StatCard icon={<FileText size={20} />} label="Active Loans" value={user?.active_loans_count ?? 0} />
          <StatCard icon={<TrendingUp size={20} />} label="Share Capital" value={formatKES(user?.share_capital)} />
        </div>
      </section>

      {/* Phase 2 placeholder cards */}
      <section className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Apply for a Loan"
          desc="Submit a new loan application tailored to your member type."
          cta="Coming soon"
        />
        <FeatureCard
          title="My Savings"
          desc="View your savings balance and transaction history."
          cta="Coming soon"
        />
        <FeatureCard
          title="Payment Statements"
          desc="Download monthly statements and loan repayment schedules."
          cta="Coming soon"
        />
      </section>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center gap-4">
      <div className="w-11 h-11 rounded-lg bg-green-pale text-green-dark flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
        <div className="font-poppins font-bold text-xl text-gray-900">{value}</div>
      </div>
    </div>
  )
}

function FeatureCard({ title, desc, cta }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-poppins font-semibold text-lg text-green-dark mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{desc}</p>
      <button
        disabled
        className="text-sm font-medium text-gray-400 bg-gray-100 px-4 py-2 rounded-lg cursor-not-allowed"
      >
        {cta}
      </button>
    </div>
  )
}

function formatKES(n) {
  if (n === undefined || n === null) return 'KES 0'
  const num = typeof n === 'string' ? parseFloat(n) : n
  return 'KES ' + num.toLocaleString('en-KE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}
