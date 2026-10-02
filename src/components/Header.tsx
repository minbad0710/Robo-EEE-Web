import { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'
import { navLinks } from '../data/site'

type HeaderProps = { currentPath?: string }

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="page-container flex items-center justify-between py-[24px] ">
        <a href="/" className="flex items-center gap-[12px]">
          <img src={logo} alt="Robo@EEE logo" className="size-[28px] rounded-[6px] object-cover" />
          <span className="display-heading text-[16px]">TEAM ROBO</span>
        </a>

        {/* 8 links only fit from lg; below that the hamburger menu is used */}
        <nav aria-label="Main" className="hidden items-center gap-[24px] lg:flex xl:gap-[32px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={link.href === currentPath ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[16px] min-[480px]:gap-[24px] sm:gap-[40px]">
          <span className="rounded-[4px] border border-line bg-surface-alt px-[12px] py-[6px] font-code text-eyebrow font-[400]">
            NTU EEE
          </span>

          <button
            type="button"
            className="menu-toggle lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main mobile" className="mobile-menu lg:hidden">
          <ul className="page-container flex flex-col py-[8px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link block py-[12px]"
                  aria-current={link.href === currentPath ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
