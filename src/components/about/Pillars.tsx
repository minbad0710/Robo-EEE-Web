import { pillars } from '../../data/site'

export default function Pillars() {
  return (
    <section className="page-container pt-[64px] pb-[80px] md:pt-[96px] md:pb-[112px]">
      <div data-aos="fade-up">
        <p className="eyebrow eyebrow--accent">Institutional Roles</p>
        <h2 className="display-heading mt-[12px] text-h2 uppercase">Three Pillars</h2>
      </div>

      <div className="mt-[40px] grid md:mt-[48px] md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <article key={pillar.number} className="pillar" data-aos="fade-up" data-aos-delay={index * 150}>
            <p className="eyebrow eyebrow--accent">{pillar.number}</p>
            <h3 className="display-heading mt-[16px] text-h4">{pillar.title}</h3>
            <p className="mt-[16px] text-sm leading-relaxed text-muted">{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
