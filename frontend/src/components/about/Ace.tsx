// The team's motto, Assemble • Compete • Execute (as on the Home page hero): one card per word
const steps = [
  { word: 'Assemble', text: 'Bring together people, hardware and software.' },
  { word: 'Compete', text: 'Test our systems against international benchmarks.' },
  { word: 'Execute', text: 'Deliver working robots under real constraints.' },
]

export default function Ace() {
  return (
    <section className="page-container py-[64px] md:py-[96px]">
      <p className="eyebrow eyebrow--accent">Our Approach</p>
      <h2 className="display-heading mt-[12px] text-h2">Assemble • Compete • Execute</h2>

      <ol className="mt-[32px] grid gap-[16px] md:mt-[48px] md:grid-cols-3 md:gap-[20px]">
        {steps.map(({ word, text }, index) => (
          <li key={word} className="ace-card" data-aos="fade-up" data-aos-delay={index * 150}>
            <span className="ace-card__letter" aria-hidden="true">
              {word[0]}
            </span>
            <h3 className="display-heading mt-[24px] text-h4">{word}</h3>
            <p className="mt-[8px] text-sm leading-relaxed text-body">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
