// `children` = dropdown under the link in the header
export type NavLink = { label: string; href: string; children?: NavLink[] }

// One page per competition, listed in the header's "Competitions" dropdown (newest first).
// `comingSoon` shows a placeholder page until the page is written.
export type CompetitionEvent = { name: string; href: string; comingSoon?: boolean }

export const competitionEvents: CompetitionEvent[] = [
  { name: 'ICRA BARN 2026', href: '/competitions/icra-barn-2026', comingSoon: true },
  { name: 'ICRA BARN 2027', href: '/competitions/icra-barn-2027', comingSoon: true },
  { name: 'RoboCup@Home 2027', href: '/competitions/robocup-home-2027', comingSoon: true },
]

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Competitions',
    href: '/competitions',
    children: competitionEvents.map((event) => ({ label: event.name, href: event.href })),
  },
  { label: 'Technology', href: '/technology' },
  { label: 'Team', href: '/team' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Join Us', href: '/join' },
  { label: 'News', href: '/news' },
]

// The footer keeps the original four page links
export const footerLinks: NavLink[] = navLinks.slice(0, 4)

export type SocialIcon = 'email' | 'instagram' | 'linkedin' | 'github'

export type ContactLink = NavLink & { icon: SocialIcon }

// Team-wide profiles — also the fallback for members who have no GitHub/LinkedIn of their own yet
export const teamGithubUrl = 'https://github.com/Team-Robo'
export const teamLinkedinUrl = 'https://www.linkedin.com/company/robo-at-eee/posts/?feedView=all'

// `label` is used as the icon's accessible name and hover tooltip
export const contactLinks: ContactLink[] = [
  { icon: 'email', label: 'Email: teamrobontu@gmail.com', href: 'mailto:teamrobontu@gmail.com' },
  { icon: 'instagram', label: 'Instagram: @robo_at_eee', href: 'https://www.instagram.com/robo_at_eee/' },
  { icon: 'linkedin', label: 'LinkedIn: Robo@EEE', href: teamLinkedinUrl },
]

export type Benchmark = { medal: string; result: string; event: string; team: string }

export const benchmarks: Benchmark[] = [
  { medal: '🥈', result: '2nd Place', event: 'ICRA BARN 2024', team: 'as MLDA@EEE' },
  { medal: '🏅', result: 'Finalist', event: 'ICRA BARN 2025', team: 'as MLDA@EEE' },
  { medal: '🥇', result: '1st Place (Sim)', event: 'BARN 2026', team: 'as Team Robo' },
]

// `label` and `specs` (one line per entry) are shown on the Technology page
export type Platform = { track: string; name: string; description: string; label: string; specs: string[] }

export const platforms: Platform[] = [
  {
    track: 'BARN Challenge',
    name: 'Clearpath Jackal',
    description:
      'A robust, standardized system leveraged for complex, high-speed collision-free obstacle navigation benchmarks in dense simulated and physical woods.',
    label: 'BARN Challenge Platform',
    specs: ['Jetson AGX Orin · High-torque 4WD', 'Velodyne VLP-16 · RealSense D435'],
  },
  {
    track: 'RoboCup',
    name: 'Galaxea R1',
    description:
      'Acquired via collaboration with Prof. Ziwei Wang. Provides a reliable baseline platform with advanced perception and assistive manipulators.',
    label: 'RoboCup@Home Baseline',
    specs: ['Galaxea Custom SDK · Holonomic Base', 'Stereo Depth · 6-DoF Assistive Arm'],
  },
  {
    track: 'RoboCup',
    name: 'In-House Built Robot',
    description:
      'Meticulously designed and assembled by students to maximize agility, payload adaptability, and custom modular perception layouts.',
    label: 'RoboCup@Home Custom',
    specs: ['Dual Jetson AGX Orin · Mecanum Drive', '3D Lidar · Custom 7-DoF Manipulator'],
  },
]

// Competitions page — label/value pairs under each track; `highlight` colours the value in the accent
export type TrackStat = { label: string; value: string; note?: string; highlight?: boolean }

export const barnResults: TrackStat[] = [
  { label: '2024 Result', value: '2nd Place', note: 'as MLDA Robo' },
  { label: '2025 Result', value: 'Finalist', note: 'as MLDA Robo' },
  { label: '2026 Result', value: '3rd Place', note: 'as MLDA Robo', highlight: true },
]

export const robocupFocus: TrackStat[] = [
  { label: 'HRI Decodes', value: 'Voice & Gesture', highlight: true },
  { label: 'Manipulation', value: '6-DoF Precision', highlight: true },
  { label: 'Goal Season', value: '2027 Qualification', highlight: true },
]

export type Milestone = { date: string; title: string; description: string; highlight?: boolean }

