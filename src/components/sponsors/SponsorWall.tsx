import { sponsors } from '../../data/site'
import { byFileName } from '../../utils/assets'

// Logos are named by position: sponsor-1 = first card, sponsor-2 = second, …
const logos = byFileName(import.meta.glob<string>('../../assets/sponsors/*.webp', { eager: true, import: 'default' }))

export default function SponsorWall() {
  return (
    <section className="page-container py-[64px] md:py-[96px]">
      <h2 className="eyebrow eyebrow--accent">Supported by Leading Brands</h2>

      <ul className="mt-[24px] grid grid-cols-1 gap-[20px] min-[480px]:grid-cols-2 md:mt-[32px] lg:grid-cols-3 lg:gap-[28px]">
        {sponsors.map((sponsor, index) => {
          const card = (
            <>
              <div className="sponsor-card__logo">
                <img src={logos[`sponsor-${index + 1}`]} alt={`${sponsor.name} logo`} loading="lazy" />
              </div>
              <h3 className="display-heading text-h4 leading-[1.25]">{sponsor.name}</h3>
            </>
          )
          return (
            // AOS animates the wrapper so it doesn't override the card's own hover lift
            <li key={sponsor.name} data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
              {sponsor.href ? (
                <a href={sponsor.href} target="_blank" rel="noreferrer" className="sponsor-card">
                  {card}
                </a>
              ) : (
                <div className="sponsor-card">{card}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
