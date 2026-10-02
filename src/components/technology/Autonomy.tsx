import { autonomyLayers, techStack } from '../../data/site'

export default function Autonomy() {
  return (
    <section className="border-b border-line">
      <div className="page-container py-[64px] md:py-[88px]">
        <div data-aos="fade-up">
          <p className="eyebrow eyebrow--accent">Software Core</p>
          <h2 className="display-heading mt-[16px] text-h2 uppercase">Autonomy Architecture</h2>
        </div>

        <ol className="mt-[40px] border-t border-line md:mt-[56px]">
          {autonomyLayers.map((layer, index) => (
            <li
              key={layer.number}
              className="flex flex-wrap items-center gap-x-[24px] gap-y-[8px] border-b border-line py-[20px] md:flex-nowrap md:py-[28px]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className="w-[24px] shrink-0 font-code text-eyebrow text-muted">{layer.number}</span>
              <h3 className="display-heading text-h4">{layer.title}</h3>
              <p className="w-full pl-[48px] font-code text-eyebrow text-muted md:ml-auto md:w-auto md:pl-0 md:text-right">
                {layer.tools.join(' · ')}
              </p>
            </li>
          ))}
        </ol>

        <ul className="mt-[40px] flex flex-wrap gap-[8px] md:mt-[48px]" aria-label="Tech stack" data-aos="fade-up">
          {techStack.map((tool) => (
            <li key={tool} className="tech-chip">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
