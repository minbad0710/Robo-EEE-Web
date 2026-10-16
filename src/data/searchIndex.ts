import {
  advisors,
  benchmarks,
  corePartners,
  teamDepartments,
  teamMembers,
  milestones,
  navLinks,
  newsPosts,
  platforms,
  sponsors,
  type NavLink,
} from './site'

export type SearchPage = NavLink & { description: string; keywords: string[] }

// What each page can be found by, on top of its name. Lists pulled from site.ts
// (members, robots, news titles, …) stay in sync automatically.
const pageDetails: Record<string, { description: string; keywords: string[] }> = {
  '/': {
    description: 'Overview, latest results and robot platforms',
    keywords: ['home', 'team robo', 'robo@eee', 'ace', 'assemble compete execute', 'latest results', 'announcement', ...benchmarks.map((b) => b.event)],
  },
  '/about': {
    description: 'Our origin story and mission',
    keywords: ['about us', 'origin', 'mission', 'history', 'story', 'founded 2024', 'mlda@eee', 'mlda robo', 'eee undergraduate office', 'strategic transition'],
  },
  '/competitions': {
    description: 'ICRA BARN, RoboCup@Home and our roadmap',
    keywords: ['competition', 'icra', 'ieee', 'barn', 'barn challenge', 'robocup@home', 'robocup', 'results', 'awards', 'milestones', 'roadmap', 'vienna', ...milestones.map((m) => m.title)],
  },
  '/technology': {
    description: 'Our robots, hardware and prototype gallery',
    keywords: ['tech', 'robots', 'robot deployments', 'platforms', 'hardware', 'software', 'specs', 'prototype gallery', 'cad', ...platforms.map((p) => p.name), ...platforms.flatMap((p) => p.specs)],
  },
  '/team': {
    description: 'Faculty advisors and active members',
    keywords: ['our team', 'members', 'people', 'who we are', 'advisors', 'faculty', 'professor', 'leads', ...teamDepartments.map((d) => d.name), ...advisors.map((a) => a.name), ...teamMembers.map((m) => m.name), ...teamMembers.map((m) => m.role)],
  },
  '/sponsors': {
    description: 'Partners, sponsors and partnering with us',
    keywords: ['sponsor', 'partners', 'partnership', 'partner with us', 'sponsorship deck', 'supporters', ...corePartners.map((p) => p.name), ...sponsors.map((s) => s.name)],
  },
  '/join': {
    description: 'Recruitment, FAQ and how to apply',
    keywords: ['join', 'apply', 'application', 'recruitment', 'recruiting', 'sign up', 'faq', 'questions', 'selection process', 'interview', 'contact'],
  },
  '/news': {
    description: 'Updates, results and workshops',
    keywords: ['updates', 'blog', 'articles', 'posts', 'archives', 'the dispatch', ...newsPosts.map((p) => p.title)],
  },
}

const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, ' ').trim()
// Words of a text, split on spaces and punctuation. "@" stays inside a word, so "RoboCup@Home" is one
// word: "robocup" finds it, but "home" only finds the Home page.
const wordsOf = (text: string) => normalize(text).split(/[^a-z0-9@]+/).filter(Boolean)

// Every page linked from the header, dropdown pages included (e.g. each competition under Competitions).
// A new page becomes searchable as soon as it's added to navLinks; App.tsx warns in development if a page isn't.
const flatten = (links: NavLink[], parent?: NavLink): { link: NavLink; parent?: NavLink }[] =>
  links.flatMap((link) => [{ link, parent }, ...(link.children ? flatten(link.children, link) : [])])

// Dropdown pages without their own entry in pageDetails: described by their section ("Competitions")
const subPageDetails = (parent: NavLink) => ({ description: parent.label, keywords: [parent.label] })

const index = flatten(navLinks).map(({ link, parent }) => {
  const details = pageDetails[link.href] ?? (parent ? subPageDetails(parent) : { description: '', keywords: [] })
  return {
    page: { ...link, ...details },
    nameWords: wordsOf(link.label),
    keywords: details.keywords.map(normalize),
    keywordWords: [...new Set(details.keywords.flatMap(wordsOf))],
  }
})

// Every typed word has to be the start of one of the page's words ("chen wei" → Chen Wei Jie)
const allWordsMatch = (typed: string[], pageWords: string[]) =>
  typed.every((word) => pageWords.some((pageWord) => pageWord.startsWith(word)))

// URLs of every searchable page (App.tsx checks every route is in here)
export const searchablePaths = index.map((entry) => entry.page.href)

// 1. If the query matches page names, only those pages are shown ("home" → Home, "i" → ICRA BARN 2026, 2027).
// 2. Otherwise, with 3+ letters, pages whose content keywords match are shown ("jackal" → Technology),
//    best first: a keyword is exactly the query → a keyword starts with it → the rest; ties keep header order.
export function searchPages(query: string): SearchPage[] {
  const q = normalize(query)
  const typed = wordsOf(q)
  if (typed.length === 0) return []

  const byName = index.filter((entry) => allWordsMatch(typed, entry.nameWords))
  if (byName.length > 0 || q.length < 3) return byName.map((entry) => entry.page)

  return index
    .filter((entry) => allWordsMatch(typed, entry.keywordWords))
    .map((entry, order) => {
      const rank = entry.keywords.includes(q) ? 0 : entry.keywords.some((k) => k.startsWith(q)) ? 1 : 2
      return { page: entry.page, rank, order }
    })
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
    .map((match) => match.page)
}
