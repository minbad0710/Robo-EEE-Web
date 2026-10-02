export default function Origin() {
  return (
    <section className="border-b border-line">
      <div className="page-container grid items-start gap-[40px] py-[64px] md:py-[96px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-[64px] xl:gap-[80px]">
        <div data-aos="fade-up">
          <h2 className="font-display text-sm font-bold uppercase text-primary-dark">Founded in 2024</h2>

          <div className="mt-[24px] flex max-w-[720px] flex-col gap-[24px] text-lead leading-relaxed text-body">
            <p>
              Team Robo was born in early 2024 as a passionate cohort of student engineers operating
              under the MLDA@EEE student club. Armed with MLDA's resources and access to standardized
              platforms, we established the initial baseline frameworks that would lay the groundwork
              for our rapid success.
            </p>
            <p>
              Recognizing our trajectory and the strategic need for continuous academic excellence, the{' '}
              <strong className="font-[500] text-ink">
                NTU School of Electrical and Electronic Engineering (EEE) Undergraduate Office
              </strong>{' '}
              officially brought the initiative under their direct backing in late 2025.
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
