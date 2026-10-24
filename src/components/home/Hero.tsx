import heroImage from '../../assets/home/hero.webp'
import Announcement from './Announcement'

export default function Hero() {
  return (
    <section className="page-container grid items-center gap-[48px] pt-[64px] pb-[80px] md:pt-[96px] md:pb-[112px] lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-[48px] xl:grid-cols-[minmax(0,1fr)_480px] xl:gap-[64px] min-[1440px]:grid-cols-[minmax(0,1fr)_520px] min-[1440px]:gap-[80px]">
      <div className="min-w-0">
        <p className="eyebrow eyebrow--accent">EEE Competition Robotics Initiative</p>

        <h1 className="display-heading mt-[24px] text-hero uppercase break-words">
          Team
          <br />
          Robo@EEE
        </h1>

        <p className="mt-[20px] font-display text-tagline font-bold text-primary-dark">Assemble • Compete • Execute (ACE)</p>

        <p className="mt-[24px] max-w-[640px] text-lead leading-relaxed text-body">
          Pioneering autonomous mobile manipulation, high-speed navigation, and service robotics.
          Empowering Nanyang Technological University undergraduates to dominate prestigious global stages.
        </p>

        <div className="mt-[32px] flex flex-wrap gap-[8px]">
          <a href="/competitions/robocup-home-2027" className="btn btn--primary">
            RoboCup@Home 2027
          </a>
          <a href="/team" className="btn btn--outline">
            Meet the Team →
          </a>
        </div>
      </div>

      <div className="hero-media aspect-[4/3] w-full lg:aspect-[520/452] lg:max-w-[520px]" data-aos="fade-left" data-aos-delay="150">
        <img src={heroImage} alt="Team Robo members posing together in the lab" />
      </div>

      {/* Full width under the text and photo */}
      <div className="lg:col-span-2">
        <Announcement />
      </div>
    </section>
  )
}
