// import NewsGrid from '../components/news/NewsGrid'
import PageHero from '../components/PageHero'
import { contactLinks } from '../data/site'

const instagramUrl = contactLinks.find((link) => link.icon === 'instagram')!.href

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Dispatch"
        title="News & Technical Archives"
        description="Follow our updates from simulated environment benchmarks to international competition physical finals and local technical workshops."
        titleClassName="max-w-[1000px]"
        descriptionClassName="max-w-[640px]"
      />

      {/* The news posts are hidden until they're ready. To bring them back, uncomment NewsGrid (and its import
          above) and remove the "Coming soon" section. The posts themselves are still in newsPosts in site.ts. */}
      {/* <NewsGrid /> */}
      <section className="page-container py-[72px] md:py-[112px]">
        <span className="coming-soon-badge">
          <span className="status-dot" aria-hidden="true" />
          Coming soon
        </span>
        <p className="mt-[20px] max-w-[560px] leading-relaxed text-body">
          We're putting our news and technical write-ups together, and they'll be posted here soon. In the meantime,
          follow us on Instagram for the latest updates.
        </p>
        <div className="mt-[32px]">
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
            Follow on Instagram
          </a>
        </div>
      </section>
    </>
  )
}
