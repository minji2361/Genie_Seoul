"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImageBannerSection from "@/components/ImageBannerSection";
import AboutUsSection from "@/components/AboutUsSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import GenieDaySection from "@/components/GenieDaySection";
import FindGroupSection from "@/components/FindGroupSection";
import HistorySection from "@/components/HistorySection";
import GeniusCalloutSection from "@/components/GeniusCalloutSection";
import GenieUsSection from "@/components/GenieUsSection";
import CommunicationMagicSection from "@/components/CommunicationMagicSection";
import GenieClubSection from "@/components/GenieClubSection";
import GenieLoginSection from "@/components/GenieLoginSection";
import GenieInterviewSection from "@/components/GenieInterviewSection";
import Footer from "@/components/Footer";

const LOGIN_STORAGE_KEY = "genie-login-user";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem(LOGIN_STORAGE_KEY);
    setIsLoggedIn(Boolean(userId));
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="mx-auto w-full max-w-6xl bg-white shadow-[0_0_0_1px_rgba(93,38,193,0.08)] min-[481px]:my-2 min-[481px]:rounded-2xl min-[481px]:shadow-xl lg:max-w-7xl lg:my-4">
        <HeroSection />
        <ImageBannerSection />
        <AboutUsSection />
        <PrinciplesSection />
        <GenieDaySection />
        <FindGroupSection />
        <HistorySection />
        <GeniusCalloutSection />
        <GenieUsSection />
        <CommunicationMagicSection />
        <GenieClubSection />
        <GenieLoginSection
          isLoggedIn={isLoggedIn}
          onLogin={() => setIsLoggedIn(true)}
          onLogout={() => setIsLoggedIn(false)}
        />
        {isLoggedIn ? <GenieInterviewSection /> : null}
      </main>
      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
}
