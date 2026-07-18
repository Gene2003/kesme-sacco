import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, Mail, Globe, MessageCircle, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ fname: '', lname: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      {/* PAGE HERO */}
      <section className="relative bg-green-dark pt-32 pb-20 overflow-hidden">
        <div className="hero-pattern" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-xl">Visit us, call us, or send us a message — our team is ready to help you find the right financial solution.</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <span className="section-tag">Get in Touch</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">We'd Love to Hear From You</h2>
            <p className="text-gray-500 leading-relaxed mb-10">Whether you're a prospective member, existing member with a query, or a partner looking to collaborate — reach out through any of the channels below.</p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-green-pale text-green flex items-center justify-center shrink-0"><MapPin size={20} /></div>
                <div>
                  <h4 className="font-poppins font-bold text-green-dark text-sm mb-1">Office Address</h4>
                  <p className="text-gray-600 text-sm">Shanbad Building, Machakos, Kenya</p>
                  <p className="text-gray-400 text-xs mt-1">Mon – Fri: 8:00 AM – 5:00 PM<br />Saturday: 9:00 AM – 1:00 PM</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-green-pale text-green flex items-center justify-center shrink-0"><Phone size={20} /></div>
                <div>
                  <h4 className="font-poppins font-bold text-green-dark text-sm mb-1">Phone Numbers</h4>
                  <a href="tel:+254795054992" className="text-gray-600 text-sm block hover:text-green transition-colors">+254 795 054 992</a>
                  <a href="tel:+254722957416" className="text-gray-600 text-sm block hover:text-green transition-colors">+254 722 957 416</a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-green-pale text-green flex items-center justify-center shrink-0"><Mail size={20} /></div>
                <div>
                  <h4 className="font-poppins font-bold text-green-dark text-sm mb-1">Email Address</h4>
                  <a href="mailto:admin@kesmesacco.com" className="text-gray-600 text-sm hover:text-green transition-colors">admin@kesmesacco.com</a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-green-pale text-green flex items-center justify-center shrink-0"><Globe size={20} /></div>
                <div>
                  <h4 className="font-poppins font-bold text-green-dark text-sm mb-1">Website</h4>
                  <a href="http://www.kesmesacco.com" target="_blank" rel="noopener" className="text-gray-600 text-sm hover:text-green transition-colors">www.kesmesacco.com</a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0"><MessageCircle size={20} /></div>
                <div>
                  <h4 className="font-poppins font-bold text-green-dark text-sm mb-1">WhatsApp</h4>
                  <a href="https://wa.me/254795054992" target="_blank" rel="noopener" className="text-gray-600 text-sm hover:text-green transition-colors">Chat with us on WhatsApp</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="font-poppins font-bold text-green-dark text-xl mb-6">Send Us a Message</h3>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <CheckCircle2 size={56} className="text-green" />
                <h4 className="font-poppins font-bold text-green-dark text-lg">Message Sent!</h4>
                <p className="text-gray-500 text-sm">Thank you! We'll get back to you within one business day.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline-green mt-2">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">First Name *</label>
                    <input name="fname" value={form.fname} onChange={handleChange} required
                      placeholder="John"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Last Name *</label>
                    <input name="lname" value={form.lname} onChange={handleChange} required
                      placeholder="Mutua"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">What can we help with?</label>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green transition-colors text-gray-600">
                    <option value="">Select a topic...</option>
                    <option>Membership Inquiry</option>
                    <option>Loan / Credit Products</option>
                    <option>Savings Products</option>
                    <option>Agribusiness Financing</option>
                    <option>Financial Training</option>
                    <option>Market Linkages</option>
                    <option>Partnership Inquiry</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required
                    rows={5} placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green transition-colors resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3">
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="rounded-2xl bg-green-pale flex flex-col items-center justify-center py-16 gap-4 text-center">
            <MapPin size={40} className="text-green/50" />
            <p className="font-poppins font-semibold text-green-dark">Shanbad Building, Machakos, Kenya</p>
            <a href="https://maps.google.com/?q=Machakos,Kenya" target="_blank" rel="noopener" className="btn-outline-green text-sm py-2.5 px-6">
              View on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-poppins font-black text-3xl text-white mb-2">Not sure where to start?</h2>
            <p className="text-white/75">Our friendly team will walk you through all the options and help you pick the right product for your goals.</p>
          </div>
          <a href="tel:+254795054992" className="btn-gold whitespace-nowrap py-4 px-8 text-base shrink-0">
            Call Us Now <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  )
}
