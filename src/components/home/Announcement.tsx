// Home — callout at the bottom of the hero, styled to stand out (see .announcement in components.css)
export default function Announcement() {
  return (
    <aside className="announcement" aria-labelledby="announcement-label">
      <span id="announcement-label" className="announcement__label">
        <span className="status-dot" aria-hidden="true" />
        Announcement
      </span>
      <p className="text-base leading-relaxed font-[500] md:text-lead">
        Formerly MLDA@EEE Robotics Team → now rebranded to <strong className="font-[700]">Team Robo</strong> directly
        under the NTU EEE Undergraduate Office.
      </p>
    </aside>
  )
}
