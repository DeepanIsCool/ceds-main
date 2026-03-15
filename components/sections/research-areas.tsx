'use client'

import {
  Eye,
  HeartPulse,
  Languages,
  TrendingUp,
  Brain,
} from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const areas = [
  {
    icon: Eye,
    title: 'Computer Vision',
    desc: 'Our specialists in the field of Neural Networks and Deep Learning can bring forth advances in modern applications of image processing.',
    color: '#3B82F6',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare Informatics',
    desc: 'Experts in domains like medical imaging and bioinformatics push the boundaries of modern medicine and precision medicine.',
    color: '#EC4899',
  },
  {
    icon: Languages,
    title: 'NLP & Data Mining',
    desc: 'We have a team of linguists, ontologists and NLP specialists to push boundaries of natural language understanding and generation.',
    color: '#2563EB',
  },
  {
    icon: TrendingUp,
    title: 'Financial Analytics',
    desc: 'Veterans in the field of stock market analysis guide us to create end to end systems for financial analytics and algorithmic trading.',
    color: '#14B8A6',
  },
  {
    icon: Brain,
    title: 'Brain Computer Interfacing',
    desc: 'Our signal processing experts work with EEG based systems for analysis and control applications for cyber physical systems.',
    color: '#7C3AED',
  },
]

export default function ResearchAreas() {
  const revealRef = useReveal()

  return (
    <section
      ref={revealRef}
      className="section-padding"
      style={{ background: 'var(--secondary)' }}
    >
      <div className="container-main">
        <div className="mb-14 reveal">
          <p className="eyebrow mb-4">Research Domains</p>
          <h2 className="heading-display text-[clamp(2rem,4.5vw,3.25rem)] mb-3">
            We deal with all sorts of data
          </h2>
          <p className="text-muted-foreground text-[0.9375rem] italic">
            ...and whatever else you may throw at us
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {areas.map((area) => (
            <div
              key={area.title}
              className="p-7 rounded-2xl border border-white bg-white group cursor-default transition-all duration-300 hover:shadow-xl hover:-translate-y-1 reveal"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${area.color}12`, color: area.color }}
              >
                <area.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[1.05rem] font-bold text-foreground mb-3">
                {area.title}
              </h3>
              <p className="text-[0.8125rem] text-muted-foreground leading-[1.75]">
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
