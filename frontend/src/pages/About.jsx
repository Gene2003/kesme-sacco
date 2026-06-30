import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Target, Shield, Search, Users, Layers, Leaf, BookOpen } from 'lucide-react'

const values = [
  { icon: <Shield size={24} />, title: 'Integrity', desc: 'We operate with honesty, transparency, and accountability at every level.' },
  { icon: <Search size={24} />, title: 'Transparency', desc: 'Open books, clear processes, and honest communication with all members.' },
  { icon: <Users size={24} />, title: 'Member Focus', desc: 'Every product, policy, and decision is made with member wellbeing at the center.' },
  { icon: <Layers size={24} />, title: 'Innovation', desc: 'Continuously developing new products and leveraging technology to serve members better.' },
  { icon: <Leaf size={24} />, title: 'Sustainability', desc: 'Building long-term financial and environmental sustainability for members and communities.' },
]

const approach = [
  { num: '01', color: 'border-green', numColor: 'text-green', title: 'Finance', desc: 'Providing accessible savings, credit, and investment products designed around the realities of small entrepreneurs and farmers — including seasonal repayment schedules, low entry barriers, and competitive rates.' },
  { num: '02', color: 'border-gold', numColor: 'text-gold-dark', title: 'Training & Capacity Building', desc: 'Equipping members with financial literacy, business planning skills, record keeping, and credit management knowledge — turning financial access into real economic growth and long-term resilience.' },
  { num: '03', color: 'border-blue-400', numColor: 'text-blue-500', title: 'Market Linkages', desc: 'Connecting members to structured commercial markets, buyers, and agribusiness value chain actors — ensuring produce reaches markets at fair prices and members participate in profitable commercial systems.' },
]

const members = [
  { icon: <Leaf size={24} />, title: 'Smallholder Farmers', desc: 'Providing seasonal credit, input financing, and market linkages to boost farm productivity and income.' },
  { icon: <BookOpen size={24} />, title: 'Agribusiness Entrepreneurs', desc: 'Supporting those along the agricultural value chain — processors, traders, and input suppliers.' },
  { icon: <Users size={24} />, title: 'Youth & Women Groups', desc: 'Empowering marginalized groups with targeted financial products and capacity building support.' },
  { icon: <Shield size={24} />, title: 'SMEs & Cooperatives', desc: 'Fuelling small and medium enterprises and cooperative societies with working capital and development loans.' },
]

const impact = [
  { num: '1,000+', label: 'Members with increased access to finance' },
  { num: '50+',    label: 'Farmer groups supported and empowered' },
  { num: '60%+',   label: 'Women & Youth inclusion in membership' },
  { num: '100%',   label: 'Commitment to commercial viability & independence' },
]

export default function About() {
  return (
    <main>
      {/* PAGE HERO */}
      <section className="relative bg-green-dark pt-32 pb-20 overflow-hidden">
        <div className="hero-pattern" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">About KESME SACCO</h1>
          <p className="text-white/70 text-lg max-w-xl">Learn who we are, what drives us, and why thousands of Kenyans choose us as their financial partner.</p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">Who We Are</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-4">Built on Purpose, Driven by People</h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              KESME SACCO is a dynamic, member-driven Savings and Credit Cooperative dedicated to empowering individuals,
              groups, and agribusiness enterprises through accessible financial services, capacity building, and market-driven solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-green-dark p-8 border-l-4 border-gold">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center text-gold mb-4"><Eye size={24} /></div>
              <h3 className="font-poppins font-bold text-white text-xl mb-3">Our Vision</h3>
              <p className="text-white/65 leading-relaxed">To be a leading SACCO in Kenya driving inclusive growth and transforming livelihoods through sustainable financial services — reaching every smallholder, every entrepreneur, every community.</p>
            </div>
            <div className="rounded-2xl bg-green p-8 border-l-4 border-gold">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4"><Target size={24} /></div>
              <h3 className="font-poppins font-bold text-white text-xl mb-3">Our Mission</h3>
              <p className="text-white/75 leading-relaxed">To provide reliable, affordable, and innovative financial solutions that empower members to grow their incomes, build assets, and achieve long-term financial stability — through savings, credit, and capacity building.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">What We Stand For</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Our Core Values</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The principles that guide every decision we make and every member we serve.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map(v => (
              <div key={v.title} className="card border border-gray-100 text-center">
                <div className="w-12 h-12 rounded-xl bg-green-pale text-green flex items-center justify-center mx-auto mb-4">{v.icon}</div>
                <h4 className="font-poppins font-bold text-green-dark mb-2">{v.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">How We Work</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Our Integrated Approach</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We combine three powerful pillars to deliver real, lasting economic impact for our members.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {approach.map(a => (
              <div key={a.num} className={`rounded-2xl border-t-4 ${a.color} bg-white shadow-md p-8`}>
                <div className={`font-poppins font-black text-5xl mb-4 ${a.numColor} opacity-30`}>{a.num}</div>
                <h4 className="font-poppins font-bold text-green-dark text-lg mb-3">{a.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-24 bg-green-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag-gold">Our Members</span>
            <h2 className="font-poppins font-black text-3xl text-white mb-3">Who We Serve</h2>
            <p className="text-white/60 max-w-xl mx-auto">KESME SACCO serves a diverse, inclusive membership committed to financial growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map(m => (
              <div key={m.title} className="bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl p-6 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gold/20 text-gold flex items-center justify-center mb-4">{m.icon}</div>
                <h4 className="font-poppins font-bold text-white mb-2 text-sm">{m.title}</h4>
                <p className="text-white/55 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">Our Impact</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Transforming Lives Through Finance</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impact.map(i => (
              <div key={i.label} className="card border border-gray-100 text-center">
                <div className="font-poppins font-black text-4xl text-green mb-2">{i.num}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{i.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-poppins font-black text-3xl text-white mb-2">Be part of Kenya's growth story</h2>
            <p className="text-white/75">Join KESME SACCO and access finance, training, and market opportunities that transform your livelihood.</p>
          </div>
          <Link to="/membership" className="btn-gold whitespace-nowrap py-4 px-8 text-base shrink-0">
            Become a Member <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
