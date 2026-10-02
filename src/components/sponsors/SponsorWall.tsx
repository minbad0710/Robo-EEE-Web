import { sponsors } from '../../data/site'

export default function SponsorWall() {
  return (
    <section className="page-container pt-[80px] md:pt-[128px]">
      <h2 className="eyebrow eyebrow--accent" data-aos="fade-up">
        Supported by Leading Brands
      </h2>

      <ul className="mt-[24px] grid grid-cols-1 gap-[12px] min-[480px]:grid-cols-2 md:mt-[32px] lg:grid-cols-3">
        {sponsors.map((name, index) => (
          <li key={name} className="sponsor-tile" data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
            {name} Placeholder
          </li>
        ))}
      </ul>
    </section>
  )
}
