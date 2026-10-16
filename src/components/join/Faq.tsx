import { faqs } from '../../data/site'

export default function Faq() {
  return (
    <section className="border-b border-line">
      <div className="page-container grid gap-[32px] py-[56px] md:py-[72px] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[64px]">
        <div data-aos="fade-up">
          <p className="eyebrow eyebrow--accent">Common Questions</p>
          <h2 className="display-heading mt-[12px] text-h2 leading-[1.15]">Frequently Asked Questions</h2>
          <p className="mt-[16px] max-w-[360px] text-sm leading-relaxed text-body">
            New to Team Robo? Here is what students usually ask before applying.
          </p>
        </div>

        <div className="border-t border-line" data-aos="fade-up" data-aos-delay="100">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>
                <h3 className="display-heading text-[0.9375rem] leading-[1.35] transition-colors md:text-[1rem]">
                  {faq.question}
                </h3>
                <span className="faq-item__icon" aria-hidden="true" />
              </summary>
              <p className="max-w-[640px] pr-[44px] pb-[20px] text-sm leading-relaxed text-body">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
