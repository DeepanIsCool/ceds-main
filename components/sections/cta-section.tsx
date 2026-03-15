'use client'

import Link from 'next/link'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

export default function CtaSection() {
  const revealRef = useReveal()

  return (
    <section className="section-padding" style={{ background: 'var(--background)' }} ref={revealRef}>
      <div className="container-main">
        {/* Split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-xl reveal">
          {/* Left: Dark side */}
          <div
            className="p-10 md:p-14 flex flex-col justify-between min-h-[380px]"
            style={{ background: 'var(--surface-dark)' }}
          >
            <div>
              <p className="eyebrow !text-primary/60 mb-5">Get in Touch</p>
              <h2
                className="heading-display text-[clamp(1.75rem,3vw,2.5rem)] !text-white mb-6"
              >
                Let&apos;s collaborate on the next breakthrough
              </h2>
              <p className="text-white/40 text-[0.875rem] leading-[1.7] max-w-[36ch] mb-8">
                We welcome collaborations with researchers, institutions, and industry partners worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/50 text-[0.8125rem]">
                <Mail className="w-4 h-4 text-primary/60" />
                ceds@iem.edu.in
              </div>
              <div className="flex items-center gap-3 text-white/50 text-[0.8125rem]">
                <MapPin className="w-4 h-4 text-primary/60" />
                IEM Management House, D-1, Street No. 13, EP Block, Sector V, Bidhannagar, Kolkata — 700091
              </div>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full text-[0.8125rem] font-semibold text-white transition-all duration-300"
                style={{ background: 'var(--primary)' }}
              >
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right: Map */}
          <div className="min-h-[300px] lg:min-h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1234567890123!2d88.4311!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzIxLjQiTiA4OMKwMjUnNTEuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              className="min-h-[300px] lg:min-h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
