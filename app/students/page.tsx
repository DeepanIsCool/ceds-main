'use client'

import { useEffect, useState } from 'react'
import { Mail, GraduationCap, Briefcase, X, UserCheck, Eye, Download } from 'lucide-react'

interface Student {
  id: number
  name: string
  year: string
  branch: string
  researchArea: string
  email: string
  image: string
  status: 'member' | 'intern'
  mentor?: string
  github?: string
  linkedin?: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [activeTab, setActiveTab] = useState<'member' | 'intern'>('member')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewHtml, setPreviewHtml] = useState<string>('')
  const [previewTitle, setPreviewTitle] = useState<string>('')

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (selectedStudent) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedStudent])

  useEffect(() => {
    fetch('/data/students.json')
      .then((res) => res.json())
      .then(setStudents)
      .catch(() => {})
  }, [])

  const filtered = [...students].sort((a, b) => {
    const aFirst = (a.name || '').split(' ')[0]
    const bFirst = (b.name || '').split(' ')[0]
    return aFirst.localeCompare(bFirst, undefined, { sensitivity: 'base' })
  })

  // Load SheetJS (xlsx) from CDN for client-side preview
  const loadSheetJS = async () => {
    if (typeof window === 'undefined') return null
    // @ts-ignore
    if ((window as any).XLSX) return (window as any).XLSX
    return new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js'
      s.onload = () => {
        // @ts-ignore
        resolve((window as any).XLSX)
      }
      s.onerror = reject
      document.head.appendChild(s)
    })
  }

  const previewFile = async (relativePath: string, title: string) => {
    try {
      // ensure SheetJS is loaded
      // @ts-ignore
      const XLSX = await loadSheetJS()
      if (!XLSX) throw new Error('SheetJS failed to load')

      const res = await fetch(relativePath)
      const arr = await res.arrayBuffer()
      // @ts-ignore
      const wb = XLSX.read(new Uint8Array(arr), { type: 'array' })
      const first = wb.SheetNames[0]
      // @ts-ignore
      const html = XLSX.utils.sheet_to_html(wb.Sheets[first])
      setPreviewHtml(html)
      setPreviewTitle(title)
      setPreviewOpen(true)
    } catch (err) {
      // fallback: open the file directly
      window.open(relativePath, '_blank', 'noopener')
    }
  }

  // No special viewer; links point directly to files in `public/intern-lists/`.

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
                {tab === 'member' ? 'Members' : 'Interns Lists'}
                <span className="ml-2 text-xs text-gray-400">
                  ({tab === 'member' ? students.length : 2})
                </span>
              </button>
            ))}
          </div>

          {/* Cards or Intern lists */}
          {activeTab === 'member' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {filtered.map((student) => (
                <div
                  key={student.id}
                  className="p-6 rounded-2xl border border-gray-100 bg-white card-hover cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
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
                      {student.mentor && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                          <UserCheck className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                          <span className="truncate font-medium">{student.mentor}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {student.email && (
                    <a
                      href={`mailto:${student.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {student.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Row for Winter 2025 */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-white">
                <div className="text-sm font-medium">1. Winter 2025 Interns List</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => previewFile('/intern-lists/winter-2025.xlsx', 'Winter 2025')}
                    className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:opacity-95 flex items-center cursor-pointer"
                    aria-label="Preview Winter 2025"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <a
                    href="/intern-lists/winter-2025.xlsx"
                    download
                    className="px-3 py-1.5 text-xs border rounded-md text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </div>
              </div>

              {/* Row for Summer 2026 */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-white">
                <div className="text-sm font-medium">2. Summer 2026 Interns List</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => previewFile('/intern-lists/summer-2026.xlsx', 'Summer 2026')}
                    className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:opacity-95 flex items-center cursor-pointer"
                    aria-label="Preview Summer 2026"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <a
                    href="/intern-lists/summer-2026.xlsx"
                    download
                    className="px-3 py-1.5 text-xs border rounded-md text-blue-600 border-blue-600 hover:bg-blue-50 flex items-center cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </div>
              </div>

              {/* Preview modal */}
              {previewOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60" onClick={() => setPreviewOpen(false)}>
                  <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Preview — {previewTitle}</h3>
                      <button onClick={() => setPreviewOpen(false)} className="text-sm text-gray-500">Close</button>
                    </div>
                    <div className="prose max-w-none overflow-auto" dangerouslySetInnerHTML={{ __html: previewHtml }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedStudent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedStudent(null)}
        >
          <div 
            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative overflow-hidden transform transition-all" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Abstract decorative background */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -z-10" />
            
            <button 
              onClick={() => setSelectedStudent(null)} 
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-inner">
                {selectedStudent.image ? (
                  <img 
                    src={selectedStudent.image} 
                    alt={selectedStudent.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      const target = e.currentTarget;
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold" style="background: linear-gradient(135deg, #e2e8f0, #cbd5e1);">${selectedStudent.name.charAt(0)}</div>`;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold bg-gradient-to-br from-gray-100 to-gray-200">
                    {selectedStudent.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{selectedStudent.name}</h3>
              </div>
            </div>
            
            <div className="space-y-4 bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Education</p>
                  <p className="text-sm font-medium text-gray-900">{selectedStudent.branch}</p>
                  <p className="text-sm text-gray-500">{selectedStudent.year}</p>
                </div>
              </div>
              
              <div className="w-full h-px bg-gray-200" />

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Research Area</p>
                  <p className="text-sm font-medium text-gray-900 leading-relaxed">{selectedStudent.researchArea}</p>
                </div>
              </div>

              {selectedStudent.mentor && (
                <>
                  <div className="w-full h-px bg-gray-200" />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                      <UserCheck className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Mentor</p>
                      <p className="text-sm font-medium text-gray-900">{selectedStudent.mentor}</p>
                    </div>
                  </div>
                </>
              )}

              {selectedStudent.email && (
                <>
                  <div className="w-full h-px bg-gray-200" />
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Contact</p>
                      <a href={`mailto:${selectedStudent.email}`} className="text-sm font-medium text-gray-900 hover:text-primary transition-colors">
                        {selectedStudent.email}
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
