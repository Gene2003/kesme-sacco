import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const focusAreas = [
  { emoji: '🥑', title: 'Avocado Value Chain', desc: 'Kenya is a top avocado exporter. We finance farmers from seedling to export — covering inputs, post-harvest handling, packaging, and market access to premium international buyers.' },
  { emoji: '🌿', title: 'Horticulture', desc: 'Supporting vegetable, fruit, and flower growers with input financing, irrigation equipment credit, cold storage access, and connections to domestic and export markets.' },
  { emoji: '🐓', title: 'Poultry & Livestock', desc: 'Credit for chicks, feeds, veterinary costs, and housing — with links to processors and offtakers to ensure your poultry and livestock enterprise is commercially viable.' },
  { emoji: '🌾', title: 'Cereals & Grains', desc: 'Seasonal credit for maize, beans, and other cereal farmers aligned to planting and harvest timelines, with access to aggregated market channels and storage solutions.' },
  { emoji: '🍵', title: 'Cash Crops', desc: 'Supporting coffee, tea, macadamia and other cash crop farmers with medium-term credit for plantation maintenance, processing equipment, and value addition activities.' },
  { emoji: '🐟', title: 'Aquaculture & Fisheries', desc: 'Financing for fish farming, cage culture, and fisheries enterprises — including pond construction, fingerlings, feeds, and links to urban market buyers.' },
]

const products = [
  { title: 'Input Financing', desc: 'Credit for seeds, fertilisers, pesticides, and inputs at the start of each season. Repayable at harvest.' },
  { title: 'Seasonal Credit', desc: 'Short-term credit aligned to production cycles with harvest-time repayment schedules.' },
  { title: 'Value Chain Financing', desc: 'End-to-end financing from farm to market, supporting every actor in the chain.' },
  { title: 'Cooperative Financing', desc: 'Tailored loans for farmer cooperatives to bulk-purchase inputs and invest in shared infrastructure.' },
  { title: 'Post-Harvest Financing', desc: 'Credit for storage, processing, packaging, and transport to reduce post-harvest losses.' },
  { title: 'Market Linkage Support', desc: 'Connecting farmers to structured off-take agreements with commercial buyers and exporters.' },
]

const steps = [
  { num: '01', title: 'Apply', desc: 'Visit our office or contact us to initiate your agri-financing application. Bring your farm details, ID, and a brief description of your enterprise.' },
  { num: '02', title: 'Assessment', desc: 'Our agribusiness team conducts a farm/enterprise assessment to understand your needs, production cycle, and repayment capacity.' },
  { num: '03', title: 'Disbursement', desc: 'Approved financing is disbursed directly or to certified input suppliers — linked to your production schedule.' },
  { num: '04', title: 'Support & Repayment', desc: 'Ongoing support through the production season. Repayment is aligned to your harvest or income schedule.' },
]

export default function Agribusiness() {
  return (
    <main>
      {/* PAGE HERO */}
      <section className="relative bg-green-dark pt-32 pb-20 overflow-hidden">
        <div className="hero-pattern" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span><span className="text-white">Agribusiness & Value Chains</span>
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">Agribusiness & Value Chains</h1>
          <p className="text-white/70 text-lg max-w-xl">Empowering farmers, cooperatives, and agribusiness entrepreneurs with finance, training, and market access.</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag">Supporting Agriculture</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-5">Finance That Follows<br/>the Farming Cycle</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Agriculture is the backbone of Kenya's economy and the primary livelihood for millions of families. Yet farmers and agribusiness actors consistently face barriers to finance — rigid repayment schedules, lack of collateral, and limited market access.</p>
            <p className="text-gray-600 leading-relaxed mb-4">KESME SACCO bridges this gap with <strong className="text-green-dark">tailored agribusiness financing products</strong> that align with production cycles, support the full value chain, and are packaged with training and market linkage support.</p>
            <p className="text-gray-600 leading-relaxed mb-8">From smallholder farmers in Machakos to cooperative societies and agribusiness SMEs, we design our products to match the real rhythms of agricultural production — not the other way around.</p>
            <Link to="/contact" className="btn-primary">Discuss Agri-Financing <ArrowRight size={16} /></Link>
          </div>
          <div className="rounded-2xl bg-green-pale aspect-square flex flex-col items-center justify-center gap-4 text-green/40">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-24 h-24">
              <path d="M12 22V12M12 12C12 7 7 2 2 2c0 5 5 10 10 10zM12 12c0-5 5-10 10-10-0 5-5 10-10 10z"/>
            </svg>
            <p className="font-poppins font-semibold text-sm">Agriculture Financing</p>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">Our Focus Areas</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Value Chains We Support</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We work across key agricultural value chains where our financing can have the greatest impact.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map(f => (
              <div key={f.title} className="card border border-gray-100">
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h4 className="font-poppins font-bold text-green-dark mb-2">{f.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 bg-green-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag-gold">Our Products</span>
            <h2 className="font-poppins font-black text-3xl text-white mb-3">Agribusiness Financial Products</h2>
            <p className="text-white/60 max-w-xl mx-auto">Designed to match your production cycle and grow your agribusiness enterprise.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(p => (
              <div key={p.title} className="bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl p-6 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-poppins font-bold text-white mb-1">{p.title}</h4>
                    <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">Simple Process</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">How Agri-Financing Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A simple, farmer-friendly process from application to harvest repayment.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-green-pale z-0" />
                )}
                <div className="relative z-10 card border border-gray-100 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-pale flex items-center justify-center font-poppins font-black text-2xl text-green mx-auto mb-4">{s.num}</div>
                  <h4 className="font-poppins font-bold text-green-dark mb-2">{s.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-poppins font-black text-3xl text-white mb-2">Ready to grow your agribusiness?</h2>
            <p className="text-white/75">Talk to our agribusiness financing team today and let's build a solution for your farm or enterprise.</p>
          </div>
          <Link to="/contact" className="btn-gold whitespace-nowrap py-4 px-8 text-base shrink-0">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
