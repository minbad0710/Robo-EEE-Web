import PageHero from '../components/PageHero'
import Deployments from '../components/technology/Deployments'
import Gallery from '../components/technology/Gallery'

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="The Engineering Pipeline"
        title="Robust Hardware, Intelligent Software"
        description="Our platforms support autonomous navigation and domestic service robotics. We integrate perception, planning, control and interaction systems, progressing from simulation to full-robot testing."
        descriptionClassName="max-w-[640px]"
        titleClassName="max-w-[780px]"
      />
      <Deployments />
      <Gallery />
    </>
  )
}
