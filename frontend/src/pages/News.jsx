import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Tag } from 'lucide-react'

const articles = [
  {
    category: 'Agribusiness',
    date: 'March 2026',
    title: 'KESME SACCO Partners with Avocado Exporters to Boost Farmer Incomes',
    excerpt: 'In a landmark partnership, KESME SACCO has signed agreements with three major avocado exporters to provide structured off-take arrangements for our member farmers in Machakos County, guaranteeing prices and reducing market risk.',
    tag: 'Partnership',
  },
  {
    category: 'Financial Products',
    date: 'February 2026',
    title: 'New Emergency Loan Product Launched for Active Members',
    excerpt: 'KESME SACCO has introduced a faster emergency loan product that allows qualifying members to access up to KES 50,000 within 24 hours — no collateral required for active savers with a 6-month savings history.',
    tag: 'Product Launch',
  },
  {
    category: 'Capacity Building',
    date: 'January 2026',
    title: 'Over 200 Members Complete Financial Literacy Training Program',
    excerpt: 'KESME SACCO\'s quarterly financial literacy workshops reached over 200 members across Machakos and neighbouring counties, covering budgeting, credit management, and digital financial services.',
    tag: 'Training',
  },
  {
    category: 'Membership',
    date: 'December 2025',
    title: 'KESME SACCO Crosses 1,000 Active Members Milestone',
    excerpt: 'We are proud to announce that KESME SACCO has officially crossed the 1,000 active member mark — a testament to the trust our members place in us and the value our products and services deliver to rural communities.',
    tag: 'Milestone',
  },
  {
    category: 'Agribusiness',
    date: 'November 2025',
    title: 'Poultry Financing Program Expanded to Three New Sub-Counties',
    excerpt: 'Following the success of our pilot poultry financing program, KESME SACCO is expanding the product to three additional sub-counties — bringing affordable credit for chicks, feeds, and housing to hundreds more farmers.',
    tag: 'Expansion',
  },
  {
    category: 'Governance',
    date: 'October 2025',
    title: 'Annual General Meeting 2025 – Key Resolutions Passed',
    excerpt: 'The 2025 AGM brought together members from across our coverage area. Key resolutions included the approval of new dividend rates, expansion of the board, and adoption of a new three-year strategic plan.',
    tag: 'Governance',
  },
]

const tagColors = {
  Partnership:   'bg-blue-50 text-blue-600',
  'Product Launch': 'bg-green-pale text-green',
  Training:      'bg-purple-50 text-purple-600',
  Milestone:     'bg-gold-pale text-gold-dark',
  Expansion:     'bg-teal-50 text-teal-600',
  Governance:    'bg-gray-100 text-gray-600',
}

export default function News() {
  return (
    <main>
      {/* PAGE HERO */}
      <section className="relative bg-green-dark pt-32 pb-20 overflow-hidden">
        <div className="hero-pattern" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">News & Updates</span>
          </div>
          <h1 className="font-poppins font-black text-4xl md:text-5xl text-white mb-4">News & Updates</h1>
          <p className="text-white/70 text-lg max-w-xl">Stay up to date with the latest developments, product launches, and stories from KESME SACCO.</p>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">Latest</span>
            <h2 className="font-poppins font-black text-3xl text-green-dark mb-3">Recent News</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Updates, milestones, and stories from across KESME SACCO and our member community.</p>
          </div>

          {/* Featured Article */}
          <div className="card border border-gray-100 mb-8 grid lg:grid-cols-2 gap-0 overflow-hidden p-0">
            <div className="bg-green-pale flex items-center justify-center min-h-[220px]">
              <div className="text-center text-green/30 p-8">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 mx-auto mb-3">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                </svg>
                <p className="font-poppins font-semibold text-sm">Featured Story</p>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[articles[0].tag]}`}>{articles[0].tag}</span>
                <span className="flex items-center gap-1 text-gray-400 text-xs"><Calendar size={12} />{articles[0].date}</span>
              </div>
              <h3 className="font-poppins font-bold text-green-dark text-xl mb-3">{articles[0].title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{articles[0].excerpt}</p>
              <span className="btn-primary text-sm py-2.5 px-5 cursor-pointer">Read More <ArrowRight size={14} /></span>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map(a => (
              <div key={a.title} className="card border border-gray-100 flex flex-col">
                <div className="bg-green-pale rounded-xl h-36 flex items-center justify-center mb-4 text-green/25">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10">
                    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tagColors[a.tag]}`}>{a.tag}</span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs"><Calendar size={11} />{a.date}</span>
                </div>
                <h4 className="font-poppins font-bold text-green-dark mb-2 flex-1">{a.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{a.excerpt}</p>
                <span className="text-green font-semibold text-sm flex items-center gap-1 cursor-pointer hover:text-green-dark transition-colors">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-green-dark">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="section-tag-gold">Stay Informed</span>
          <h2 className="font-poppins font-black text-3xl text-white mb-3">Get KESME News Delivered</h2>
          <p className="text-white/65 mb-8 max-w-md mx-auto">Be the first to know about new products, training opportunities, and member stories.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold"
            />
            <button className="btn-gold px-6 py-3 text-sm whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-poppins font-black text-3xl text-white mb-2">Have a story to share?</h2>
            <p className="text-white/75">If you're a member with a success story, we'd love to feature you in our next newsletter.</p>
          </div>
          <Link to="/contact" className="btn-gold whitespace-nowrap py-4 px-8 text-base shrink-0">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
