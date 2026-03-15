'use client'

import { useEffect, useRef, useCallback } from 'react'

export function useReveal(deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null)

  const observe = useCallback(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    )

    const revealElements = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    revealElements.forEach((child) => observer.observe(child))

    if (
      el.classList.contains('reveal') ||
      el.classList.contains('reveal-left') ||
      el.classList.contains('reveal-right')
    ) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Small delay to let dynamic content render
    const timer = setTimeout(observe, 100)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observe, ...deps])

  return ref
}