export const milestones: Milestone[] = [
  {
    date: 'Apr 2026',
    title: 'Undergraduate Onboarding',
    description: 'ROS2, manipulator kinematic planning, custom SLAM tuning bootcamps.',
  },
  {
    date: 'Jul 2026',
    title: 'ICRA BARN Finals',
    description: 'Physical deployment of Jackal platforms in cluttered arena environments.',
  },
  {
    date: 'Nov 2026',
    title: 'RoboCup@Home R1 Dev',
    description: 'Galaxea R1 integration for home automation and manipulation scripts.',
  },
  {
    date: 'Feb 2027',
    title: 'TDP Submission',
    description: 'Technical Design Papers detailing modular hardware architecture and algorithms.',
  },
  {
    date: 'Jul 2027',
    title: 'RoboCup Physical Finals',
    description: 'High-complexity service benchmarks live on stage at the international arena.',
    highlight: true,
  },
]

// Team page — advisor photos come from src/assets/team/ by position (advisor-1, advisor-2, …)
export type Advisor = { name: string; affiliation: string; description: string }

export const advisors: Advisor[] = [
  {
    name: 'Asst Prof Ziwei Wang',
    affiliation: 'EEE Department · PINE Lab',
    description: 'Pioneering service robotics collaborations and providing elite baseline robotic frameworks.',
  },
  {
    name: 'Asst Prof Yoonchang Sung',
    affiliation: 'School of CCDS',
    description:
      'Directing strategic multi-agent trajectory exploration and algorithmic verification under academic paradigms.',
  },
]

// Team page — Active Members. Department tabs across the top, in this order.
export type TeamDepartment = { id: string; name: string; description: string }

export const teamDepartments: TeamDepartment[] = [
  { id: 'leads', name: 'Leads', description: "Steering the team's vision, strategy and coordination across every department." },
  { id: 'software', name: 'Software', description: 'Building the perception, navigation and manipulation stack that makes our robots autonomous.' },
  { id: 'hardware', name: 'Hardware', description: 'Designing and building the mechanical and embedded systems inside every robot.' },
  { id: 'business', name: 'Business Development', description: 'Building relationships with the sponsors and partners who keep the team competing.' },
  { id: 'finance', name: 'Financial Controller', description: "Managing the team's budget, purchases and sponsorship funds." },
  { id: 'branding', name: 'Branding, Marketing & Website', description: 'Shaping the Team Robo brand across social media, events and this website.' },
]

// One row per person per department per academic year — the same shape a database table would have, so this
// list can later be replaced by data loaded from a database. Department heads get a row in 'leads' and one in
// their own department. The year list on the page is built from `year`.
export type TeamMember = {
  year: string // academic year, e.g. 'AY26/27'
  department: string // `id` from teamDepartments
  name: string
  role: string
  photo?: string // file name in src/assets/team/ (no extension) or a full image URL — default avatar if empty
  github?: string // profile URL — falls back to teamGithubUrl
  linkedin?: string // profile URL — falls back to teamLinkedinUrl
}

// Placeholder people until the real AY26/27 roster is ready
export const teamMembers: TeamMember[] = [
  { year: 'AY26/27', department: 'leads', name: 'Chen Wei Jie', role: 'Team Lead' },
  { year: 'AY26/27', department: 'leads', name: 'Sarah Al-Mansoori', role: 'Deputy Lead' },
  { year: 'AY26/27', department: 'leads', name: 'Lim Kian Seng', role: 'Head of Hardware' },
  { year: 'AY26/27', department: 'leads', name: 'Emily Tan', role: 'Head of Business Development' },
  { year: 'AY26/27', department: 'software', name: 'Jessica Carter', role: 'Perception Developer' },
  { year: 'AY26/27', department: 'hardware', name: 'Lim Kian Seng', role: 'Head of Hardware' },
  { year: 'AY26/27', department: 'hardware', name: 'Marcus Wong', role: 'Embedded Systems Engineer' },
  { year: 'AY26/27', department: 'hardware', name: 'Zulkifli Hassan', role: 'Mechanical Engineer' },
  { year: 'AY26/27', department: 'business', name: 'Emily Tan', role: 'Head of Business Development' },
  { year: 'AY26/27', department: 'branding', name: 'Rahul Ranganathan', role: 'Marketing Specialist' },
]

// Sponsors page — `mark` is the short wordmark shown in the logo tile until real logos are added
export type CorePartner = { name: string; mark: string; description: string }

export const corePartners: CorePartner[] = [
  {
    name: 'MLDA@EEE Initiative',
    mark: 'MLDA',
    description:
      'Our originating student division. Generously provided the initial Jackal robotic baseline systems and computational structures before rebranding under direct institutional backing.',
  },
  {
    name: 'Garage@EEE Advancement Route',
    mark: 'GARAGE',
    description:
      'The dedicated workshop space and experimental proving grounds where robotic hardware models undergo robust validation tests, low-level integration, and payload modifications.',
  },
]

// Sponsor cards — logos come from src/assets/sponsors/ by position (sponsor-1 = first card, …).
// To add a sponsor: add an entry here and a matching sponsor-N.webp logo.
export type Sponsor = { name: string; href?: string }

