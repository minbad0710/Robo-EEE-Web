import PageHero from '../components/PageHero'
import CorePartners from '../components/sponsors/CorePartners'
import PartnerCta from '../components/sponsors/PartnerCta'
import SponsorWall from '../components/sponsors/SponsorWall'

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Supporting Excellence"
        title="Sponsors & Strategic Partners"
        description="Driving podium performance requires cutting-edge platforms, spatial sensors, and premier simulation architectures. Our industry allies make it happen."
        titleClassName="max-w-[1100px]"
        contained
        divider={false}
      />
      <CorePartners />
      <SponsorWall />
      <PartnerCta />
    </>
  )
}
