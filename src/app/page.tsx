import { CommunicationMagicSection } from "@/components/CommunicationMagicSection";
import { FindMeetingSection } from "@/components/FindMeetingSection";
import { FooterBanner } from "@/components/FooterBanner";
import { GenieClubSection } from "@/components/GenieClubSection";
import { GenieDayBannerSection } from "@/components/GenieDayBannerSection";
import { GenieHistorySection } from "@/components/GenieHistorySection";
import { GenieStorySection } from "@/components/GenieStorySection";
import { GeniusBannerSection } from "@/components/GeniusBannerSection";
import { GeniusListSection } from "@/components/GeniusListSection";
import { Header } from "@/components/Header";
import { SHOW_GENIE_US } from "@/config/site-sections";
import { HeroSection } from "@/components/HeroSection";
import { IntroPhotoSection } from "@/components/IntroPhotoSection";
import { PastGenieDaySection } from "@/components/PastGenieDaySection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <main>
        <HeroSection />
        <IntroPhotoSection />
        <GenieStorySection />
        <GenieHistorySection />
        <GenieDayBannerSection />
        <FindMeetingSection />
        <PastGenieDaySection />
        {SHOW_GENIE_US && (
          <>
            <GeniusBannerSection />
            <GeniusListSection />
          </>
        )}
        <CommunicationMagicSection />
        <GenieClubSection />
      </main>
      <FooterBanner />
    </div>
  );
}
