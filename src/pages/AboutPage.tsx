import Origin from '../components/about/Origin'
import Pillars from '../components/about/Pillars'
import PageHero from '../components/PageHero'

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Origin & Mission"
        title="Transitioning From Passion to Premier Institutional Autonomy"
        description="An elite division of student developers at NTU EEE, pushing the boundaries of spatial artificial intelligence."
      />
      <Origin />
      <Pillars />
    </>
  )
}
