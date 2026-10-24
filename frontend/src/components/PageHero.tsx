import type { ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: ReactNode
  /** Max width of the title — tune it so the title breaks into the same lines as the Figma */
  titleClassName?: string
  /** Max width of the description paragraph */
  descriptionClassName?: string
}

// Title block at the top of inner pages (About, Competitions, …). The grey band of the next section
// separates it from the rest of the page.
export default function PageHero({
  eyebrow,
  title,
  description,
  titleClassName = 'max-w-[880px]',
  descriptionClassName = 'max-w-[560px]',
}: PageHeroProps) {
  return (
    <section className="page-container pt-[64px] pb-[64px] md:pt-[112px] md:pb-[80px]">
      <p className="eyebrow eyebrow--accent">{eyebrow}</p>

      <h1 className={`display-heading mt-[20px] text-h1 leading-[1.15] ${titleClassName}`}>{title}</h1>

      {description && <p className={`mt-[24px] leading-relaxed text-muted ${descriptionClassName}`}>{description}</p>}
    </section>
  )
}
