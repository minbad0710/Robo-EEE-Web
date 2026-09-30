import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Announcement from './components/Announcement'
import Benchmarks from './components/Benchmarks'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Platforms from './components/Platforms'

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

  return (
    <>
      <Header currentPath="/" />
      {/* overflow-x-clip hides the off-screen start position of fade-left/right without breaking the sticky header */}
      <main className="overflow-x-clip">
        <Hero />
        <Announcement />
        <Benchmarks />
        <Platforms />
      </main>
      <Footer />
    </>
  )
}

export default App
