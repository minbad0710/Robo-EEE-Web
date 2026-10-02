import { platforms } from '../../data/site'

export default function Platforms() {
  return (
    <section className="page-container pt-[112px] pb-[96px] md:pt-[144px]">
      <div className="flex flex-wrap items-end gap-[24px]">
        <div className="shrink-0" data-aos="fade-up">
          <p className="eyebrow">Active Systems</p>
          <h2 className="display-heading mt-[12px] text-h2 uppercase">
            Robot
            <br />
            Platforms
          </h2>
        </div>
        <p
          className="ml-auto max-w-[320px] grow basis-[240px] text-right text-sm leading-relaxed text-muted"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Dual-track engineering focus allowing simultaneous baseline verification and custom in-house
          hardware integration.
        </p>
      </div>

      <div className="mt-[40px] grid gap-[4px] lg:grid-cols-3">
        {platforms.map((platform, index) => (
          // AOS animates the wrapper so it doesn't override the card's own hover lift
          <div key={platform.name} data-aos="fade-up" data-aos-delay={index * 150}>
            <article className="platform-card h-full p-[24px] md:py-[28px]">
              <p className="eyebrow">{platform.track}</p>
              <h3 className="display-heading mt-[12px] text-h4">{platform.name}</h3>
              <p className="mt-[16px] text-sm leading-relaxed text-body">{platform.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}
