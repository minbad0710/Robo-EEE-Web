import PageHero from '../components/PageHero'
import Advisors from '../components/team/Advisors'
import Members from '../components/team/Members'

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="The Team Behind the Autonomy"
        description="NTU EEE's flagship robotics division - engineers, developers, and organizers pushing the boundaries of spatial intelligence."
        titleClassName="max-w-[760px]"
        contained
      />
      <Advisors />
      <Members />
    </>
  )
}
