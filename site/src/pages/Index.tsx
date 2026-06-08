import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const Index = () => (
  <div className="relative min-h-screen flex flex-col">
    <Background />

    <Header />

    <main className="relative z-10 flex-1 flex items-center px-6 sm:px-12 lg:px-20 py-12">
      <div className="w-full max-w-[80rem] flex flex-col gap-14">
        <Hero />
        <Services />
        <Faq />
        <CtaSection />
      </div>
    </main>

    <div className="opacity-0 animate-fade-in" style={{ animationDelay: "1.8s" }}>
      <Footer />
    </div>

    <CookieConsent />
  </div>
);

export default Index;
