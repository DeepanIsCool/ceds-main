'use client'

import Image from 'next/image'
import { Cpu, Code2, Cloud, BookOpen } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const facilities = [
  {
    title: 'Hardware Support',
    description: 'High performance computation with Core i9 Processors, 32GB RAM, NVIDIA QUADRO GPUs with secured network access over SSH. We also provide hardware support for AR/VR, IoT and BCI Applications with RaspberryPi, Oculus, Arduino, and EMOTIV.',
    icon: Cpu,
    gradient: 'linear-gradient(135deg, #1E293B, #334155)',
    tags: ['Core i9', 'NVIDIA QUADRO', 'RaspberryPi', 'Arduino', 'Oculus', 'EMOTIV'],
  },
  {
    title: 'Software Support',
    description: 'Latest MATLAB support with complete toolkits as well as full Anaconda distributions for Machine Learning and TensorFlow & PyTorch for Neural Networks and Deep Learning Applications.',
    icon: Code2,
    gradient: 'linear-gradient(135deg, var(--primary), #6366F1)',
    tags: ['MATLAB', 'TensorFlow', 'PyTorch', 'Anaconda'],
  },
  {
    title: 'Cloud Support',
    description: 'Cloud computing support with Google Colab Pro Notebooks and Oracle Cloud based High Performance VMs for scalable research workloads.',
    icon: Cloud,
    gradient: 'linear-gradient(135deg, var(--accent), #A855F7)',
    tags: ['Microsoft 365', 'Oracle Cloud', 'Google Colab'],
  },
  {
    title: 'Knowledge Support',
    description: 'Professional body memberships along with MOOCS platform access for continuous learning and skill development.',
    icon: BookOpen,
    gradient: 'linear-gradient(135deg, #0F766E, #14B8A6)',
    tags: ['ISTE', 'Coursera', 'LinkedIn Learning'],
  },
]

export default function FacilityHighlights() {
  const revealRef = useReveal()

  return (
    <section className="section-padding" style={{ background: 'var(--background)' }} ref={revealRef}>
      <div className="container-main">
        {/* Header with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 reveal">
          <div>
            <p className="eyebrow mb-4">Infrastructure</p>
            <h2 className="heading-display text-[clamp(2rem,4.5vw,3.25rem)] mb-5">
              Infrastructure Support
            </h2>
            <p className="text-muted-foreground text-[0.9375rem] max-w-[48ch] leading-[1.7]">
              World-class hardware, software, cloud, and knowledge resources powering cutting-edge research and innovation.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[16/9] relative">
            <Image
              src="/images/infra-banner.png"
              alt="GPU server cluster with blue lighting"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Sticky stacking cards */}
        <div className="space-y-6">
          {facilities.map((f, i) => (
            <div
              key={f.title}
              className="sticky reveal"
              style={{ top: `${120 + i * 20}px` }}
            >
              <div
                className="rounded-3xl p-8 md:p-10 min-h-[240px] flex flex-col justify-between shadow-xl"
                style={{ background: f.gradient }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/10">
                    <f.icon className="w-5 h-5 text-white/60" />
                  </div>
                  <h3 className="text-[1.25rem] font-bold text-white mb-3">
                    {f.title}
                  </h3>
                  <p className="text-white/50 text-[0.875rem] leading-[1.7] max-w-[60ch] mb-5">
                    {f.description}
                  </p>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {f.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[0.6875rem] font-semibold bg-white/10 text-white/70 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
