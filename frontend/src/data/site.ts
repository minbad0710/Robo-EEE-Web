// `children` = dropdown under the link in the header
export type NavLink = { label: string; href: string; children?: NavLink[] }

// One page per competition, listed in the header's "Competitions" dropdown (newest first).
// `comingSoon` shows a placeholder page until the page is written.
// `paper` adds a Team Description Paper download button: `label`, and `url` = the PDF, e.g. put it in
// frontend/public/papers/ and set url: '/papers/robocup-home-2027-tdp.pdf'. Leave `url` empty until the PDF exists
// (the button shows, disabled, as "PDF coming soon").
// `videoUrl` embeds a YouTube video: the "embed" link from YouTube's Share → Embed (https://www.youtube.com/embed/…).
export type CompetitionEvent = {
  name: string
  href: string
  comingSoon?: boolean
  paper?: { label: string; url?: string }
  videoUrl?: string
}

export const competitionEvents: CompetitionEvent[] = [
  { name: 'ICRA BARN 2026', href: '/competitions/icra-barn-2026', comingSoon: true },
  { name: 'ICRA BARN 2027', href: '/competitions/icra-barn-2027', comingSoon: true },
  {
    name: 'RoboCup@Home 2027',
    href: '/competitions/robocup-home-2027',
    paper: { label: 'Team Description Paper 2027' },
    // Placeholder until the qualification video is up
    videoUrl: 'https://www.youtube.com/embed/zJ1PYqVOYVA?si=Nnz5w4l-EHkUUOnt',
  },
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

export type SocialIcon = 'email' | 'instagram' | 'linkedin' | 'github' | 'website'

export type ContactLink = NavLink & { icon: SocialIcon }

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

// `description` is shown on the Home page cards and the Technology page; `label` and `specs` (one line per entry) on the Technology page
export type Platform = { track: string; name: string; description: string; label: string; specs: string[] }

export const platforms: Platform[] = [
  {
    track: 'BARN Challenge',
    name: 'Clearpath Jackal',
    description:
      'Our platform for BARN navigation development, supporting obstacle perception, path planning and motion-control testing in constrained environments.',
    label: 'BARN Challenge Platform',
    specs: ['Jetson AGX Orin · High-torque 4WD', 'Velodyne VLP-16 · RealSense D435'],
  },
  {
    track: 'RoboCup',
    name: 'Galaxea R1',
    description:
      'A dual-arm mobile robot used as a baseline for integrating perception, manipulation, navigation and human–robot interaction for RoboCup@Home.',
    label: 'RoboCup@Home Baseline',
    specs: ['Galaxea Custom SDK · Holonomic Base', 'Stereo Depth · 6-DoF Assistive Arm'],
  },
  {
    track: 'RoboCup',
    name: 'In-House Built Robot',
    description:
      'An in-house mobile manipulator being developed for RoboCup@Home, with a modular design supporting integration, maintenance and iterative testing.',
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

// Team page — Active Members. Department tabs across the top, in this order (advisors first). The people
// themselves come from the backend: see data/teamMembers.ts.
export type TeamDepartment = { id: string; name: string; description: string }

export const teamDepartments: TeamDepartment[] = [
  { id: 'advisors', name: 'Advisors', description: 'Faculty and student advisors guiding the team with research expertise and experience.' },
  { id: 'leads', name: 'Leads', description: "Steering the team's vision, strategy and coordination across every department." },
  { id: 'software', name: 'Software', description: 'Building the perception, navigation and manipulation stack that makes our robots autonomous.' },
  { id: 'hardware', name: 'Hardware', description: 'Designing and building the mechanical and embedded systems inside every robot.' },
  { id: 'business', name: 'Business Development', description: 'Building relationships with the sponsors and partners who keep the team competing.' },
  { id: 'finance', name: 'Financial Controller', description: "Managing the team's budget, purchases and sponsorship funds." },
  { id: 'branding', name: 'Branding, Marketing & Website', description: 'Shaping the Team Robo brand across social media, events and this website.' },
]

// Sponsors page, "Collaborations". Logos come from src/assets/sponsors/ by position (partner-1 = first card, …);
// `mark` is the short wordmark shown in the logo tile when a partner has no logo file; `href` makes the logo and
// name links to the partner's website
export type CorePartner = { name: string; mark: string; description: string; href?: string }

export const corePartners: CorePartner[] = [
  {
    name: 'MLDA@EEE Initiative',
    mark: 'MLDA',
    href: 'https://www.ntu.edu.sg/eee/student-life/mlda',
    description:
      'Our originating student division. Generously provided the initial Jackal robotic baseline systems and computational structures before rebranding under direct institutional backing.',
  },
  {
    name: 'Garage@EEE Advancement Route',
    mark: 'GARAGE',
    href: 'https://www.garage-eee.com/',
    description:
      'The dedicated workshop space and experimental proving grounds where robotic hardware models undergo robust validation tests, low-level integration, and payload modifications.',
  },
]

// Sponsor cards — logos come from src/assets/sponsors/ by position (sponsor-1 = first card, …).
// To add a sponsor: add an entry here and a matching sponsor-N.webp logo.
export type Sponsor = { name: string; href?: string }

export const sponsors: Sponsor[] = [
  { name: 'NTU School of Electrical and Electronic Engineering', href: 'https://www.ntu.edu.sg/eee' },
  { name: 'NTU College of Engineering', href: 'https://www.ntu.edu.sg/engineering' },
]

export const sponsorshipEmail = 'teamrobontu@gmail.com'

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
      'Our main recruitment cycle runs in Semester 1. Smaller top-ups may happen in Semester 2 depending on which divisions need people. Follow us on Instagram or LinkedIn to hear when applications open.',
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