export const sponsors: Sponsor[] = [
  { name: 'NTU School of Electrical and Electronic Engineering' },
  { name: 'NTU College of Engineering' },
]

export const sponsorshipEmail = 'teamrobontu@gmail.com'

// Join Us page — flip `open` to switch the banner between "open" and "closed" wording/colours
export const recruitment = {
  open: true,
  openTitle: 'Semester 1 Main Recruitment Cycle Now Open',
  openDescription:
    'We are actively accepting applications for the 2026 Competition Season. Minor top-ups occur during Semester 2 depending on division demand.',
  closedTitle: 'Recruitment Is Currently Closed',
  closedDescription:
    'Our next main recruitment cycle opens in Semester 1. Follow us on Instagram or LinkedIn to hear when applications reopen.',
}

// Where "Apply to Team Robo Now" goes — swap in the application form URL (e.g. a Google/Microsoft Form) when ready
export const applyUrl = `mailto:teamrobontu@gmail.com?subject=${encodeURIComponent('Application to Team Robo')}`

// Join Us page — FAQ for first-time visitors. Answers that mention dates or eligibility
// should be checked by the team whenever recruitment details change.
export type Faq = { question: string; answer: string }

export const faqs: Faq[] = [
  {
    question: 'What is Team Robo?',
    answer:
      "Team Robo is the competition robotics team of NTU's School of Electrical and Electronic Engineering, backed by the EEE Undergraduate Office. We build autonomous robots and compete internationally in the IEEE ICRA BARN Challenge (high-speed navigation) and RoboCup@Home (domestic service robots).",
  },
  {
    question: 'Who can join? Do I have to be an EEE student?',
    answer:
      'Any NTU undergraduate is welcome to apply. Most of our work is engineering, but we also need people for business development, marketing and design, so students from outside EEE are encouraged too.',
  },
  {
    question: 'Do I need prior robotics experience?',
    answer:
      'No. Curiosity and willingness to learn matter more than experience. Our technical workshop covers the basics (ROS2 navigation stacks and TF trees) before the practical assignment, so newcomers can catch up.',
  },
  {
    question: 'When does recruitment happen?',
    answer:
      'Our main recruitment cycle runs in Semester 1. Smaller top-ups may happen in Semester 2 depending on which divisions need people. The banner at the top of this page shows whether applications are currently open.',
  },
  {
    question: 'What does the selection process look like?',
    answer:
      'There are four steps: (1) Publicity & sign-ups, where we email interested students; (2) a technical workshop, an intensive crash course on ROS2 navigation stack setups and basic TF trees; (3) a practical assignment, a modular coding task on obstacle navigation; and (4) an interview with the team and advisors to find the division that fits you best.',
  },
  {
    question: 'What roles are available?',
    answer:
      'Software (perception, navigation and manipulation with ROS2), hardware (embedded systems and mechanical design), and non-technical roles in business development, marketing and design.',
  },
  {
    question: 'I have more questions. How can I reach you?',
    answer:
      'Email us at teamrobontu@gmail.com or message us on Instagram (@robo_at_eee). We are happy to chat before you apply.',
  },
]

// News page — newest first. Card images come from src/assets/news/ by position (post-1 = first card, …).
// `href` is where "Read More" goes; posts without one link to the team Instagram, where updates are published.
export type NewsPost = {
  date: string
  readTime: string
  title: string
  summary: string
  href?: string
}

export const newsPosts: NewsPost[] = [
  {
    date: 'Feb 12, 2026',
    readTime: '3 min read',
    title: '🥇 1st Place Dynamic Sim - BARN 2026',
    summary: 'Team Robo scores record path navigation metrics under dynamic cluttered virtual simulation models.',
  },
  {
    date: 'Jan 28, 2026',
    readTime: '2 min read',
    title: 'Team Robo Officially Launches Under EEE',
    summary: 'Undergraduate Initiative officially rebranded from MLDA@EEE to Team Robo NTU with direct university resource allocation.',
  },
  {
    date: 'Dec 14, 2025',
    readTime: '4 min read',
    title: 'RoboCup@Home Expansion Announced',
    summary: "Academic integration of Prof. Ziwei Wang's Galaxea R1 platform accelerates service manipulation benchmarks.",
  },
  {
    date: 'Nov 10, 2025',
    readTime: '2 min read',
    title: 'Semester 1 Recruitment Now Open',
    summary: 'Looking for ROS2 stack operators, embedded developers, business organizers, and creative layout editors.',
  },
  {
    date: 'Oct 02, 2025',
    readTime: '3 min read',
    title: 'ICRA 2025 Competition Recap',
    summary: 'Detailed report on obstacle path navigation results inside dense dynamic physically unmapped physical models.',
  },
  {
    date: 'Aug 18, 2025',
    readTime: '2 min read',
    title: 'Workshop: Intro to ROS2 Navigation',
    summary: 'Students complete turtlesim by working with TF frames, ros2 nodes, etc.',
  },
]
