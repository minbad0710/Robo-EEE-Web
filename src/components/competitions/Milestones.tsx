import { milestones } from '../../data/site'

export default function Milestones() {
  return (
    <section className="page-container pt-[64px] pb-[80px] md:pt-[96px] md:pb-[112px]">
      <div data-aos="fade-up">
        <p className="eyebrow eyebrow--accent">Roadmap to 2027</p>
        <h2 className="display-heading mt-[12px] text-h2">Milestones</h2>
      </div>

      <ol className="mt-[40px] border-t border-line md:mt-[48px]">
        {milestones.map((item, index) => (
          <li
            key={item.title}
            className="grid gap-[8px] border-b border-line py-[20px] md:grid-cols-[120px_minmax(0,1fr)_minmax(0,380px)] md:items-center md:gap-[24px] md:py-[28px]"
            data-aos="fade-up"
            data-aos-delay={index * 80}
          >
            <p className={`eyebrow ${item.highlight ? 'eyebrow--accent' : ''}`}>{item.date}</p>
            <h3 className={`display-heading text-[1rem] ${item.highlight ? 'text-primary-dark' : ''}`}>{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted md:text-right">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
