import { advisors } from '../../data/site'
import { teamPhotos } from './teamPhotos'

export default function Advisors() {
  return (
    <section className="page-container pt-[48px] md:pt-[56px]">
      <h2 className="eyebrow eyebrow--accent" data-aos="fade-up">
        Faculty Advisors
      </h2>

      <div className="mt-[24px] grid gap-[16px] md:mt-[40px] lg:grid-cols-2 lg:gap-[20px]">
        {advisors.map((advisor, index) => (
          <article
            key={advisor.name}
            className="team-card flex items-start gap-[16px] p-[20px] sm:gap-[24px] sm:p-[24px]"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <img
              src={teamPhotos[`advisor-${index + 1}`]}
              alt={advisor.name}
              className="size-[56px] shrink-0 rounded-full object-cover object-top sm:size-[64px]"
            />
            <div className="min-w-0">
              <h3 className="display-heading text-[1rem]">{advisor.name}</h3>
              <p className="mt-[4px] font-code text-[0.6875rem] text-primary-dark">{advisor.affiliation}</p>
              <p className="mt-[12px] text-xs leading-relaxed text-body">{advisor.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
