import PageHero from '../components/PageHero'
import Advisors from '../components/team/Advisors'
import Members from '../components/team/Members'
import { useTeamMembers } from '../data/teamMembers'

export default function TeamPage() {
  // Loaded once here and shared by both sections
  const team = useTeamMembers()

  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="The Team Behind the Autonomy"
        description="NTU EEE's flagship robotics division - engineers, developers, and organizers pushing the boundaries of spatial intelligence."
        titleClassName="max-w-[760px]"
      />
      <Advisors team={team} />
      <Members team={team} />
    </>
  )
}
