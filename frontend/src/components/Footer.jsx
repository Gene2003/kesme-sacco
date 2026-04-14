import { Link } from 'react-router-dom'
import { Phone, Mail, Globe, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-dark text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center font-poppins font-black text-xl text-green-dark">K</div>
            <div className="leading-tight">
              <div className="font-poppins font-black text-white text-base tracking-wide">KESME</div>
              <div className="font-opensans text-gold text-[10px] tracking-widest uppercase">SACCO LTD</div>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-5">
            'Simplifying money matters for rural wealth creation'<br/>
            Kenya Small and Micro Entrepreneurs SACCO Ltd.
          </p>
          <div className="flex gap-2">
            {['f','t','w','in'].map(s => (
              <a key={s} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold hover:text-green-dark flex items-center justify-center text-xs font-bold transition-all duration-200 text-white">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-poppins font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              ['/','Home'],['/about','About Us'],['/products','Products & Services'],
              ['/agribusiness','Agribusiness'],['/membership','Membership'],
              ['/news','News & Updates'],['/contact','Contact']
            ].map(([to,label]) => (
              <Link key={to} to={to} className="text-white/65 hover:text-gold text-sm transition-colors duration-200">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-poppins font-bold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
          <div className="flex flex-col gap-2">
            {['Savings Accounts','Loans & Credit','Agribusiness Loans','SME Financing','Financial Training','Market Linkages'].map(s => (
              <Link key={s} to="/products" className="text-white/65 hover:text-gold text-sm transition-colors duration-200">
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-poppins font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-start">
              <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
              <span className="text-white/65 text-sm">Shanbad Building, Machakos, Kenya</span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={16} className="text-gold shrink-0" />
              <div className="flex flex-col gap-1">
                <a href="tel:+254795054992" className="text-white/65 hover:text-gold text-sm transition-colors">+254 795 054 992</a>
                <a href="tel:+254722957416" className="text-white/65 hover:text-gold text-sm transition-colors">+254 722 957 416</a>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:admin@kesmesacco.com" className="text-white/65 hover:text-gold text-sm transition-colors">admin@kesmesacco.com</a>
            </div>
            <div className="flex gap-3 items-center">
              <Globe size={16} className="text-gold shrink-0" />
              <a href="http://www.kesmesacco.com" target="_blank" rel="noopener" className="text-white/65 hover:text-gold text-sm transition-colors">www.kesmesacco.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">© 2026 Kenya Small and Micro Entrepreneurs (KESME) SACCO Ltd. All rights reserved.</p>
          <a href="#" className="text-white/50 hover:text-gold text-xs transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
