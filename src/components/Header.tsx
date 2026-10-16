import { useEffect, useState } from 'react'
import logoMark from '../assets/logo-mark.webp'
import { navLinks } from '../data/site'
import SearchBox from './SearchBox'

type HeaderProps = { currentPath?: string }

// Small down-arrow shown next to nav links that have a dropdown
function Chevron() {
  return (
    <svg className="nav-dropdown__chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  )
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  // A section stays highlighted on its sub-pages too (Competitions on /competitions/icra-barn-2026)
  const isCurrent = (href: string) => href === currentPath || (href !== '/' && currentPath.startsWith(`${href}/`))

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
      <div className="page-container flex items-center justify-between py-[10px]">
        <a href="/" className="flex items-center gap-[12px]">
          {/* Logo artwork cropped from its black square — on the black header it shows at full size */}
          <img src={logoMark} alt="Robo@EEE logo" className="h-[44px] w-auto sm:h-[56px]" />
          <span className="display-heading text-[16px] text-white">TEAM ROBO</span>
        </a>

        {/* 8 links only fit from lg; below that the hamburger menu is used */}
        <nav aria-label="Main" className="hidden items-center gap-[20px] lg:flex xl:gap-[32px]">
          {navLinks.map((link) =>
            link.children ? (
              // Dropdown opens on hover or keyboard focus; the link itself still goes to the section page
              <div key={link.href} className="nav-dropdown">
                <a href={link.href} className="nav-link nav-dropdown__trigger" aria-current={isCurrent(link.href) ? 'page' : undefined}>
                  {link.label}
                  <Chevron />
                </a>
                <div className="nav-dropdown__menu">
                  <ul className="nav-dropdown__list">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <a href={child.href} className="nav-dropdown__item" aria-current={child.href === currentPath ? 'page' : undefined}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a key={link.href} href={link.href} className="nav-link" aria-current={isCurrent(link.href) ? 'page' : undefined}>
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-[16px]">
          {/* Icon that opens into a search box; its full width is reserved so the links never shift.
              Phones get a full search box inside the menu instead (see below) */}
          <SearchBox collapsible className="hidden w-[240px] sm:flex lg:w-[160px] xl:w-[220px]" />

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
          <div className="page-container pt-[16px] pb-[4px] sm:hidden">
            <SearchBox />
          </div>
          <ul className="page-container flex flex-col py-[8px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link block py-[12px]"
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
                {link.children && (
                  <ul className="mobile-submenu">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className="nav-link block py-[8px]"
                          aria-current={child.href === currentPath ? 'page' : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
