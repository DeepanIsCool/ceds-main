'use client'

import Image from 'next/image'
import { Sprout, Handshake, Rocket, Lightbulb } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const objectives = [
  {
    icon: Sprout,
    title: 'Creating Ecosystem',
    points: [
      'Training innovators in cutting-edge technologies',
      'Groom research-oriented mindset',
      'Explore emerging tools and technologies of data science',
      'Curate high quality data',
      'Creating a research lab with HPC and Cloud support',
      'Creating breakthrough research through top-class publications & patents',
    ],
  },
  {
    icon: Handshake,
    title: 'Fostering Collaboration',
    points: [
      'Foster collaboration among data scientists, data engineers, business analysts, and other stakeholders',
      'Acquire project grants from funding agencies',
      'Become a fore-runner in enabling inter-disciplinary projects',
    ],
  },
  {
    icon: Rocket,
    title: 'Enabling Entrepreneurship',
    points: [
      'Promote entrepreneurial activities',
      'Assist innovators in creating roadmaps for their goals',
      'Collaborate with government and private industrial entities and incubation centres',
    ],
  },
  {
    icon: Lightbulb,
    title: 'Solution Enabler',
    points: [
      'Bring innovators and enterprises together to co-create end-to-end business solutions',
      'Connect with organizations looking for technology adoption',
      'Publish periodic newsletters to showcase latest innovations and products',
      'Promote building end-to-end solutions with global impact',
    ],
  },
]

export default function AboutCeds() {
  const revealRef = useReveal()

  return (
    <section className="section-padding" style={{ background: 'var(--background)' }} ref={revealRef}>
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <p className="eyebrow mb-4">About Us</p>
          <h2 className="heading-display text-[clamp(2rem,4.5vw,3.25rem)] mb-6">
            Our Mission
          </h2>
          <p className="text-muted-foreground text-[0.9375rem] leading-[1.9] max-w-[64ch] mx-auto">
            The Centre of Excellence in Data Science was established with the goal of exploring cutting edge technologies
            such as Artificial Intelligence, Machine Learning, Computer Vision, Natural Language Processing, Computational
            Biology and so on. The centre aims to setup a high-performance computing laboratory to produce top quality
            publications and patents along with promotion of industry – academia relations and inter-disciplinary
            collaborations with reputed national and international organizations.
          </p>
        </div>

        {/* Zig-zag content blocks */}
        <div className="space-y-24">
          {/* Block 1: Text left, Image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="eyebrow mb-4">Personnel & Facilities</p>
              <p className="text-muted-foreground text-[0.9375rem] leading-[1.8] mb-6">
                IEM-CEDS thoroughly promotes multi-disciplinary research. We have
                subject matter experts from most modern areas of AI and Machine
                Learning as well as external collaborators from top universities
                and organizations. We have relations with top tier research and
                development labs from India & abroad and also local HPC
                architectures with workstation grade GPU support, and high
                performance cloud services.
              </p>
            </div>
            <div className="reveal-right">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
                <Image
                  src="/images/hero-about.png"
                  alt="Data science visualization — interconnected neural network nodes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Block 2: Image left, Text right (zig-zag) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
                <Image
                  src="/images/collaboration.png"
                  alt="Collaborative research workspace"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="reveal-right order-1 lg:order-2">
              <p className="eyebrow mb-6">Objectives</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {objectives.map((obj) => (
                  <div
                    key={obj.title}
                    className="p-5 rounded-2xl border border-border/60 bg-white group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'var(--primary)', color: 'white', opacity: 0.9 }}
                    >
                      <obj.icon className="w-[1.125rem] h-[1.125rem]" />
                    </div>
                    <h3 className="text-[0.875rem] font-bold text-foreground mb-2">
                      {obj.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {obj.points.slice(0, 3).map((point, i) => (
                        <li key={i} className="text-[0.75rem] text-muted-foreground leading-[1.6] flex gap-2">
                          <span className="text-primary/50 mt-0.5 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
