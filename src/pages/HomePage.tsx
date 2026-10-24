import Benchmarks from '../components/home/Benchmarks'
import Hero from '../components/home/Hero'
import Platforms from '../components/home/Platforms'

export default function HomePage() {
  return (
    <>
      {/* The announcement is part of the hero */}
      <Hero />
      <Benchmarks />
      <Platforms />
    </>
  )
}
