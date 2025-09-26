import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import About from "@/components/about"
import Contact from "@/components/contact"
import Certificates from "@/components/certificates"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <Skills />
      <Projects />
      <Certificates />
      <About />
      <Contact />
      {/* Accessibility skip link */}
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:fixed focus:bottom-4 focus:right-4 bg-primary text-primary-foreground px-3 py-2 rounded-md"
      >
        Skip to contact
      </a>
    </main>
  )
}
