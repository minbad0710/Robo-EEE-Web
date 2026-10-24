import PageHero from '../components/PageHero'
import Deployments from '../components/technology/Deployments'
import Gallery from '../components/technology/Gallery'

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="The Engineering Pipeline"
        title="Robust Hardware, Intelligent Software"
        description="Purpose-built systems for autonomous navigation and domestic service robotics."
        titleClassName="max-w-[780px]"
      />
      <Deployments />
      <Gallery />
    </>
  )
}
