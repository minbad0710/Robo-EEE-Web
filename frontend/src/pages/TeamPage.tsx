import PageHero from '../components/PageHero'
import Members from '../components/team/Members'
import { useTeamMembers } from '../data/teamMembers'

export default function TeamPage() {
  const team = useTeamMembers()

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="The Team Behind the Autonomy"
        description="NTU EEE's flagship robotics division - engineers, developers, and organizers pushing the boundaries of spatial intelligence."
        titleClassName="max-w-[760px]"
      />
      <Members team={team} />
    </>
  )
}
