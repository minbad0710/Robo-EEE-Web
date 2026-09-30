export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Competitions', href: '/competitions' },
  { label: 'Technology', href: '/technology' },
]

export type SocialIcon = 'email' | 'instagram' | 'linkedin'

export type ContactLink = NavLink & { icon: SocialIcon }

// `label` is used as the icon's accessible name and hover tooltip
export const contactLinks: ContactLink[] = [
  { icon: 'email', label: 'Email: eee-teamrobo@ntu.edu.sg', href: 'mailto:eee-teamrobo@ntu.edu.sg' },
  { icon: 'instagram', label: 'Instagram: @ntu_eee_robo', href: 'https://www.instagram.com/ntu_eee_robo' },
  { icon: 'linkedin', label: 'LinkedIn: Team Robo NTU', href: '#' },
]

export type Benchmark = { medal: string; result: string; event: string; team: string }

export const benchmarks: Benchmark[] = [
  { medal: '🥈', result: '2nd Place', event: 'ICRA BARN 2024', team: 'as MLDA@EEE' },
  { medal: '🏅', result: 'Finalist', event: 'ICRA BARN 2025', team: 'as MLDA@EEE' },
  { medal: '🥇', result: '1st Place (Sim)', event: 'BARN 2026', team: 'as Team Robo' },
]

export type Platform = { track: string; name: string; description: string }

export const platforms: Platform[] = [
  {
    track: 'BARN Challenge',
    name: 'Clearpath Jackal',
    description:
      'A robust, standardized system leveraged for complex, high-speed collision-free obstacle navigation benchmarks in dense simulated and physical woods.',
  },
  {
    track: 'RoboCup@Home Baseline',
    name: 'Galaxea R1',
    description:
      'Acquired via collaboration with Prof. Ziwei Wang. Provides a reliable baseline platform with advanced perception and assistive manipulators.',
  },
  {
    track: 'RoboCup@Home Custom',
    name: 'In-House Built Robot',
    description:
      'Meticulously designed and assembled by students to maximize agility, payload adaptability, and custom modular perception layouts.',
  },
]
