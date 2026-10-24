import { useRef, useState, type KeyboardEvent } from 'react'
import defaultAvatar from '../../assets/team/default-avatar.svg'
import { teamDepartments } from '../../data/site'
import type { TeamMember, TeamMembersState } from '../../data/teamMembers'
import { facePhoto } from '../../utils/cloudinary'
import MemberLinks from './MemberLinks'

// The Cloudinary photo cropped to the card's 4:5 frame (480px wide covers the 240px card on high-density
// screens), or the default avatar when no photo is set yet
const photoOf = (member: TeamMember) => (member.photo ? facePhoto(member.photo, 480, '4:5') : defaultAvatar)

export default function Members({ team }: { team: TeamMembersState }) {
  const members = team.status === 'ready' ? team.members : []
  // Academic years found in the data, newest first ('AY26/27' before 'AY25/26')
  const years = [...new Set(members.map((member) => member.year))].sort().reverse()

  const [selectedYear, setSelectedYear] = useState<string>()
  const [departmentId, setDepartmentId] = useState(teamDepartments[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // The newest year until another one is picked
  const year = selectedYear ?? years[0]
  const department = teamDepartments.find((d) => d.id === departmentId) ?? teamDepartments[0]
  const people = members.filter((member) => member.year === year && member.department === department.id)

  // ←/→ (and Home/End) move between department tabs, as expected for a tab list
  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const last = teamDepartments.length - 1
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setDepartmentId(teamDepartments[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="page-container pt-[64px] pb-[80px] md:pt-[96px] md:pb-[112px]">
      <h2 className="display-heading text-h2">Active Members</h2>

      <div className="mt-[32px] grid gap-[20px] md:mt-[48px] lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-[48px]">
        {/* Academic years: a vertical list on desktop, a row of chips on smaller screens */}
        <nav aria-label="Academic year">
          <ul className="year-list">
            {years.map((y) => (
              <li key={y}>
                <button type="button" className="year-list__item" aria-pressed={y === year} onClick={() => setSelectedYear(y)}>
                  {y}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <div role="tablist" aria-label="Departments" className="department-tabs">
            {teamDepartments.map((d, index) => (
              <button
                key={d.id}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                type="button"
                role="tab"
                id={`department-tab-${d.id}`}
                aria-selected={d.id === department.id}
                aria-controls="department-panel"
                tabIndex={d.id === department.id ? 0 : -1}
                className="department-tabs__tab"
                onClick={() => setDepartmentId(d.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {d.name}
              </button>
            ))}
          </div>

          {/* `key` replays the fade-in whenever the year or department changes (and once the team has loaded) */}
          <div key={`${year}-${department.id}`} id="department-panel" role="tabpanel" aria-labelledby={`department-tab-${department.id}`} className="department-panel mt-[16px]">
            <h3 className="display-heading text-h3 text-primary-dark">
              {department.name} Team {year}
            </h3>
            <p className="mx-auto mt-[12px] max-w-[560px] text-sm leading-relaxed text-body">{department.description}</p>

            {team.status === 'loading' && <p className="mt-[32px] text-sm text-muted">Loading members…</p>}
            {team.status === 'error' && (
              <p className="mt-[32px] text-sm text-muted">The member list couldn't be loaded. Please refresh the page to try again.</p>
            )}
            {team.status === 'ready' &&
              (people.length > 0 ? (
                <ul className="member-grid mt-[32px]">
                  {people.map((person) => (
                    <li key={person._id} className="member-card">
                      <div className="member-card__photo">
                        <img src={photoOf(person)} alt={person.photo ? person.name : ''} loading="lazy" />
                      </div>
                      <h4 className="display-heading mt-[20px] text-h4">{person.name}</h4>
                      <p className="mt-[6px] text-sm font-[500] text-primary-dark">{person.role}</p>
                      <MemberLinks member={person} className="mt-[16px] flex justify-center gap-[10px]" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-[32px] text-sm text-muted">No members listed for this department yet.</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
