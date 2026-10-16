import ApplyCta from '../components/join/ApplyCta'
import Faq from '../components/join/Faq'
import RecruitmentBanner from '../components/join/RecruitmentBanner'
import PageHero from '../components/PageHero'

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Become an Autonomist"
        title="Join Team Robo"
        description="Pioneer new navigation baselines, integrate multi-sensor custom hardware assemblies, and represent NTU on premier global arenas."
        descriptionClassName="max-w-[680px]"
      >
        <RecruitmentBanner />
      </PageHero>
      <Faq />
      <ApplyCta />
    </>
  )
}
