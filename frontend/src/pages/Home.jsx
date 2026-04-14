import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Users, TrendingUp, Shield, BookOpen, MapPin, Leaf } from 'lucide-react'

const stats = [
  { number: '1,000+', label: 'Members Served' },
  { number: '8+',     label: 'Financial Products' },
  { number: '60%',    label: 'Women & Youth' },
  { number: 'Machakos', label: 'Shanbad Building' },
]

const services = [
  {
    icon: <TrendingUp size={28} />,
    color: 'bg-green-pale text-green',
    title: 'Savings Accounts',
    desc: 'Flexible, interest-earning savings products designed around your income cycles.',
  },
  {
    icon: <Shield size={28} />,
    color: 'bg-gold-pale text-gold-dark',
    title: 'Loans & Credit',
    desc: 'Affordable loans for agribusiness, SMEs, personal development, and emergencies.',
  },
  {
    icon: <Leaf size={28} />,
    color: 'bg-blue-50 text-blue-600',
    title: 'Agribusiness Financing',
    desc: 'Tailored financial solutions for farmers, cooperatives, and agribusiness SMEs.',
  },
  {
    icon: <BookOpen size={28} />,
    color: 'bg-purple-50 text-purple-600',
    title: 'Financial Training',
    desc: 'Capacity building in financial literacy, business planning, and market access.',
  },
]

const whyUs = [
  { icon: <Users size={24} />, title: 'Fast & Reliable Loan Processing', desc: 'Our streamlined processes ensure you get funds when you need them most.' },
  { icon: <TrendingUp size={24} />, title: 'Tailored Financial Solutions', desc: 'Products and repayment plans crafted around your unique cash flows and needs.' },
  { icon: <Leaf size={24} />, title: 'Strong Agribusiness Focus', desc: 'Deep expertise in agricultural value chains — from smallholder farmers to cooperatives.' },
  { icon: <BookOpen size={24} />, title: 'Capacity Building Support', desc: 'Training, mentorship, and business development services that grow you beyond just the loan.' },
  { icon: <Shield size={24} />, title: 'Trusted & Member-Driven', desc: 'Governed by members, for members. Every decision is made in the interest of our community.' },
  { icon: <MapPin size={24} />, title: 'Market Linkages & Partnerships', desc: 'Connecting members to structured commercial markets and value chain actors.' },
]

const testimonials = [
  {
    initials: 'JM', name: 'John Mutua', role: 'Smallholder Farmer, Machakos',
    text: '"KESME SACCO gave me a loan to expand my avocado farm. Within one season my income had doubled. The team understood my farming cycle and structured the repayment perfectly."',
  },
  {
    initials: 'GW', name: 'Grace Wanjiku', role: 'Youth Entrepreneur, SME Owner',
    text: '"As a young entrepreneur, I struggled to get a bank loan. KESME believed in my business idea, gave me startup financing, and even connected me to buyers. Game changer!"',
  },
  {
    initials: 'MM', name: 'Mary Mwende', role: "Group Leader, Women's Chama",
    text: '"Our women\'s group has been saving with KESME for two years. The table banking financing helped all 20 of us grow our businesses. The training on financial planning was invaluable."',
  },
]

const impact = [
  { num: '1,000+', label: 'Members Served Across the Region' },
  { num: '60%+',   label: 'Women & Youth Inclusion Rate' },
  { num: '50+',    label: 'Farmer Groups Supported' },
  { num: '8+',     label: 'Unique Financial Products Offered' },
]

