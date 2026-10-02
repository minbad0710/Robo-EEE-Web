import { useState } from 'react'
import { contactLinks, newsPosts } from '../../data/site'
import { byFileName } from '../../utils/assets'

// Every photo in src/assets/news/, named by position: post-1 = first (newest) card, post-2 = second, …
const newsImages = byFileName(import.meta.glob<string>('../../assets/news/*.webp', { eager: true, import: 'default' }))

const instagramUrl = contactLinks.find((link) => link.icon === 'instagram')!.href
const PAGE_SIZE = 6

export default function NewsGrid() {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const hasMore = visible < newsPosts.length

  return (
    <section className="page-container pb-[80px] md:pb-[96px]">
      {/* items-start: cards keep their own height, as in the Figma */}
      <div className="grid items-start gap-x-[28px] gap-y-[32px] md:grid-cols-2 md:gap-y-[48px] lg:grid-cols-3 lg:gap-y-[72px]">
        {newsPosts.slice(0, visible).map((post, index) => {
          const href = post.href ?? instagramUrl
          return (
            // AOS animates the wrapper so it doesn't override the card's own hover lift
            <div key={post.title} data-aos="fade-up" data-aos-delay={(index % 3) * 120}>
              <article className="team-card team-card--hover p-[20px]">
                <div className="aspect-[300/134] overflow-hidden rounded-[4px] bg-surface-alt">
                  <img src={newsImages[`post-${index + 1}`]} alt="" className="size-full object-cover" loading="lazy" />
                </div>

                <p className="mt-[16px] flex justify-between gap-[12px] font-code text-[0.6875rem]">
                  <time className="uppercase text-primary-dark">{post.date}</time>
                  <span className="text-muted">{post.readTime}</span>
                </p>
                <h2 className="display-heading mt-[12px] text-h4 leading-[1.2]">{post.title}</h2>
                <p className="mt-[16px] text-xs leading-relaxed text-body">{post.summary}</p>

                <a
                  href={href}
                  className="read-more mt-[16px]"
                  aria-label={`Read more: ${post.title}`}
                  {...(href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                >
                  Read More <span aria-hidden="true">→</span>
                </a>
              </article>
            </div>
          )
        })}
      </div>

      {/* Loads the next 6 posts; once everything is shown, older posts live on Instagram */}
      <div className="mt-[48px] text-center md:mt-[64px]" data-aos="fade-up">
        {hasMore ? (
          <button type="button" className="btn btn--soft-teal" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
            Load Archived Posts
          </button>
        ) : (
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn btn--soft-teal">
            Load Archived Posts
          </a>
        )}
      </div>
    </section>
  )
}
