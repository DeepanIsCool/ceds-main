import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

const navColumns = [
  {
    title: 'Navigate',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Publications', href: '/publications' },
    ],
  },
  {
    title: 'People',
    links: [
      { name: 'Mentors', href: '/mentors' },
      { name: 'Students', href: '/students' },
      { name: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Research',
    links: [
      { name: 'Ongoing Projects', href: '/projects' },
      { name: 'Datasets', href: '/projects' },
      { name: 'Publications', href: '/publications' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-dark)' }}>
      {/* Gradient top border */}
      <div className="h-[2px]" style={{
        background: 'linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent)'
      }} />

      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <h3
              className="text-[1.25rem] font-bold text-white mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              IEMCEDS
            </h3>
            <p className="text-[0.8125rem] leading-[1.8] mb-6" style={{ color: '#94A3B8' }}>
              Institute of Engineering & Management Centre for Excellence in Data Science — advancing research
              and innovation in data science, machine learning, and AI.
            </p>
            <div className="space-y-2.5">
              <p className="text-[0.8125rem]" style={{ color: '#94A3B8' }}>
                ceds@iem.edu.in
              </p>
              <p className="text-[0.8125rem]" style={{ color: '#94A3B8' }}>
                IEM Management House, D-1, Street No. 13, EP Block, Sector V, Bidhannagar, Kolkata — 700091
              </p>
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4
                className="text-[0.6875rem] font-bold text-white/40 tracking-[0.15em] uppercase mb-5"
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[0.8125rem] transition-colors duration-200 hover:text-white"
                      style={{ color: '#94A3B8' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials */}
          <div className="md:col-span-2">
            <h4
              className="text-[0.6875rem] font-bold text-white/40 tracking-[0.15em] uppercase mb-5"
            >
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.75rem]" style={{ color: '#64748B' }}>
            © {new Date().getFullYear()} IEMCEDS. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-[0.75rem] hover:text-white/60 transition-colors" style={{ color: '#64748B' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-[0.75rem] hover:text-white/60 transition-colors" style={{ color: '#64748B' }}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
