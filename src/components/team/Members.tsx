import { members } from '../../data/site'
import { teamPhotos } from './teamPhotos'

export default function Members() {
  return (
    <section className="page-container pt-[80px] pb-[80px] md:pt-[120px] md:pb-[112px]">
      <div data-aos="fade-up">
        <p className="eyebrow eyebrow--accent">The People</p>
        <h2 className="display-heading mt-[12px] text-h2">Active Members</h2>
      </div>

      {/* Figma keeps cards at ~250px wide on a 3-column grid, so the grid stops at 3 columns even on wide screens */}
      <div className="mt-[32px] grid grid-cols-1 gap-[4px] min-[480px]:grid-cols-2 md:mt-[48px] lg:max-w-[820px] lg:grid-cols-3">
        {members.map((member, index) => (
          // AOS animates the wrapper so it doesn't override the card's own hover lift
          <div key={member.name} data-aos="fade-up" data-aos-delay={(index % 3) * 120}>
            <article className="team-card team-card--hover h-full p-[20px] md:p-[22px]">
              <div className="aspect-[220/166] overflow-hidden rounded-[2px]">
                <img src={teamPhotos[`member-${index + 1}`]} alt={member.name} className="size-full object-cover" />
              </div>
              <h3 className="display-heading mt-[20px] text-[0.875rem]">{member.name}</h3>
              <p className="mt-[4px] flex items-baseline justify-between gap-[12px] font-code text-[0.625rem]">
                <span className="text-primary-dark">{member.role}</span>
                <span className="shrink-0 text-muted">{member.year}</span>
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
