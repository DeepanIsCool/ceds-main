import { ExternalLink, BookOpen } from 'lucide-react'
import publications from '@/public/data/publications.json'

interface Publication {
  id: number
  title: string
  type: string
  authors: string[]
  venue: string
  year: number
  doi?: string
}

function normalizeDoiLink(doi?: string) {
  if (!doi) return undefined
  if (doi.startsWith('http://') || doi.startsWith('https://')) return doi
  return `https://doi.org/${doi}`
}

function formatPublicationType(type: string) {
  return type.replace(/-/g, ' ')
}

export default function PublicationsPage() {
  const pubs = [...publications].sort((a, b) => b.year - a.year) as Publication[]

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
          <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Latest research output
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Publications list
              </h2>
            </div>
            
          </div>

          {pubs.length > 0 ? (
            <ol className="space-y-4">
              {pubs.map((pub, index) => {
                const doiLink = normalizeDoiLink(pub.doi)

                return (
                  <li
                    key={pub.id}
                    className="p-6 rounded-2xl border border-gray-100 bg-white card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                            {pub.year}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-gray-600">
                            {formatPublicationType(pub.type)}
                          </span>
                          
                        </div>

                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5 leading-snug">
                          {pub.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{pub.authors.join(', ')}</p>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          <span className="font-medium text-gray-500">{pub.venue}</span>
                        </p>

                        {doiLink && (
                          <a
                            href={doiLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-900 hover:text-gray-600 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View publication
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No publications available yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
