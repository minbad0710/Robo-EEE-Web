import PageHero from '../components/PageHero'
import Autonomy from '../components/technology/Autonomy'
import Deployments from '../components/technology/Deployments'
import Gallery from '../components/technology/Gallery'
import TwoTrack from '../components/technology/TwoTrack'

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
      <TwoTrack />
      <Autonomy />
      <Gallery />
    </>
  )
}
