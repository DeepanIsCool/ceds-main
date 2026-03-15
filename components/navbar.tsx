'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Mentors', href: '/mentors' },
  { name: 'Students', href: '/students' },
  { name: 'Projects', href: '/projects' },
  { name: 'Publications', href: '/publications' },
  { name: 'Events', href: '/events' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? 'bg-[#0f1729] shadow-lg shadow-black/20'
          : isHome
            ? 'bg-transparent'
            : 'bg-[#0f1729]'
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-[5rem]">
          {/* Left side: All logos + brand */}
          <Link href="/" className="flex items-center gap-3">
            {/* IEM Logo */}
            <Image
              src="/iem_logo.svg"
              alt="IEM"
              width={44}
              height={32}
              className="brightness-[10] opacity-90 transition-opacity duration-300 hover:opacity-100"
            />

            {/* Divider */}
            <div className="w-px h-7 bg-white/25" />

            {/* CEDS Logo + Name */}
            <div className="flex items-center gap-2.5">
              <Image
                src="/ceds-logo.avif"
                alt="CEDS"
                width={34}
                height={34}
                className="rounded-md"
              />
              <span
                className="text-[1.125rem] font-bold tracking-[-0.02em] text-white hidden sm:inline"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                IEMCEDS
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-7 bg-white/25" />

            {/* UEM Logo */}
            <Image
              src="/uem_logo.svg"
              alt="UEM"
              width={44}
              height={32}
              className="brightness-[10] opacity-90 transition-opacity duration-300 hover:opacity-100"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-[0.9rem] font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/[0.15]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-full text-white hover:bg-white/[0.08] transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0f1729] border-t border-white/[0.08]">
          <div className="container-main py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-[0.9375rem] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.12] text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
