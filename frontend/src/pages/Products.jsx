import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, DollarSign, Lock, Users, TrendingUp, Zap, Briefcase, Leaf, Home as HomeIcon, CheckCircle2, BookOpen, Monitor, MapPin } from 'lucide-react'

const tabs = [
  { id: 'savings',   label: 'Savings Products' },
  { id: 'loans',     label: 'Loan Products' },
  { id: 'agri',      label: 'Agribusiness' },
  { id: 'capacity',  label: 'Capacity Building' },
]

const products = {
  savings: [
    {
      icon: <DollarSign size={26} />, iconBg: 'bg-green-pale text-green', tag: 'Savings',
      title: 'Regular Savings Account',
      desc: 'A flexible, easy-to-use savings account that earns interest on your deposits.',
      features: ['Minimum monthly contribution from KES 500','Competitive interest rates on savings','Access to loan based on savings history','No monthly maintenance fees'],
    },
    {
      icon: <Lock size={26} />, iconBg: 'bg-gold-pale text-gold-dark', tag: 'Savings',
      title: 'Fixed Deposit Account',
      desc: 'Lock your savings for a fixed period and earn higher interest returns.',
      features: ['Terms from 3 to 24 months','Higher interest than regular savings','Guaranteed returns on maturity','Can be used as loan collateral'],
    },
    {
      icon: <Users size={26} />, iconBg: 'bg-blue-50 text-blue-600', tag: 'Group',
      title: 'Group Savings Account',
      desc: 'Designed for chamas, self-help groups, and table banking groups to pool resources.',
      features: ['Supports groups of 5 to 50+ members','Transparent group account management','Access to group boost financing','Regular group financial statements'],
    },
  ],
  loans: [
    {
      icon: <TrendingUp size={26} />, iconBg: 'bg-green-pale text-green', tag: 'Credit',
      title: 'Development Loan',
      desc: 'Long-term financing for business expansion, asset acquisition, and enterprise development.',
      features: ['Up to KES 5,000,000','Repayment up to 36 months','Competitive interest rates','Flexible collateral requirements'],
    },
    {
      icon: <Zap size={26} />, iconBg: 'bg-gold-pale text-gold-dark', tag: 'Emergency',
      title: 'Emergency Loan',
      desc: 'Fast-tracked loans for urgent personal and family needs — processed within 24 hours.',
      features: ['Disbursed within 24 hours','Up to 3x your savings balance','Minimal documentation required','Repayment up to 12 months'],
    },
    {
      icon: <Briefcase size={26} />, iconBg: 'bg-purple-50 text-purple-600', tag: 'SME',
      title: 'SME Business Loan',
      desc: 'Tailored financing for small and medium enterprises — working capital, inventory, and expansion.',
      features: ['For registered and unregistered SMEs','Working capital and asset financing','Business advisory support included','Linked to capacity building training'],
    },
  ],
  agri: [
    {
      icon: <Leaf size={26} />, iconBg: 'bg-green-pale text-green', tag: 'Agriculture',
      title: 'Input Financing',
      desc: 'Credit for purchasing seeds, fertilisers, pesticides, and other agricultural inputs.',
      features: ['Linked to certified input suppliers','Repayment aligned to harvest period','Supports avocado, horticulture & more','Available for individuals and groups'],
    },
    {
      icon: <HomeIcon size={26} />, iconBg: 'bg-gold-pale text-gold-dark', tag: 'Seasonal',
      title: 'Seasonal Credit',
      desc: 'Short-term credit products aligned to agricultural production cycles, with repayment after harvest.',
      features: ['Harvest-aligned repayment schedules','Covers production and post-harvest costs','Renewable each agricultural season','Track record builds credit profile'],
    },
    {
      icon: <CheckCircle2 size={26} />, iconBg: 'bg-teal-50 text-teal-600', tag: 'Value Chain',
      title: 'Value Chain Financing',
      desc: 'Comprehensive financing across the agricultural value chain — from farm to market.',
      features: ['Avocado & horticulture value chains','Poultry and livestock support','Market linkage embedded in product','Access to structured off-take agreements'],
    },
  ],
  capacity: [
    {
      icon: <BookOpen size={26} />, iconBg: 'bg-purple-50 text-purple-600', tag: 'Training',
      title: 'Financial Literacy Training',
      desc: 'Practical training on budgeting, savings culture, debt management, and understanding financial products.',
      features: ['Group and individual sessions','Available in Swahili and English','Regular refresher workshops','Free for all active members'],
    },
    {
      icon: <Monitor size={26} />, iconBg: 'bg-blue-50 text-blue-600', tag: 'Business Dev',
      title: 'Business Development Services',
      desc: 'Coaching and advisory services for SMEs and farmer groups to strengthen business operations.',
      features: ['Business plan development support','Record keeping and bookkeeping','Market research and analysis','One-on-one business mentoring'],
    },
    {
      icon: <MapPin size={26} />, iconBg: 'bg-teal-50 text-teal-600', tag: 'Markets',
      title: 'Market Access & Linkages',
      desc: 'Connecting members to buyers, structured markets, and commercial agribusiness networks.',
      features: ['Access to export market buyers','Collective bargaining support','Market price information sharing','Trade fair participation facilitation'],
    },
  ],
}

