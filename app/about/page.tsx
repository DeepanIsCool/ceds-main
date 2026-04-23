'use client'

import { useEffect, useState } from 'react'
import { Target, Lightbulb, GraduationCap, Handshake, Award, MapPin, Mail, Phone } from 'lucide-react'

interface Leader {
  id: number
  name: string
  position: string
  department: string
  bio: string
  image: string
}

const mission = {
  title: 'Our Mission',
  text: 'IEM Centre for Excellence in Data Science (IEMCEDS) is dedicated to advancing research and innovation in data science, machine learning, and artificial intelligence. We aim to bridge the gap between academic research and real-world application, fostering a culture of excellence and collaboration.',
}

const objectives = [
  {
    icon: Target,
    title: 'Research Excellence',
    description: 'Conduct cutting-edge research in data science, AI, and related fields to push the boundaries of knowledge.',
  },
  {
    icon: GraduationCap,
    title: 'Education & Training',
    description: 'Provide comprehensive training programs and workshops for students and professionals.',
  },
  {
    icon: Handshake,
    title: 'Industry Collaboration',
    description: 'Build partnerships with industry leaders to solve real-world challenges through data-driven solutions.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Hub',
    description: 'Foster innovation and entrepreneurship in data science and technology through incubation and mentoring.',
  },
  {
    icon: Award,
    title: 'Academic Impact',
    description: 'Publish high-quality research in top-tier journals and conferences, contributing to the global knowledge base.',
  },
]

export default function AboutPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])

  useEffect(() => {
    fetch('/data/leadership.json')
      .then((res) => res.json())
      .then(setLeaders)
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Page Header */}
      <section className="page-header pt-28 pb-16 px-6" style={{ backgroundImage: 'url(/images/bg-about.png)' }}>
        <div className="container-main">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            About IEMCEDS
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Learn about our mission, objectives, and the team driving innovation in data science.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">{mission.title}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">{mission.text}</p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-gray-50" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Our Objectives</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The guiding principles that drive our work forward.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 stagger-children">
            {objectives.map((obj) => (
              <div key={obj.title} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-7 rounded-2xl bg-white border border-gray-100 card-hover text-left">
                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center mb-5">
                  <obj.icon className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{obj.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-white" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Leadership Team</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The experienced leaders guiding IEMCEDS towards excellence.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 stagger-children">
            {leaders.map((leader) => (
              <div key={leader.id} className="w-full md:w-[calc(33.333%-21.33px)] text-center p-8 rounded-2xl border border-gray-100 bg-white card-hover">
                <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-gray-100">
                  {leader.image ? (
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold">
                      {leader.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
                <p className="text-sm font-medium text-gray-400 mb-3">{leader.position} • {leader.department}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  )
}
