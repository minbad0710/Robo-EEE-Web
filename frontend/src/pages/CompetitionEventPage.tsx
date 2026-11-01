import { contactLinks, type CompetitionEvent } from '../data/site'

const instagramUrl = contactLinks.find((link) => link.icon === 'instagram')!.href

type CompetitionEventPageProps = { event: CompetitionEvent }

// Page for one competition from the header dropdown. Shows a "coming soon" placeholder until the page content is
// written; otherwise the event's Team Description Paper button and video (see CompetitionEvent in site.ts).
export default function CompetitionEventPage({ event }: CompetitionEventPageProps) {
  return (
    <>
      <section className={`page-container flex flex-col justify-center py-[72px] md:py-[112px] ${event.comingSoon ? 'min-h-[60vh]' : ''}`}>
        <a href="/competitions" className="back-link">
          <span aria-hidden="true">←</span> All competitions
        </a>

        <p className="eyebrow eyebrow--accent mt-[40px]">Competition</p>
        <h1 className="display-heading mt-[16px] text-h1 leading-[1.15]">{event.name}</h1>

        {event.comingSoon && (
          <div>
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

        {event.paper && (
          <div className="mt-[32px] flex flex-wrap items-center gap-[12px]">
            {event.paper.url ? (
              <a href={event.paper.url} download className="btn btn--primary">
                {event.paper.label} <span aria-hidden="true">↓</span>
              </a>
            ) : (
              <>
                <button type="button" className="btn btn--primary" disabled>
                  {event.paper.label}
                </button>
                <span className="coming-soon-badge">
                  <span className="status-dot" aria-hidden="true" />
                  PDF coming soon
                </span>
              </>
            )}
          </div>
        )}
      </section>

      {/* The video gets its own full-width dark band, centred under a cyan heading */}
      {event.videoUrl && (
        <section className="section-plain section-dark page-container py-[64px] text-center md:py-[96px]">
          <h2 className="display-heading text-h2 text-primary">{event.name} Team Video</h2>
          <div className="video-frame mx-auto mt-[32px] md:mt-[48px]" data-aos="fade-up">
            <iframe
              src={event.videoUrl}
              title={`${event.name} Team Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </>
  )
}
