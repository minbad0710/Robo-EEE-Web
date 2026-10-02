import { sponsorshipEmail } from '../../data/site'

// No sponsorship deck PDF exists yet, so "Download Deck" opens an email asking for it.
// Once a PDF is available, put it in public/ and point the second button at it (e.g. href="/sponsor-deck.pdf").
const partnerHref = `mailto:${sponsorshipEmail}?subject=${encodeURIComponent('Partnership with Team Robo')}`
const deckHref = `mailto:${sponsorshipEmail}?subject=${encodeURIComponent('Sponsorship deck request')}`

export default function PartnerCta() {
  return (
    <section className="page-container pt-[96px] pb-[80px] text-center md:pt-[144px] md:pb-[96px]">
      <h2 className="display-heading text-h2" data-aos="fade-up">
        Partner With Team Robo
      </h2>
      <p className="mx-auto mt-[24px] max-w-[540px] text-sm leading-relaxed text-body" data-aos="fade-up" data-aos-delay="100">
        Empower Singapore's elite student robotics team while gaining prominent corporate visibility and direct access
        to NTU's top engineering minds.
      </p>
      <div className="mt-[32px] flex flex-wrap justify-center gap-[12px]" data-aos="fade-up" data-aos-delay="200">
        <a href={partnerHref} className="btn btn--teal">
          Partner With Us
        </a>
        <a href={deckHref} className="btn btn--outline-teal">
          Download Deck (PDF)
        </a>
      </div>
    </section>
  )
}
