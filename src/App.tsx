import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, type ComponentType } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { searchablePaths } from './data/searchIndex'
import { competitionEvents } from './data/site'
import AboutPage from './pages/AboutPage'
import CompetitionEventPage from './pages/CompetitionEventPage'
import CompetitionsPage from './pages/CompetitionsPage'
import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import NewsPage from './pages/NewsPage'
import SponsorsPage from './pages/SponsorsPage'
import TeamPage from './pages/TeamPage'
import TechnologyPage from './pages/TechnologyPage'

type Route = { page: ComponentType; title: string }

// Path → page. Nav links are plain <a href>, so each click is a full page load
// and the page is picked from the URL once on startup.
const routes: Record<string, Route> = {
  '/': { page: HomePage, title: 'Team Robo@EEE' },
  '/about': { page: AboutPage, title: 'About · Team Robo@EEE' },
  '/competitions': { page: CompetitionsPage, title: 'Competitions · Team Robo@EEE' },
  '/technology': { page: TechnologyPage, title: 'Technology · Team Robo@EEE' },
  '/team': { page: TeamPage, title: 'Team · Team Robo@EEE' },
  '/sponsors': { page: SponsorsPage, title: 'Sponsors · Team Robo@EEE' },
  '/join': { page: JoinPage, title: 'Join Us · Team Robo@EEE' },
  '/news': { page: NewsPage, title: 'News · Team Robo@EEE' },
  // One page per competition in the header's Competitions dropdown
  ...Object.fromEntries(
    competitionEvents.map((event) => [
      event.href,
      { page: () => <CompetitionEventPage event={event} />, title: `${event.name} · Team Robo@EEE` },
    ]),
  ),
}

// Every page must be findable in the header search. During development, warn about any route that isn't
// (fix: link it from navLinks in site.ts, as a header link or a dropdown item)
if (import.meta.env.DEV) {
  const missing = Object.keys(routes).filter((path) => !searchablePaths.includes(path))
  if (missing.length > 0) console.warn(`Pages missing from the header search: ${missing.join(', ')}`)
}

// Ignore a trailing slash so /about/ matches /about
const currentPath = window.location.pathname.replace(/(.)\/+$/, '$1')
const route = routes[currentPath] ?? routes['/']

function App() {
  // Scroll-reveal animations on cards and photos only, never on headings or text, each playing once
  // (see "Animations" in the README)
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  useEffect(() => {
    document.title = route.title
  }, [])

  const Page = route.page

  return (
    <>
      <Header currentPath={currentPath} />
      {/* overflow-x-clip trims the grey section backgrounds where they run past the screen edges (see components.css),
          without breaking the sticky header */}
      <main className="overflow-x-clip">
        <Page />
      </main>
      <Footer />
    </>
  )
}

export default App
