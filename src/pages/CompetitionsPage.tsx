import track1Left from '../assets/competitions/track-1-left.webp'
import track1RightBottom from '../assets/competitions/track-1-right-bottom.webp'
import track1RightTop from '../assets/competitions/track-1-right-top.webp'
import track2Banner from '../assets/competitions/track-2-banner.webp'
import Milestones from '../components/competitions/Milestones'
import Track from '../components/competitions/Track'
import PageHero from '../components/PageHero'
import { barnResults, robocupFocus } from '../data/site'

export default function CompetitionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Global Arenas"
        title="Competing in Prestigious International Robotics Competitions"
        titleClassName="max-w-[1240px]"
      />

      <Track
        number="01"
        title="IEEE ICRA BARN Challenge"
        description={
          <>
            High-speed autonomous navigation in unmapped, cluttered environments. Standardized{' '}
            <strong className="font-[600] text-ink">Clearpath Jackal</strong> platform - a pure software
            pipeline competition testing real-time SLAM and predictive velocity profiling.
          </>
        }
        figure="3rd"
        figureLabel="ICRA 2026 · Vienna"
        media={
          // Mobile: big photo on top, two small ones side by side. md+: big photo left, two stacked right.
          <div className="grid grid-cols-2 gap-[4px] md:h-[420px] md:grid-cols-[3fr_2fr] md:grid-rows-2 lg:h-[480px]">
            <div className="media-tile col-span-2 aspect-[4/3] md:col-span-1 md:row-span-2 md:aspect-auto">
              <img src={track1Left} alt="Team members tuning the Jackal inside the cardboard BARN arena" />
            </div>
            <div className="media-tile aspect-[4/3] md:aspect-auto">
              <img src={track1RightTop} alt="Clearpath Jackal robot driving through a narrow cardboard corridor" className="object-[center_70%]" />
            </div>
            <div className="media-tile aspect-[4/3] md:aspect-auto">
              <img src={track1RightBottom} alt="Team Robo members at ICRA 2026 standing beside the Jackal" />
            </div>
          </div>
        }
        stats={barnResults}
      />

      <Track
        number="02"
        title="RoboCup@Home Challenge"
        description="The largest international service robotics league. Teams are evaluated in realistic domestic environments across three complex tasks - Human-Robot Interaction, autonomous Pick-and-Place, and General-Purpose Service Robot command decoding."
        figure="2027"
        figureLabel="Target Qualification"
        media={
          <div className="media-tile aspect-[16/10] md:aspect-[1280/440]">
            <img src={track2Banner} alt="Robotic arm picking up a cup in a home living room" />
          </div>
        }
        stats={robocupFocus}
      />

      <Milestones />
    </>
  )
}
