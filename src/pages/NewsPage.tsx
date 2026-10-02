import NewsGrid from '../components/news/NewsGrid'
import PageHero from '../components/PageHero'

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Dispatch"
        title="News & Technical Archives"
        description="Follow our updates from simulated environment benchmarks to international competition physical finals and local technical workshops."
        titleClassName="max-w-[1000px]"
        descriptionClassName="max-w-[640px]"
        contained
        divider={false}
      />
      <NewsGrid />
    </>
  )
}
