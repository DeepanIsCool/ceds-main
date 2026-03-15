'use client'

import { useEffect, useState, useRef } from 'react'
import { FlaskConical, BookOpen, Users, GraduationCap, Calendar } from 'lucide-react'

const stats = [
  { label: 'Projects', value: 9, suffix: '+', icon: FlaskConical },
  { label: 'Publications', value: 8, suffix: '+', icon: BookOpen },
  { label: 'Mentors', value: 4, suffix: '', icon: Users },
  { label: 'Students', value: 10, suffix: '+', icon: GraduationCap },
  { label: 'Events', value: 10, suffix: '+', icon: Calendar },
]

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1500
          const start = performance.now()

          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - t, 4) // ease-out quart
            setCount(Math.round(ease * end))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: 'var(--surface-dark)' }}
    >
      {/* Gradient mesh */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(37, 99, 235, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 30%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)
        `
      }} />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 bg-white/5">
                <s.icon className="w-4 h-4 text-white/30" />
              </div>
              <p
                className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-white mb-1 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Counter end={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-white/30">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
