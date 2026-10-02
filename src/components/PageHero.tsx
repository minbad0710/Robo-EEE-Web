import type { ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: ReactNode
  /** Max width of the title — tune it so the title breaks into the same lines as the Figma */
  titleClassName?: string
  /** Max width of the description paragraph */
  descriptionClassName?: string
  /** Divider stops at the content edges instead of running full width (Team page) */
  contained?: boolean
  /** Set false to drop the divider entirely (Sponsors page) */
  divider?: boolean
  /** Extra content under the description (e.g. the Join Us recruitment banner) */
  children?: ReactNode
}

// Title block at the top of inner pages (About, Competitions, …)
export default function PageHero({
  eyebrow,
  title,
  description,
  titleClassName = 'max-w-[880px]',
  descriptionClassName = 'max-w-[560px]',
  contained = false,
  divider = true,
  children,
}: PageHeroProps) {
  const line = divider ? 'border-b border-line' : ''

  return (
    // Divider under the section: full width by default, or only as wide as the content when `contained`
    <section className={contained ? 'page-container' : line}>
      <div className={`pt-[64px] pb-[64px] md:pt-[112px] md:pb-[80px] ${contained ? line : 'page-container'}`}>
        <p className="eyebrow eyebrow--accent" data-aos="fade-up">
          {eyebrow}
        </p>

        <h1 className={`display-heading mt-[20px] text-h1 leading-[1.15] ${titleClassName}`} data-aos="fade-up" data-aos-delay="100">
          {title}
        </h1>

        {description && (
          <p className={`mt-[24px] leading-relaxed text-muted ${descriptionClassName}`} data-aos="fade-up" data-aos-delay="200">
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  )
}
