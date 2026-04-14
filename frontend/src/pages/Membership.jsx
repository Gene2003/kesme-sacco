import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronDown, Download, DollarSign, Shield, BookOpen, MapPin, Users, Zap } from 'lucide-react'

const benefits = [
  { icon: <DollarSign size={22} />, title: 'Access to Affordable Loans', desc: 'Borrow up to 5x your savings at competitive interest rates with flexible repayment terms tailored to your income cycle.' },
  { icon: <Shield size={22} />, title: 'Secure, Interest-Earning Savings', desc: 'Your savings are safe, regulated, and earn competitive interest — growing your wealth passively over time.' },
  { icon: <BookOpen size={22} />, title: 'Free Business & Financial Training', desc: 'All members access financial literacy workshops, business planning support, and capacity building at no extra cost.' },
  { icon: <MapPin size={22} />, title: 'Market Linkages & Opportunities', desc: 'Connect to structured markets, buyers, and commercial value chains to grow your farm or business income.' },
  { icon: <Users size={22} />, title: 'Community & Group Support', desc: 'Join a community of like-minded entrepreneurs and farmers. Access group products and peer support networks.' },
  { icon: <Zap size={22} />, title: 'Emergency Loan Access', desc: 'Active members qualify for fast-tracked emergency loans disbursed within 24 hours when you need them most.' },
]

const requirements = [
  'Valid National ID or Passport (original + copy)',
  'Completed membership application form',
  'One-time registration fee (KES 1,000)',
  'Share capital contribution (KES 5,000 minimum)',
  'Minimum monthly savings commitment (KES 500+)',
  'Passport-size photograph (2 copies)',
  'Nominated next of kin details',
]

const steps = [
  { num: '1', title: 'Fill Application Form', desc: 'Download the membership form or collect one from our Machakos office. Fill in your personal, financial, and next-of-kin details.' },
  { num: '2', title: 'Submit Documents', desc: 'Bring your completed form, ID copy, photographs, and registration fee to our office. Our team will verify your documents and process your application.' },
  { num: '3', title: 'Start Saving & Growing', desc: 'Once approved, your account is activated. Begin making your monthly savings contributions and access all KESME SACCO products and benefits.' },
]

const downloads = [
  { title: 'Membership Application Form', desc: 'PDF – For new members' },
  { title: 'Loan Application Form', desc: 'PDF – For all loan products' },
  { title: 'Group Registration Form', desc: 'PDF – For chamas & cooperatives' },
]

const faqs = [
  { q: 'Who can join KESME SACCO?', a: 'KESME SACCO is open to any Kenyan resident aged 18 and above — including smallholder farmers, agribusiness entrepreneurs, SME owners, youth, women groups, cooperative societies, and individuals seeking to improve their financial wellbeing.' },
  { q: 'How soon can I access a loan after joining?', a: 'New members can apply for a loan after 3 months of consistent savings contributions. Emergency loans may be available after 1 month for qualifying members. The loan amount you qualify for is based on your savings history and ability to repay.' },
  { q: 'What interest rate do you charge on loans?', a: 'Interest rates vary by product type and member history, ranging from 12% to 18% per annum on reducing balance. Agribusiness and group loans may attract preferential rates. Contact us for your personalised rate.' },
  { q: 'Can a group or chama join as a single member?', a: 'Yes. We have a Group Savings Account and Group Boost Financing specifically designed for chamas, self-help groups, and table banking groups. Groups can save collectively and access group loans.' },
  { q: 'Is my money safe with KESME SACCO?', a: 'KESME SACCO is regulated by SASRA and operates under the SACCO Societies Act. Member deposits are safeguarded, and the SACCO maintains prudential standards set by the regulator.' },
  { q: 'Can I withdraw my savings at any time?', a: 'Regular savings can be partially withdrawn, subject to maintaining the minimum balance required to qualify for products. Fixed deposits can only be accessed at maturity or with a penalty for early withdrawal.' },
  { q: 'How do I repay my loan?', a: 'Loan repayments can be made via M-Pesa to our Paybill number, direct bank transfer, or cash at our office. For agribusiness loans, we align repayment to your harvest or income cycle.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-poppins font-semibold text-green-dark hover:bg-gray-50 transition-colors text-sm gap-4">
        {q}
        <ChevronDown size={18} className={`shrink-0 text-green transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ${open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function Membership() {
  return (
    <main>
      {/* PAGE HERO */}
      <section className="relative bg-green-dark pt-32 pb-20 overflow-hidden">
        <div className="hero-pattern" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span><span className="text-white">Membership</span>
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">Join KESME SACCO</h1>
          <p className="text-white/70 text-lg max-w-xl">Become part of a forward-looking cooperative that is transforming lives through finance, knowledge, and opportunity.</p>
        </div>
      </section>

      {/* BENEFITS + REQUIREMENTS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">Why Join?</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Membership Benefits</h2>
            <p className="text-gray-500 max-w-xl mx-auto">When you join KESME SACCO, you gain more than a savings account — you gain a financial partner for life.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              {benefits.map(b => (
                <div key={b.title} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-green-pale text-green flex items-center justify-center shrink-0">{b.icon}</div>
                  <div>
                    <h4 className="font-poppins font-bold text-green-dark text-sm mb-1">{b.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-green-dark rounded-2xl p-8">
              <h3 className="font-poppins font-bold text-white text-xl mb-6">Membership Requirements</h3>
              <div className="space-y-3">
                {requirements.map((r, i) => (
                  <div key={r} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center font-poppins font-bold text-xs text-green-dark shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-white/75 text-sm leading-relaxed">{r}</p>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-gold mt-8 w-full justify-center">Contact Us to Start</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">How to Join</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Three Simple Steps</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Joining KESME SACCO is straightforward. Here's what the process looks like.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(s => (
              <div key={s.num} className="card border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-green text-white font-poppins font-black text-2xl flex items-center justify-center mx-auto mb-4">{s.num}</div>
                <h4 className="font-poppins font-bold text-green-dark mb-3">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Resources</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Downloadable Forms</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {downloads.map(d => (
              <div key={d.title} className="card border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-green">
                <div className="w-12 h-12 rounded-xl bg-green-pale text-green flex items-center justify-center shrink-0">
                  <Download size={22} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-green-dark text-sm">{d.title}</h4>
                  <p className="text-gray-400 text-xs">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">Forms are available at our office at Shanbad Building, Machakos or by contacting us directly.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">FAQ</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Answers to the most common questions about joining and using KESME SACCO.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-poppins font-black text-3xl text-white mb-2">Ready to become a member?</h2>
            <p className="text-white/75">Visit our office at Shanbad Building, Machakos or reach us by phone and email to start your journey.</p>
          </div>
          <Link to="/contact" className="btn-gold whitespace-nowrap py-4 px-8 text-base shrink-0">
            Contact Us to Apply <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
