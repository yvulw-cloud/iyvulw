import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import GuestbookSection from "@/components/guestbook-section"
import IntroPopup from "@/components/IntroPopup"

export default function Home() {
  return (
    <>
      <IntroPopup />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <section id="guestbook">
          <GuestbookSection />
        </section>
        <Footer />
      </main>
    </>
  )
}
