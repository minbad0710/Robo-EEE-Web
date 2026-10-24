import { sponsorshipEmail } from '../../data/site'

// No sponsorship deck PDF exists yet, so "Download Deck" opens an email asking for it.
// Once a PDF is available, put it in public/ and point the second button at it (e.g. href="/sponsor-deck.pdf").
const partnerHref = `mailto:${sponsorshipEmail}?subject=${encodeURIComponent('Partnership with Team Robo')}`
const deckHref = `mailto:${sponsorshipEmail}?subject=${encodeURIComponent('Sponsorship deck request')}`

export default function PartnerCta() {
  return (
    <section className="page-container py-[72px] text-center md:py-[112px]">
      <h2 className="display-heading text-h2">Partner With Team Robo</h2>
      <p className="mx-auto mt-[24px] max-w-[540px] text-sm leading-relaxed text-body">
        Empower Singapore's elite student robotics team while gaining prominent corporate visibility and direct access
        to NTU's top engineering minds.
      </p>
      <div className="mt-[32px] flex flex-wrap justify-center gap-[12px]">
        <a href={partnerHref} className="btn btn--primary">
          Partner With Us
        </a>
        <a href={deckHref} className="btn btn--outline">
          Download Deck (PDF)
        </a>
      </div>
    </section>
  )
}
