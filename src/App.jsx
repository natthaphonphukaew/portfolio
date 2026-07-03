import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-white text-zinc-800 dark:bg-[#0a0a0a] dark:text-zinc-200">
      <Navbar theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Works />
      </main>
      <Footer />
    </div>
  )
}
