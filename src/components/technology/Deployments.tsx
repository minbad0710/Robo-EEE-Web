import deployment1 from '../../assets/technology/deployment-1.webp'
import deployment2 from '../../assets/technology/deployment-2.webp'
import deployment3 from '../../assets/technology/deployment-3.webp'
import { platforms } from '../../data/site'

type Photo = { src: string; alt: string; contain?: boolean }

// Photo for each entry in `platforms`, in the same order (deployment-1 = first row, …). `null` = no photo yet (an empty white tile on desktop,
// hidden on mobile). `contain` shows the whole image on white instead of cropping.
const photos: (Photo | null)[] = [
  { src: deployment1, alt: 'Clearpath Jackal robot on a gravel quarry floor' },
  { src: deployment2, alt: 'Galaxea R1 dual-arm mobile humanoid robot', contain: true },
  { src: deployment3, alt: 'In-house robot arm picking up a cup in a home living room' },
]

export default function Deployments() {
  return (
    <section className="pt-[40px] md:pt-[48px]">
      <div className="page-container flex items-baseline justify-between gap-[24px]" data-aos="fade-up">
        <h2 className="font-display text-sm font-bold uppercase text-ink">Robot Deployments</h2>
        <p className="eyebrow">{String(platforms.length).padStart(2, '0')} Platforms</p>
      </div>

      {/*
        Full-bleed rows that alternate sides from lg: photo | panel, panel | photo, photo | panel.
        Below lg every row stacks photo on top, panel underneath.
      */}
      <div className="mt-[40px] border-b border-line">
        {platforms.map((platform, index) => {
          const photo = photos[index]
          const flipped = index % 2 === 1
          return (
            <article
              key={platform.name}
              className={`grid border-t border-line ${flipped ? 'lg:grid-cols-[41fr_59fr]' : 'lg:grid-cols-[61fr_39fr]'}`}
            >
              <div
                className={`deployment-photo ${flipped ? 'lg:order-2 lg:border-l' : 'lg:border-r'} ${photo ? '' : 'hidden lg:block'}`}
                data-aos={flipped ? 'fade-left' : 'fade-right'}
              >
                {photo && <img src={photo.src} alt={photo.alt} className={photo.contain ? 'object-contain' : undefined} />}
              </div>

              <div
                className={`deployment-panel ${flipped ? 'deployment-panel--left' : ''}`}
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div>
                  <p className="eyebrow eyebrow--accent">{platform.label}</p>
                  <h3 className="display-heading mt-[12px] text-h3 leading-[1.2] lg:text-[1.75rem]">{platform.name}</h3>
                </div>
                <ul className="flex flex-col gap-[8px] text-sm text-body">
                  {platform.specs.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
