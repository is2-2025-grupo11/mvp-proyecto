import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { About } from "@/components/about"
import { Features } from "@/components/features"
import { Audience } from "@/components/audience"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <About />
      <Features />
      <Audience />
      <Contact />
      <Footer />
    </main>
  )
}
