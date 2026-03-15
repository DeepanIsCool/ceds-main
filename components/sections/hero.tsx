import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105"
        autoPlay
        muted
        playsInline
        loop
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay — no fade to grey */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.5) 50%, rgba(15,23,42,0.85) 100%)'
      }} />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-6 pt-28 pb-24">
        {/* CEDS Full Logo */}
        <div
          className="mb-10 animate-fade-in animate-float"
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          <Image
            src="/ceds_logo_full.webp"
            alt="CEDS — Centre for Excellence in Data Science"
            width={140}
            height={140}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        {/* Eyebrow */}
        <p
          className="eyebrow mb-6 !text-white/50 animate-fade-in"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          Institute of Engineering & Management
        </p>

        {/* Heading — Editorial Serif */}
        <h1
          className="heading-display text-[clamp(2.5rem,7vw,5rem)] text-center max-w-[16ch] mb-6 animate-fade-in-up !text-white"
          style={{
            animationDelay: '0.2s',
            animationFillMode: 'both',
          }}
        >
          Centre for Excellence in Data Science
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/40 text-[clamp(0.875rem,1.5vw,1.0625rem)] font-normal max-w-[44ch] text-center leading-relaxed mb-12 animate-fade-in"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          Advancing research at the intersection of data science, machine learning, and artificial intelligence.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[0.875rem] font-semibold transition-all duration-300 shadow-xl shadow-primary/20"
            style={{ background: 'var(--primary)', color: 'white' }}
          >
            Explore Research
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
          <Link
            href="/about"
            className="px-7 py-3.5 border border-white/20 text-white/70 rounded-full text-[0.875rem] font-medium hover:text-white hover:border-white/40 hover:bg-white/[0.06] transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
