import { recruitment } from '../../data/site'

export default function RecruitmentBanner() {
  const { open } = recruitment
  return (
    <div
      className={`recruitment-banner ${open ? '' : 'recruitment-banner--closed'} mt-[40px] flex items-start gap-[16px] p-[20px] sm:items-center sm:gap-[20px] md:mt-[56px] md:px-[20px] md:py-[18px]`}
      role="status"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <span className="recruitment-banner__icon" aria-hidden="true">
        !
      </span>
      <div className="min-w-0">
        <p className="display-heading text-[1rem] leading-[1.3] md:text-h4">
          {open ? recruitment.openTitle : recruitment.closedTitle}
        </p>
        <p className="mt-[6px] text-xs leading-relaxed text-body">
          {open ? recruitment.openDescription : recruitment.closedDescription}
        </p>
      </div>
    </div>
  )
}
