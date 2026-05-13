import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/products',    label: 'Products' },
  { to: '/agribusiness',label: 'Agribusiness' },
  { to: '/membership',  label: 'Membership' },
  { to: '/news',        label: 'News' },
  { to: '/contact',     label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname }              = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || pathname !== '/'
        ? 'bg-green-dark shadow-lg py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="KESME SACCO Ltd"
            className="h-16 w-auto group-hover:scale-105 transition-transform"
          />
          <div className="leading-tight">
            <div className="font-poppins font-black text-white text-base tracking-wide">KESME</div>
            <div className="font-opensans text-gold text-[10px] tracking-widest uppercase">SACCO LTD</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg font-poppins font-medium text-sm transition-all duration-200 ${
                pathname === l.to
                  ? 'text-gold bg-white/10'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link to="/membership" className="hidden lg:inline-flex btn-gold text-sm py-2.5 px-5">
            Join Now
          </Link>
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-green-dark border-t border-white/10 px-6 pb-6 pt-2 flex flex-col gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-3 rounded-lg font-poppins font-medium text-sm transition-all ${
                pathname === l.to
                  ? 'text-gold bg-white/10'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/membership" className="btn-gold mt-3 text-sm py-3 text-center">
            Join Now
          </Link>
        </div>
      </div>
    </header>
  )
}
