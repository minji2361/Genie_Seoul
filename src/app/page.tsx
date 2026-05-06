import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProgramsSection from "@/components/ProgramsSection";
import ReviewsSection from "@/components/ReviewsSection";
import HistorySection from "@/components/HistorySection";
import FaqSection from "@/components/FaqSection";
import ApplySection from "@/components/ApplySection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <IntroSection />
        <CategoriesSection />
        <ProgramsSection />
        <ReviewsSection />
        <HistorySection />
        <FaqSection />
        <ApplySection />
      </main>
      <Footer />
    </>
  );
}
