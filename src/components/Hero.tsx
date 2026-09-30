import heroImage from '../assets/hero-team.webp'

export default function Hero() {
  return (
    <section className="page-container grid items-center gap-[48px] pt-[64px] pb-[80px] md:pt-[96px] md:pb-[112px] lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-[48px] xl:grid-cols-[minmax(0,1fr)_480px] xl:gap-[64px] min-[1440px]:grid-cols-[minmax(0,1fr)_520px] min-[1440px]:gap-[80px]">
      <div className="min-w-0">
        <p className="eyebrow eyebrow--accent" data-aos="fade-up">
          EEE Competition Robotics Initiative
        </p>

        <h1 className="display-heading mt-[24px] text-hero uppercase break-words" data-aos="fade-up" data-aos-delay="100">
          Team
          <br />
          Robo@EEE
        </h1>

        <p className="mt-[20px] font-display text-tagline font-bold text-primary-dark" data-aos="fade-up" data-aos-delay="200">
          Assemble • Compete • Execute (ACE)
        </p>

        <p className="mt-[24px] max-w-[640px] text-lead leading-relaxed text-body" data-aos="fade-up" data-aos-delay="300">
          Pioneering autonomous mobile manipulation, high-speed navigation, and service robotics.
          Empowering NTU EEE undergraduates to dominate prestigious global stages.
        </p>

        <div className="mt-[32px] flex flex-wrap gap-[8px]" data-aos="fade-up" data-aos-delay="400">
          <a href="/join" className="btn btn--primary">
            Join Us
          </a>
          <a href="/team" className="btn btn--outline">
            Meet the Team →
          </a>
        </div>
      </div>

      <div className="hero-media aspect-[4/3] w-full lg:aspect-[520/452] lg:max-w-[520px]" data-aos="fade-left" data-aos-delay="200" data-aos-duration="900">
        <img src={heroImage} alt="Team Robo members posing together in the lab" />
      </div>
    </section>
  )
}
