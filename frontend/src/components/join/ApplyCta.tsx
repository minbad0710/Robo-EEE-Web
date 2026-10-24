import { applyUrl } from '../../data/site'

export default function ApplyCta() {
  const external = applyUrl.startsWith('http')
  return (
    <section className="page-container py-[72px] text-center md:py-[80px]">
      <h2 className="display-heading text-h2">Ready to Compete Globally?</h2>
      <p className="mx-auto mt-[20px] max-w-[500px] text-sm leading-relaxed text-body">
        Spaces inside the team are competitive. Complete the first step today to claim your position under the NTU EEE
        Undergraduate Office.
      </p>
      <div className="mt-[24px]">
        <a href={applyUrl} className="btn btn--primary px-[28px]" {...(external && { target: '_blank', rel: 'noreferrer' })}>
          Apply to Team Robo Now
        </a>
      </div>
    </section>
  )
}