const partners = ['Ministry of Agriculture','SASRA','Kenya Co-op Alliance','County Government','Value Chain Partners']

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen bg-green-dark flex items-center overflow-hidden">
        <div className="hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-dark via-green to-green-dark opacity-90" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Kenya Small & Micro Entrepreneurs SACCO
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-6xl text-white leading-tight mb-6 max-w-3xl">
            Empowering Your<br />
            <span className="text-gold">Financial Growth</span>,<br />
            Every Step of the Way
          </h1>
          <p className="text-white/70 text-lg mb-4 italic font-medium">'Simplifying money matters for rural wealth creation'</p>
          <p className="text-white/70 text-base max-w-xl leading-relaxed mb-10">
            Affordable loans, smart savings, and agribusiness financing designed for your success.
            A member-driven cooperative built for small entrepreneurs, farmers, and youth across Kenya.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/membership" className="btn-gold py-4 px-8 text-base">
              Join KESME SACCO <ArrowRight size={18} />
            </Link>
            <Link to="/products" className="btn-outline py-4 px-8 text-base">
              Apply for a Loan
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-green py-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-poppins font-black text-3xl text-white mb-1">{s.number}</div>
              <div className="text-white/70 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl bg-green-pale aspect-square flex flex-col items-center justify-center gap-4 text-green/40">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-24 h-24">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <p className="font-poppins font-semibold text-sm">Your SACCO, Your Community</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-dark text-white rounded-xl px-5 py-4 shadow-xl">
              <div className="font-poppins font-black text-3xl text-gold">2020+</div>
              <div className="text-white/70 text-xs">Serving Members Since</div>
            </div>
          </div>
          <div>
            <span className="section-tag">About KESME SACCO</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-4">A SACCO Built Around You</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              KESME SACCO is a dynamic, member-driven Savings and Credit Cooperative dedicated to empowering individuals,
              groups, and agribusiness enterprises through accessible financial services, capacity building, and market-driven solutions.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded on the principles of <strong className="text-green-dark">financial inclusion, sustainability, and economic empowerment</strong>,
              KESME SACCO provides innovative financial products tailored to meet the evolving needs of its members.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {['Registered and regulated SACCO in Kenya','Focused on agricultural and SME sectors','Strong track record in capacity building'].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="text-green shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary">Learn More About Us <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">What We Offer</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Our Key Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Comprehensive financial and business solutions designed for your growth journey.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => (
              <div key={s.title} className="card border border-gray-100">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>{s.icon}</div>
                <h4 className="font-poppins font-bold text-green-dark mb-2">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-green-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag-gold">Our Strengths</span>
            <h2 className="font-poppins font-black text-3xl text-white mb-3">Why Choose KESME SACCO?</h2>
            <p className="text-white/60 max-w-xl mx-auto">We go beyond financing — we walk with you at every step of your entrepreneurial journey.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(w => (
              <div key={w.title} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold mb-4">{w.icon}</div>
                <h4 className="font-poppins font-bold text-white mb-2 text-sm">{w.title}</h4>
                <p className="text-white/55 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">Member Stories</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">What Our Members Say</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Real stories from members whose lives have been transformed by KESME SACCO.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="card border border-gray-100 flex flex-col gap-4">
                <div className="text-gold text-xl">★★★★★</div>
                <blockquote className="text-gray-600 text-sm leading-relaxed italic flex-1">{t.text}</blockquote>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center font-poppins font-bold text-white text-sm shrink-0">{t.initials}</div>
                  <div>
                    <div className="font-poppins font-semibold text-green-dark text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20 bg-green-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag-gold">Our Impact</span>
            <h2 className="font-poppins font-black text-3xl text-white">Making a Real Difference</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impact.map(i => (
              <div key={i.label} className="bg-white/8 border border-white/10 rounded-2xl p-6 text-center">
                <div className="font-poppins font-black text-4xl text-gold mb-2">{i.num}</div>
                <div className="text-white/65 text-sm leading-relaxed">{i.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h3 className="font-poppins font-bold text-green-dark mb-8 text-sm uppercase tracking-widest">Our Partners & Networks</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {partners.map(p => (
              <div key={p} className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-medium hover:border-green hover:text-green transition-all duration-200">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-poppins font-black text-3xl text-white mb-2">Join a SACCO that works for you</h2>
            <p className="text-white/75">Become part of a forward-looking cooperative transforming lives through finance, knowledge, and opportunity.</p>
          </div>
          <Link to="/membership" className="btn-gold whitespace-nowrap py-4 px-8 text-base shrink-0">
            Become a Member Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
