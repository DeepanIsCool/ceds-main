import Hero from '@/components/sections/hero'
import AnnouncementTicker from '@/components/sections/announcement-ticker'
import AboutCeds from '@/components/sections/about-ceds'
import ResearchAreas from '@/components/sections/research-areas'
import FacilityHighlights from '@/components/sections/facility-highlights'
import Stats from '@/components/sections/stats'
import MentorsPreview from '@/components/sections/mentors-preview'
import CtaSection from '@/components/sections/cta-section'

export default function Home() {
  return (
    <>
      <Hero />
      <AnnouncementTicker />
      <AboutCeds />
      <ResearchAreas />
      <Stats />
      <FacilityHighlights />
      <CtaSection />
    </>
  )
}
