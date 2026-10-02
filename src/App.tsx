import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, type ComponentType } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import AboutPage from './pages/AboutPage'
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
}

// Ignore a trailing slash so /about/ matches /about
const currentPath = window.location.pathname.replace(/(.)\/+$/, '$1')
const route = routes[currentPath] ?? routes['/']

function App() {
  // Scroll-reveal animations — elements opt in with data-aos="..." attributes
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false, // replay every time an element scrolls into view
      offset: 80,
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
      {/* overflow-x-clip hides the off-screen start position of fade-left/right without breaking the sticky header */}
      <main className="overflow-x-clip">
        <Page />
      </main>
      <Footer />
    </>
  )
}

export default App
