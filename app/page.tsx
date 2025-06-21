import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import DemoSection from "@/components/demo-section"
import BenefitsSection from "@/components/benefits-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <BenefitsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
