import { corePartners } from '../../data/site'
import { byFileName } from '../../utils/assets'

// Logos are named by position: partner-1 = first card, partner-2 = second, …
const logos = byFileName(import.meta.glob<string>('../../assets/sponsors/partner-*.webp', { eager: true, import: 'default' }))

export default function CorePartners() {
  return (
    <section className="page-container py-[56px] md:py-[88px]">
      <h2 className="font-display text-base font-bold uppercase text-ink md:text-[1.125rem]">Collaborations</h2>

      <div className="mt-[24px] grid items-start gap-[16px] md:mt-[32px] lg:grid-cols-2 lg:gap-[20px]">
        {corePartners.map((partner, index) => {
          const logo = logos[`partner-${index + 1}`]
          return (
            <article
              key={partner.name}
              className="team-card flex flex-col gap-[20px] p-[20px] sm:flex-row sm:items-center sm:gap-[28px] sm:p-[26px]"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* The name is right next to the tile, so the logo needs no alt text of its own */}
              <div className="partner-mark" aria-hidden="true">
                {logo ? <img src={logo} alt="" loading="lazy" /> : partner.mark}
              </div>
              <div className="min-w-0">
                <h3 className="display-heading max-w-[260px] text-h4 leading-[1.2] sm:max-w-none">{partner.name}</h3>
                <p className="mt-[10px] text-xs leading-relaxed text-body">{partner.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
