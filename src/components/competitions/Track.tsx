import type { ReactNode } from 'react'
import type { TrackStat } from '../../data/site'

type TrackProps = {
  number: string
  title: string
  description: ReactNode
  /** Big figure on the right of the heading ("3rd", "2027") and its caption */
  figure: string
  figureLabel: string
  media: ReactNode
  stats: TrackStat[]
}

// One competition track: heading + figure, photo block, and a row of results underneath
export default function Track({ number, title, description, figure, figureLabel, media, stats }: TrackProps) {
  return (
    <section className="border-b border-line">
      <div className="page-container py-[64px] md:py-[96px]">
        {/* Stacked + left-aligned below lg; side by side with the figure right-aligned from lg */}
        <div className="flex flex-col gap-[24px] lg:flex-row lg:items-end lg:justify-between lg:gap-[48px]">
          <div className="max-w-[520px]" data-aos="fade-up">
            <p className="eyebrow eyebrow--accent">Track {number}</p>
            <h2 className="display-heading mt-[12px] text-h2 leading-[1.15]">{title}</h2>
            <p className="mt-[16px] text-sm leading-relaxed text-muted">{description}</p>
          </div>

          <div className="shrink-0 lg:text-right" data-aos="fade-up" data-aos-delay="150">
            <p className="font-code text-[2rem] leading-none font-[500] text-ink">{figure}</p>
            <p className="eyebrow mt-[8px]">{figureLabel}</p>
          </div>
        </div>

        <div className="mt-[40px]" data-aos="fade-up" data-aos-delay="100">
          {media}
        </div>

        <dl className="mt-[40px] flex flex-wrap gap-x-[56px] gap-y-[24px] border-t border-line pt-[24px]">
          {stats.map((stat, index) => (
            <div key={stat.label} data-aos="fade-up" data-aos-delay={index * 100}>
              <dt className="eyebrow">{stat.label}</dt>
              <dd className={`mt-[6px] font-display text-h4 font-bold ${stat.highlight ? 'text-primary-dark' : 'text-ink'}`}>
                {stat.value}
              </dd>
              {stat.note && <dd className="mt-[4px] font-code text-eyebrow text-muted">{stat.note}</dd>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
