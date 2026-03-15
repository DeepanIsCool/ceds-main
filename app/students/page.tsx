'use client'

import { useEffect, useState } from 'react'
import { Mail, GraduationCap, Briefcase } from 'lucide-react'

interface Student {
  id: number
  name: string
  year: string
  branch: string
  researchArea: string
  email: string
  image: string
  status: 'member' | 'intern'
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [activeTab, setActiveTab] = useState<'member' | 'intern'>('member')

  useEffect(() => {
    fetch('/data/students.json')
      .then((res) => res.json())
      .then(setStudents)
      .catch(() => {})
  }, [])

  const filtered = students.filter((s) => s.status === activeTab)

  return (
    <>
      {/* Page Header */}
      <section className="page-header pt-28 pb-16 px-6" style={{ backgroundImage: 'url(/images/bg-students.png)' }}>
        <div className="container-main">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
            People
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Students & Interns
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            The researchers and interns contributing to our projects and pushing the boundaries of knowledge.
          </p>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="section-padding bg-white" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          {/* Tab buttons */}
          <div className="flex gap-1 mb-10 bg-gray-100 rounded-xl p-1 w-fit">
            {(['member', 'intern'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'member' ? 'Members' : 'Interns'}
                <span className="ml-2 text-xs text-gray-400">
                  ({students.filter((s) => s.status === tab).length})
                </span>
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {filtered.map((student) => (
              <div
                key={student.id}
                className="p-6 rounded-2xl border border-gray-100 bg-white card-hover"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-lg font-bold" style="background: linear-gradient(135deg, #e2e8f0, #cbd5e1);">${student.name.charAt(0)}</div>`;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-bold">
                        {student.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{student.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                      <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{student.branch} • {student.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{student.researchArea}</span>
                    </div>
                  </div>
                </div>

                {student.email && (
                  <a
                    href={`mailto:${student.email}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {student.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
