"use client";

import { useEffect, useState } from "react";
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
      <main>
        <HeroSection />
        <AboutUsSection />
        <GenieDaySection />
        <GenieUsSection />
        <GenieClubSection />
        <HistorySection />
        <GenieLoginSection isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onLogout={() => setIsLoggedIn(false)} />
        {isLoggedIn ? <GenieInterviewSection /> : null}
      </main>
      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
}
