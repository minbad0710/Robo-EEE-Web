import { applyUrl } from '../../data/site'

export default function ApplyCta() {
  const external = applyUrl.startsWith('http')
  return (
    <section className="page-container py-[72px] text-center md:py-[80px]">
      <h2 className="display-heading text-h2" data-aos="fade-up">
        Ready to Compete Globally?
      </h2>
      <p className="mx-auto mt-[20px] max-w-[500px] text-sm leading-relaxed text-body" data-aos="fade-up" data-aos-delay="100">
        Spaces inside the team are competitive. Complete the first step today to claim your position under the NTU EEE
        Undergraduate Office.
      </p>
      <div className="mt-[24px]" data-aos="fade-up" data-aos-delay="200">
        <a
          href={applyUrl}
          className="btn btn--teal px-[28px]"
          {...(external && { target: '_blank', rel: 'noreferrer' })}
        >
          Apply to Team Robo Now
        </a>
      </div>
    </section>
  )
}
