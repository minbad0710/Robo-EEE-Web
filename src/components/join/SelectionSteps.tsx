import { selectionSteps } from '../../data/site'

export default function SelectionSteps() {
  return (
    <section className="border-b border-line">
      <div className="page-container py-[56px] md:py-[72px]">
        <h2 className="eyebrow eyebrow--accent" data-aos="fade-up">
          Selection Stepper &amp; Pipeline
        </h2>

        {/* items-start: cards keep their own height, as in the Figma */}
        <ol className="mt-[24px] grid items-start gap-[16px] sm:grid-cols-2 md:mt-[32px] lg:grid-cols-4 lg:gap-[20px]">
          {selectionSteps.map((step, index) => (
            <li
              key={step.title}
              className="team-card p-[20px]"
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              <span className="step-badge">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="display-heading mt-[12px] text-[0.9375rem]">{step.title}</h3>
              <p className="mt-[10px] text-xs leading-relaxed text-body">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
