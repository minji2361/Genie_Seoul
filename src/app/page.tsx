import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import GenieDaySection from "@/components/GenieDaySection";
import GenieUsSection from "@/components/GenieUsSection";
import GenieClubSection from "@/components/GenieClubSection";
import HistorySection from "@/components/HistorySection";
import GenieInterviewSection from "@/components/GenieInterviewSection";
import GenieLoginSection from "@/components/GenieLoginSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutUsSection />
        <GenieDaySection />
        <GenieUsSection />
        <GenieClubSection />
        <HistorySection />
        <GenieLoginSection />
        <GenieInterviewSection />
      </main>
      <Footer />
    </>
  );
}
