import { benchmarks } from '../../data/site'

export default function Benchmarks() {
  return (
    <section className="page-container pt-[80px]">
      <h2 className="eyebrow font-medium text-ink" data-aos="fade-up">
        Latest Arena Benchmarks
      </h2>

      <div className="mt-[48px] grid md:grid-cols-3">
        {benchmarks.map((item, index) => (
          <article key={item.event} className="benchmark" data-aos="fade-up" data-aos-delay={index * 150}>
            <p className="eyebrow eyebrow--accent normal-case">
              <span aria-hidden="true">{item.medal}</span> {item.result}
            </p>
            <h3 className="display-heading mt-[8px] text-h3 uppercase">{item.event}</h3>
            <p className="mt-[8px] text-xs text-ink">{item.team}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
