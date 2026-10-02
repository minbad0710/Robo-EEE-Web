import gallery1 from '../../assets/technology/gallery-1.webp'
import gallery2 from '../../assets/technology/gallery-2.webp'
import gallery3 from '../../assets/technology/gallery-3.webp'
import galleryBanner from '../../assets/technology/gallery-banner.webp'

const thumbnails = [
  { src: gallery1, alt: 'Students building robots in the EEE robotics lab' },
  { src: gallery2, alt: 'Close-up of robot control electronics and wiring' },
  { src: gallery3, alt: 'Wireframe digital twin of the robotics lab' },
]

export default function Gallery() {
  return (
    <section className="page-container pt-[64px] pb-[80px] md:pt-[88px] md:pb-[112px]">
      <div data-aos="fade-up">
        <p className="eyebrow eyebrow--accent">Build Archive</p>
        <h2 className="display-heading mt-[16px] text-h2 uppercase">Prototype Gallery</h2>
      </div>

      <div className="gallery-tile mt-[32px] aspect-[16/9] md:mt-[40px] md:aspect-[1280/420]" data-aos="fade-up">
        <img src={galleryBanner} alt="CAD stress simulation of the in-house robot arm" />
      </div>

      <div className="mt-[20px] grid grid-cols-1 gap-[20px] sm:grid-cols-3 md:mt-[40px]">
        {thumbnails.map((photo, index) => (
          <div key={photo.src} className="gallery-tile aspect-[8/5]" data-aos="fade-up" data-aos-delay={index * 120}>
            <img src={photo.src} alt={photo.alt} />
          </div>
        ))}
      </div>
    </section>
  )
}
