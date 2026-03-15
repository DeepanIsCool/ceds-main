'use client'

import { useEffect, useState } from 'react'
import { Megaphone } from 'lucide-react'

interface Announcement {
  id: number
  text: string
}

export default function AnnouncementTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    fetch('/data/announcements.json')
      .then((res) => res.json())
      .then(setAnnouncements)
      .catch(() => {})
  }, [])

  if (announcements.length === 0) return null

  const doubled = [...announcements, ...announcements]

  return (
    <div className="relative overflow-hidden py-3.5" style={{ background: 'var(--surface-dark)' }}>
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{
        background: 'linear-gradient(90deg, var(--surface-dark), transparent)'
      }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{
        background: 'linear-gradient(-90deg, var(--surface-dark), transparent)'
      }} />

      <div className="flex animate-[scroll_30s_linear_infinite] will-change-transform">
        {doubled.map((a, i) => (
          <div key={`${a.id}-${i}`} className="flex items-center gap-3 flex-shrink-0 px-8">
            <Megaphone className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
            <span className="text-[0.75rem] text-white/40 whitespace-nowrap font-medium">
              {a.text}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
