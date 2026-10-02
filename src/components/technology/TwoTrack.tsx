export default function TwoTrack() {
  return (
    <section className="border-b border-line">
      <div className="page-container flex flex-col gap-[32px] py-[64px] md:py-[88px] lg:flex-row lg:items-start lg:justify-between lg:gap-[48px]">
        <div className="max-w-[860px]" data-aos="fade-up">
          <p className="eyebrow eyebrow--accent">Development Architecture</p>
          <h2 className="display-heading mt-[16px] text-h2 leading-[1.2]">The Two-Track Deployment Approach</h2>
          <p className="mt-[20px] max-w-[560px] text-sm leading-relaxed text-body">
            We run the Galaxea R1 for rapid algorithmic validation alongside our custom in-house robot for deep
            hardware-level tuning and uncompromised kinematics.
          </p>
        </div>

        <p className="ace-badge" data-aos="fade-up" data-aos-delay="150">
          ACE Pipeline
        </p>
      </div>
    </section>
  )
}
