export default function Origin() {
  return (
    <section>
      <div className="page-container grid items-start gap-[40px] py-[64px] md:py-[96px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-[64px] xl:gap-[80px]">
        <div>
          <h2 className="font-display text-sm font-bold uppercase text-primary-dark">About Us</h2>

          <div className="mt-[24px] flex max-w-[720px] flex-col gap-[24px] text-lead leading-relaxed text-body">
            <p>
              Team Robo@EEE brings together NTU students to develop autonomous robots through hands-on engineering
              and international competition.
            </p>
            <p>
              Founded in 2024 under MLDA@EEE, the team began with the ICRA BARN Challenge and expanded into an
              independent team within NTU EEE in 2026. Our work now covers autonomous navigation, perception,
              control, mobile manipulation and human–robot interaction.
            </p>
            <p>
              Our mission is to build reliable robotic systems and develop students’ engineering skills through
              practical research, integration and testing.
            </p>
          </div>
        </div>

        <aside className="info-card p-[24px] md:p-[28px]" data-aos="fade-left" data-aos-delay="150">
          <p className="eyebrow eyebrow--accent">Strategic Transition</p>
          <h3 className="display-heading mt-[12px] text-h4">MLDA Robo → Team Robo</h3>
          <p className="mt-[16px] text-sm leading-relaxed text-muted">
            Direct research laboratory access, dedicated academic mentoring from EEE faculty, and
            long-term equipment acquisition channels essential to compete at top international standards.
          </p>
        </aside>
      </div>
    </section>
  )
}
