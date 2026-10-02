export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Competitions', href: '/competitions' },
  { label: 'Technology', href: '/technology' },
  { label: 'Team', href: '/team' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Join Us', href: '/join' },
  { label: 'News', href: '/news' },
]

// The footer keeps the original four page links
export const footerLinks: NavLink[] = navLinks.slice(0, 4)

export type SocialIcon = 'email' | 'instagram' | 'linkedin'

export type ContactLink = NavLink & { icon: SocialIcon }

// `label` is used as the icon's accessible name and hover tooltip
export const contactLinks: ContactLink[] = [
  { icon: 'email', label: 'Email: eee-teamrobo@ntu.edu.sg', href: 'mailto:eee-teamrobo@ntu.edu.sg' },
  { icon: 'instagram', label: 'Instagram: @robo_at_eee', href: 'https://www.instagram.com/robo_at_eee/' },
  { icon: 'linkedin', label: 'LinkedIn: Robo@EEE', href: 'https://www.linkedin.com/company/robo-at-eee/posts/?feedView=all' },
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
    track: 'RoboCup@Home Baseline',
    name: 'Galaxea R1',
    description:
      'Acquired via collaboration with Prof. Ziwei Wang. Provides a reliable baseline platform with advanced perception and assistive manipulators.',
    label: 'RoboCup@Home Baseline',
    specs: ['Galaxea Custom SDK · Holonomic Base', 'Stereo Depth · 6-DoF Assistive Arm'],
  },
  {
    track: 'RoboCup@Home Custom',
    name: 'In-House Built Robot',
    description:
      'Meticulously designed and assembled by students to maximize agility, payload adaptability, and custom modular perception layouts.',
    label: 'RoboCup@Home Custom',
    specs: ['Dual Jetson AGX Orin · Mecanum Drive', '3D Lidar · Custom 7-DoF Manipulator'],
  },
]

export type Pillar = { number: string; title: string; description: string }

export const pillars: Pillar[] = [
  {
    number: '01',
    title: 'Talent Development',
    description:
      'Bridging the EEE curriculum with intense, industrial-grade hardware exposure, creating elite robotics engineers who are day-one ready.',
  },
  {
    number: '02',
    title: 'Research Collaboration',
    description:
      'Acting as the premier engineering vehicle for NTU EEE faculties, rapidly testing cutting-edge research in dynamic environments.',
  },
  {
    number: '03',
    title: 'Global Reputation',
    description:
      "Elevating NTU EEE School's global branding on international stages, demonstrating engineering leadership on prestigious platforms.",
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

// Technology page — software stack
export type AutonomyLayer = { number: string; title: string; tools: string[] }

export const autonomyLayers: AutonomyLayer[] = [
  { number: '01', title: 'Perception & SLAM', tools: ['YOLOv10', 'RTAB-Map'] },
  { number: '02', title: 'Navigation & MPC', tools: ['Nav2', 'Teb Local Planner'] },
  { number: '03', title: 'Manipulation Control', tools: ['MoveIt2', 'OpenArm'] },
]

export const techStack = ['ROS2', 'Nav2', 'MoveIt2', 'YOLOv10', 'Jetson AGX Orin', 'Gazebo Sim', 'Isaac Sim']

// Team page — photos come from src/assets/team/ by position (advisor-1, member-1, …), so keep the order in sync
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

export type Member = { name: string; role: string; year: string }

export const members: Member[] = [
  { name: 'Chen Wei Jie', role: 'Team Lead', year: 'Y3 EEE' },
  { name: 'Sarah Al-Mansoori', role: 'Deputy Lead', year: 'Y3 CCDS' },
  { name: 'Lim Kian Seng', role: 'Hardware Division Lead', year: 'Y4 EEE' },
  { name: 'Emily Tan', role: 'Business Development Lead', year: 'Y3 NBS' },
  { name: 'Rahul Ranganathan', role: 'Marketing Specialist', year: 'Y2 ADM' },
  { name: 'Marcus Wong', role: 'Embedded Systems Engineer', year: 'Y2 EEE' },
  { name: 'Jessica Carter', role: 'Perception Developer', year: 'Y3 EEE' },
  { name: 'Zulkifli Hassan', role: 'Mechanical Specialist', year: 'Y3 MAE' },
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

// Brand logo wall — placeholder names until sponsors are confirmed
export const sponsors: string[] = [
  'Sponsor 1-1', 'Sponsor 1-2', 'Sponsor 1-4',
  'Sponsor 2-1', 'Sponsor 2-2', 'Sponsor 2-4',
  'Sponsor 3-1', 'Sponsor 3-2', 'Sponsor 3-4',
]

export const sponsorshipEmail = 'eee-teamrobo@ntu.edu.sg'

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
export const applyUrl = `mailto:eee-teamrobo@ntu.edu.sg?subject=${encodeURIComponent('Application to Team Robo')}`

export type SelectionStep = { title: string; description: string }

export const selectionSteps: SelectionStep[] = [
  { title: 'Publicity & Signups', description: 'Emails will be sent out for students' },
  {
    title: 'Technical Workshop',
    description: 'Participate in our intensive crash course on ROS2 navigation stack setups and basic TF trees.',
  },
  {
    title: 'Practical Assignment',
    description: 'Submit a modular codebase task modeling complex obstacle navigation path architectures.',
  },
  {
    title: 'Interview & Match',
    description: 'Discuss alignment with team advisors, dynamic tasks, and structural division placements.',
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
