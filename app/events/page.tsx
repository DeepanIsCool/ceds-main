'use client'

import { useEffect, useState } from 'react'
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  ExternalLink,
  Presentation,
  BookOpen,
  Video,
  Mic2,
} from 'lucide-react'

interface Event {
  id: number
  title: string
  type: string
  date: string
  time: string
  location: string
  description: string
  speakers: string[]
  registrationUrl: string
  capacity: number
  registeredCount: number
  prerequisites: string[]
  attendees: number
  outcomes: string[]
  status: 'past' | 'upcoming'
}

const typeIcons: Record<string, typeof Presentation> = {
  conference: Presentation,
  workshop: BookOpen,
  seminar: Mic2,
  webinar: Video,
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch('/data/events.json')
      .then((res) => res.json())
      .then(setEvents)
      .catch(() => {})
  }, [])

  const upcoming = events.filter((e) => e.status === 'upcoming')
  const past = events.filter((e) => e.status === 'past')

  return (
    <>
      {/* Page Header */}
      <section className="page-header pt-28 pb-16 px-6" style={{ backgroundImage: 'url(/images/bg-events.png)' }}>
        <div className="container-main">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Community
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Events
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Conferences, workshops, seminars, and webinars organized by IEMCEDS.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="section-padding bg-white" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
          <div className="container-main">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Upcoming Events</h2>
            </div>

            <div className="space-y-6 stagger-children">
              {upcoming.map((event) => {
                const TypeIcon = typeIcons[event.type] || Presentation
                return (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-gray-100 bg-white card-hover overflow-hidden"
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Image side */}
                      {event.image && (
                        <div className="w-full lg:w-72 h-48 lg:h-auto bg-gray-100 relative flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 overflow-hidden">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                        </div>
                      )}
                      
                      {/* Content side */}
                      <div className="p-8 flex-1 flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Date badge */}
                        <div className="w-20 h-20 rounded-2xl bg-gray-950 flex flex-col items-center justify-center flex-shrink-0">
                        <TypeIcon className="w-5 h-5 text-white mb-1" />
                        <span className="text-xs text-gray-400 capitalize">{event.type}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{event.description}</p>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-5">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          {event.capacity > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Users className="w-4 h-4" />
                              {event.registeredCount}/{event.capacity} registered
                            </div>
                          )}
                        </div>

                        {/* Speakers */}
                        <div className="mb-5">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Speakers</p>
                          <div className="flex flex-wrap gap-2">
                            {event.speakers.map((speaker) => (
                              <span key={speaker} className="px-3 py-1 rounded-lg bg-gray-50 text-xs text-gray-600">
                                {speaker}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Prerequisites */}
                        {event.prerequisites.length > 0 && (
                          <div className="mb-5">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Prerequisites</p>
                            <ul className="space-y-1">
                              {event.prerequisites.map((p, i) => (
                                <li key={i} className="text-xs text-gray-500 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3 h-3 text-gray-300 flex-shrink-0" />
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Register button */}
                        {event.registrationUrl && (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
                          >
                            Register Now
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="section-padding bg-gray-50" style={{ backgroundImage: 'url(/images/bg-pattern-topo.png)', backgroundSize: 'auto', backgroundRepeat: 'repeat', backgroundPosition: 'top left' }}>
        <div className="container-main">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 tracking-tight">Past Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            {past.map((event) => {
              const TypeIcon = typeIcons[event.type] || Presentation
              return (
                <div
                  key={event.id}
                  className="rounded-2xl border border-gray-100 bg-white card-hover overflow-hidden flex flex-col"
                >
                  {event.image && (
                    <div className="w-full h-40 bg-gray-100 relative overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500 capitalize">
                      <TypeIcon className="w-3 h-3" />
                      {event.type}
                    </span>
                    {event.attendees > 0 && (
                      <span className="text-xs text-gray-400">{event.attendees} attendees</span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-2">{event.title}</h3>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </div>
                  </div>

                  {event.outcomes.length > 0 && (
                    <ul className="space-y-1.5">
                      {event.outcomes.slice(0, 2).map((outcome, i) => (
                        <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