function LoanCalculator() {
  const [amount, setAmount] = useState(100000)
  const [term,   setTerm]   = useState(12)
  const [rate,   setRate]   = useState(14)

  const monthly = amount * (rate / 100 / 12) / (1 - Math.pow(1 + rate / 100 / 12, -term))
  const total    = monthly * term
  const interest = total - amount

  const fmt = v => `KES ${Math.round(v).toLocaleString()}`

  return (
    <section className="py-24 bg-gray-50" id="calculator">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
          <div className="p-10 lg:p-12">
            <span className="section-tag">Plan Your Loan</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-2">Loan Calculator</h2>
            <p className="text-gray-500 mb-8">Estimate your monthly repayment before applying.</p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span className="text-gray-700">Loan Amount</span>
                  <span className="text-green font-bold">{fmt(amount)}</span>
                </div>
                <input type="range" min={10000} max={1000000} step={10000} value={amount}
                  onChange={e => setAmount(+e.target.value)}
                  className="w-full accent-green" />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span className="text-gray-700">Loan Term</span>
                  <span className="text-green font-bold">{term} months</span>
                </div>
                <input type="range" min={3} max={36} step={1} value={term}
                  onChange={e => setTerm(+e.target.value)}
                  className="w-full accent-green" />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span className="text-gray-700">Annual Interest Rate</span>
                  <span className="text-green font-bold">{rate}%</span>
                </div>
                <input type="range" min={10} max={24} step={0.5} value={rate}
                  onChange={e => setRate(+e.target.value)}
                  className="w-full accent-green" />
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-6">* Rates shown are indicative. Contact us for your personalised rate.</p>
            <Link to="/contact" className="btn-primary mt-6 w-full justify-center">Apply for This Loan</Link>
          </div>

          <div className="bg-green-dark p-10 lg:p-12 flex flex-col justify-center">
            <h3 className="font-poppins font-bold text-white text-xl mb-8">Your Estimate</h3>
            <div className="space-y-6">
              <div>
                <div className="text-white/60 text-sm mb-1">Monthly Repayment</div>
                <div className="font-poppins font-black text-4xl text-gold">{fmt(monthly)}</div>
              </div>
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/60 text-sm">Total Repayment</span>
                  <span className="text-white font-bold">{fmt(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 text-sm">Total Interest</span>
                  <span className="text-white font-bold">{fmt(interest)}</span>
                </div>
              </div>
            </div>
            <p className="text-white/40 text-xs mt-8 leading-relaxed">This is an estimate only. Actual repayments may vary based on your final loan terms, fees, and insurance.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('savings')

  return (
    <main>
      {/* PAGE HERO */}
      <section className="relative bg-green-dark pt-32 pb-20 overflow-hidden">
        <div className="hero-pattern" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span><span className="text-white">Products & Services</span>
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">Products & Services</h1>
          <p className="text-white/70 text-lg max-w-xl">Comprehensive financial solutions designed to empower your savings, credit, and investment goals.</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag">What We Offer</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Our Financial Products</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Choose the right financial solution for your journey.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-5 py-2.5 rounded-full font-poppins font-semibold text-sm transition-all duration-200 ${
                  activeTab === t.id
                    ? 'bg-green text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-pale hover:text-green'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {products[activeTab].map(p => (
              <div key={p.title} className="card border border-gray-100 flex flex-col">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${p.iconBg}`}>{p.icon}</div>
                <h4 className="font-poppins font-bold text-green-dark text-lg mb-2">{p.title}</h4>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-1">{p.desc}</p>
                <ul className="space-y-2 mb-4">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={15} className="text-green mt-0.5 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <span className="inline-block bg-green-pale text-green text-xs font-semibold px-3 py-1 rounded-full">{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LoanCalculator />

      {/* CTA */}
      <section className="py-20 bg-green">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-poppins font-black text-3xl text-white mb-2">Ready to apply for a product?</h2>
            <p className="text-white/75">Our loan officers are ready to guide you through the right product for your needs.</p>
          </div>
          <Link to="/contact" className="btn-gold whitespace-nowrap py-4 px-8 text-base shrink-0">
            Talk to Us Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
