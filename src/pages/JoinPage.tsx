import ApplyCta from '../components/join/ApplyCta'
import RecruitmentBanner from '../components/join/RecruitmentBanner'
import SelectionSteps from '../components/join/SelectionSteps'
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
      <SelectionSteps />
      <ApplyCta />
    </>
  )
}
