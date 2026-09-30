import logo from '../assets/logo.jpg'
import { contactLinks, navLinks } from '../data/site'
import SocialIcon from './SocialIcon'

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-text">
      <div className="page-container pt-[40px] pb-[32px]">
        {/* Top row — page links + social icons (centred & stacked below lg, split left/right from lg) */}
        <div className="flex flex-col items-center gap-[32px] lg:flex-row lg:justify-between">
          <nav aria-label="Footer pages">
            <ul className="flex flex-wrap justify-center gap-x-[40px] gap-y-[16px] text-sm font-[500] lg:justify-start">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-[40px] lg:gap-[32px]">
            {contactLinks.map((link) => (
              <li key={link.icon}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  title={link.label}
                  className="footer-icon"
                  {...(link.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                >
                  <SocialIcon name={link.icon} className="size-[24px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-[32px] border-0 border-t border-footer-muted/30" />

        {/*
          Bottom row
          - below lg: centred stack → logo, office + tagline, copyright
          - from lg:  3 columns     → copyright | logo | office + tagline
        */}
        <div className="flex flex-col items-center gap-[24px] text-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:text-left">
          <p className="order-last font-code text-eyebrow text-footer-muted lg:order-none lg:justify-self-start">
            © 2026 Team Robo NTU. All rights reserved.
          </p>

          <a href="/" className="order-first flex items-center gap-[12px] lg:order-none">
            <img src={logo} alt="" className="size-[40px] rounded-[8px] object-cover" />
            <span className="display-heading text-h4 text-white">TEAM ROBO</span>
          </a>

          <div className="flex flex-wrap justify-center gap-x-[32px] gap-y-[8px] font-code text-eyebrow text-footer-muted lg:flex-col lg:items-end lg:justify-self-end lg:text-right">
            <p className="flex items-center gap-[8px]">
              <span className="status-dot" aria-hidden="true" />
              NTU EEE Undergraduate Office
            </p>
            <p>Designed for high-performance autonomy</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
