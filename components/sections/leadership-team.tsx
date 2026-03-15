'use client'

import { useReveal } from '@/hooks/useReveal'
import { Crown, User, ClipboardList, Users, Settings } from 'lucide-react'

const leaders = [
  {
    name: 'Prof. (Dr.) Satyajit Chakrabarti',
    role: 'President',
    department: 'President, IEM-UEM Group',
    icon: Crown,
    featured: true,
  },
  {
    name: 'Prof. (Dr.) Satyajit Chakrabarti',
    role: 'Chairman',
    department: 'Director, IEM-UEM Group',
    icon: User,
    featured: true,
  },
  {
    name: 'Prof. Amartya Mukherjee',
    role: 'Secretary',
    department: 'HOD, Dept. of CSE(AIML)',
    icon: ClipboardList,
    featured: false,
  },
  {
    name: 'Prof. Ayan Kr. Panja',
    role: 'Convenor',
    department: 'Asst. HOD, Dept. of CSE(AIML)',
    icon: Users,
    featured: false,
  },
  {
    name: 'Prof. (Dr.) Swarnendu Ghosh',
    role: 'Centre-in-Charge',
    department: 'Assoc. Prof, Dept. of CSE(AIML)',
    icon: Settings,
    featured: false,
  },
]

export default function LeadershipTeam() {
  const revealRef = useReveal()

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: 'var(--surface-dark)' }}
      ref={revealRef}
    >
      {/* Gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(124, 58, 237, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container-main relative z-10">
        <div className="text-center mb-14 reveal">
          <p className="eyebrow !text-primary/60 mb-4">Governance</p>
          <h2 className="heading-display text-[clamp(2rem,4.5vw,3.25rem)] !text-white">
            Leadership Team
          </h2>
        </div>

        {/* Top row — featured leaders */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 reveal">
          {leaders
            .filter((l) => l.featured)
            .map((leader) => (
              <div
                key={leader.role}
                className="w-[280px] p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm text-center group hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-primary/20">
                  <leader.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-[0.6875rem] font-bold tracking-[0.15em] uppercase text-primary/70 mb-2">
                  {leader.role}
                </p>
                <h3 className="text-[1rem] font-bold text-white mb-1">
                  {leader.name}
                </h3>
                <p className="text-[0.75rem] text-white/40">
                  {leader.department}
                </p>
              </div>
            ))}
        </div>

        {/* Bottom row — other leaders */}
        <div className="flex flex-wrap justify-center gap-5 reveal">
          {leaders
            .filter((l) => !l.featured)
            .map((leader) => (
              <div
                key={leader.role}
                className="w-[240px] p-5 rounded-2xl border border-white/8 bg-white/[0.03] text-center group hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4 bg-accent/20">
                  <leader.icon className="w-5 h-5 text-accent/80" />
                </div>
                <p className="text-[0.625rem] font-bold tracking-[0.15em] uppercase text-accent/60 mb-1.5">
                  {leader.role}
                </p>
                <h3 className="text-[0.9375rem] font-bold text-white mb-1">
                  {leader.name}
                </h3>
                <p className="text-[0.6875rem] text-white/35">
                  {leader.department}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
