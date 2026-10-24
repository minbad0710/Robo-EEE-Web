import type { TeamMember } from '../../data/teamMembers'
import SocialIcon from '../SocialIcon'

type MemberLinksProps = { member: TeamMember; className?: string }

// GitHub, LinkedIn and website icons, only for the links this person has. Renders nothing if they have none.
export default function MemberLinks({ member, className }: MemberLinksProps) {
  const links = [
    { icon: 'github', href: member.github, title: 'GitHub', label: `${member.name} on GitHub`, size: 'size-[18px]' },
    { icon: 'linkedin', href: member.linkedin, title: 'LinkedIn', label: `${member.name} on LinkedIn`, size: 'size-[16px]' },
    { icon: 'website', href: member.website, title: 'Website', label: `${member.name}'s website`, size: 'size-[18px]' },
  ] as const
  const available = links.filter((link) => link.href)
  if (available.length === 0) return null

  return (
    <div className={className}>
      {available.map((link) => (
        <a key={link.icon} href={link.href} target="_blank" rel="noreferrer" className="member-card__link" aria-label={link.label} title={link.title}>
          <SocialIcon name={link.icon} className={link.size} />
        </a>
      ))}
    </div>
  )
}
