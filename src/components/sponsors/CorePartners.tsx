import { corePartners } from '../../data/site'

export default function CorePartners() {
  return (
    <section className="page-container pt-[56px] md:pt-[96px]">
      <h2 className="font-display text-base font-bold uppercase text-ink md:text-[1.125rem]" data-aos="fade-up">
        Core Ecosystem Partners
      </h2>

      <div className="mt-[24px] grid items-start gap-[16px] md:mt-[32px] lg:grid-cols-2 lg:gap-[20px]">
        {corePartners.map((partner, index) => (
          <article
            key={partner.name}
            className="team-card flex flex-col gap-[20px] p-[20px] sm:flex-row sm:items-center sm:gap-[28px] sm:p-[26px]"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className="partner-mark" aria-hidden="true">
              {partner.mark}
            </div>
            <div className="min-w-0">
              <h3 className="display-heading max-w-[260px] text-h4 leading-[1.2] sm:max-w-none">{partner.name}</h3>
              <p className="mt-[10px] text-xs leading-relaxed text-body">{partner.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
