import { contactLinks, type CompetitionEvent } from '../data/site'

const instagramUrl = contactLinks.find((link) => link.icon === 'instagram')!.href

type CompetitionEventPageProps = { event: CompetitionEvent }

// Page for one competition from the header dropdown. Shows a "coming soon" placeholder until the
// page content is written (then set `comingSoon: false` in competitionEvents and add the content here).
export default function CompetitionEventPage({ event }: CompetitionEventPageProps) {
  return (
    <section className="page-container flex min-h-[60vh] flex-col justify-center py-[72px] md:py-[112px]">
      <a href="/competitions" className="back-link" data-aos="fade-up">
        <span aria-hidden="true">←</span> All competitions
      </a>

      <p className="eyebrow eyebrow--accent mt-[40px]" data-aos="fade-up">
        Competition
      </p>
      <h1 className="display-heading mt-[16px] text-h1 leading-[1.15]" data-aos="fade-up" data-aos-delay="100">
        {event.name}
      </h1>

      {event.comingSoon && (
        <div data-aos="fade-up" data-aos-delay="200">
          <span className="coming-soon-badge mt-[24px]">
            <span className="status-dot" aria-hidden="true" />
            Coming soon
          </span>
          <p className="mt-[20px] max-w-[560px] leading-relaxed text-body">
            We're putting this page together. Details about the challenge, our robot and our progress will be posted
            here soon. In the meantime, follow us on Instagram for the latest updates.
          </p>
          <div className="mt-[32px] flex flex-wrap gap-[12px]">
            <a href="/competitions" className="btn btn--outline">
              Back to Competitions
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
              Follow on Instagram
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
