import defaultAvatar from '../../assets/team/default-avatar.svg'
import type { TeamMembersState } from '../../data/teamMembers'
import { facePhoto } from '../../utils/cloudinary'
import MemberLinks from './MemberLinks'

// The 'advisors' department of the newest academic year. While the team loads, only the heading shows, so the
// section is already in place and the alternating section colours below it don't flip once it loads.
// Hidden if loading fails or there are no advisors.
export default function Advisors({ team }: { team: TeamMembersState }) {
  if (team.status === 'error') return null
  const members = team.status === 'ready' ? team.members : []
  const latestYear = members.map((member) => member.year).sort().at(-1)
  const advisors = members.filter((member) => member.department === 'advisors' && member.year === latestYear)
  if (team.status === 'ready' && advisors.length === 0) return null

  return (
    <section className="page-container py-[56px] md:py-[80px]">
      <h2 className="display-heading text-h2">Advisors</h2>

      <div className="mt-[32px] grid gap-[16px] md:mt-[48px] lg:grid-cols-2 lg:gap-[20px]">
        {advisors.map((advisor, index) => (
          <article
            key={advisor._id}
            className="team-card flex items-start gap-[16px] p-[20px] sm:gap-[24px] sm:p-[24px]"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <img
              src={advisor.photo ? facePhoto(advisor.photo, 128, '1:1') : defaultAvatar}
              alt={advisor.photo ? advisor.name : ''}
              className="size-[56px] shrink-0 rounded-full object-cover object-top sm:size-[64px]"
            />
            <div className="min-w-0">
              <h3 className="display-heading text-[1rem]">{advisor.name}</h3>
              <p className="mt-[4px] font-code text-[0.6875rem] text-primary-dark">{advisor.role}</p>
              <MemberLinks member={advisor} className="mt-[12px] flex gap-[8px]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
