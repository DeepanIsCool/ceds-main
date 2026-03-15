'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, BookOpen, Presentation, BookMarked, Filter } from 'lucide-react'

interface Publication {
  id: number
  title: string
  authors: string[]
  journal: string
  year: number
  volume?: string
  issue?: string
  pages?: string
  doi?: string
  abstract: string
  keywords: string[]
  type: 'journal' | 'conference' | 'book-chapter'
}

const typeLabels: Record<string, { label: string; icon: typeof BookOpen }> = {
  journal: { label: 'Journal', icon: BookOpen },
  conference: { label: 'Conference', icon: Presentation },
  'book-chapter': { label: 'Book Chapter', icon: BookMarked },
}

export default function PublicationsPage() {
  const [pubs, setPubs] = useState<Publication[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetch('/data/publications.json')
      .then((res) => res.json())
      .then(setPubs)
      .catch(() => {})
  }, [])

  const filtered = filter === 'all' ? pubs : pubs.filter((p) => p.type === filter)
  const years = [...new Set(pubs.map((p) => p.year))].sort((a, b) => b - a)

  return (
    <>
      {/* Page Header */}
      <section className="page-header pt-28 pb-16 px-6" style={{ backgroundImage: 'url(/images/bg-publications.png)' }}>
        <div className="container-main">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Research Output
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Publications
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Our research papers published in leading journals and conferences worldwide.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <Filter className="w-4 h-4 text-gray-400 mr-1" />
            {[
              { key: 'all', label: 'All' },
              { key: 'journal', label: 'Journals' },
              { key: 'conference', label: 'Conferences' },
              { key: 'book-chapter', label: 'Book Chapters' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f.key
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Publications by year */}
          {years.map((year) => {
            const yearPubs = filtered.filter((p) => p.year === year)
            if (yearPubs.length === 0) return null
            return (
              <div key={year} className="mb-12">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-6">{year}</h3>
                <div className="space-y-4 stagger-children">
                  {yearPubs.map((pub) => {
                    const typeInfo = typeLabels[pub.type]
                    const TypeIcon = typeInfo?.icon || BookOpen
                    return (
                      <div
                        key={pub.id}
                        className="p-6 rounded-2xl border border-gray-100 bg-white card-hover"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <TypeIcon className="w-4.5 h-4.5 text-gray-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">
                              {pub.title}
                            </h4>
                            <p className="text-sm text-gray-500 mb-2">
                              {pub.authors.join(', ')}
                            </p>
                            <p className="text-xs text-gray-400 mb-3">
                              <span className="font-medium">{pub.journal}</span>
                              {pub.volume && `, Vol. ${pub.volume}`}
                              {pub.issue && `(${pub.issue})`}
                              {pub.pages && `, pp. ${pub.pages}`}
                            </p>

                            {/* Keywords */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {pub.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  className="px-2 py-0.5 rounded-md bg-gray-50 text-xs text-gray-500"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>

                            {/* DOI link */}
                            {pub.doi && (
                              <a
                                href={`https://doi.org/${pub.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                View Publication
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No publications found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
