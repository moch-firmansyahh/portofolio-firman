import SmoothScroll from "@/components/effects/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import AmbientCursor from "@/components/effects/AmbientCursor";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TechMarquee from "@/components/effects/TechMarquee";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen bg-[#F8F9FA] bg-grain-texture text-[#0F172A] relative selection:bg-neutral-900 selection:text-white">
        {/* Preloader Curtain Reveal */}
        <Preloader />

        {/* Ambient Cursor Follower */}
        <AmbientCursor />

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* 1. Hero Section with Dynamic Role Animation & CTAs */}
          <HeroSection />

          {/* 2. Infinite Tech Stack Kinetic Marquee */}
          <TechMarquee />

          {/* 3. About Section with Bio & Qualifications */}
          <AboutSection />

          {/* 4. Skills Section with Animated Sliding Tabs & Level Meters */}
          <SkillsSection />

          {/* 5. Selected Featured Projects with Live Data Fetching */}
          <ProjectsSection />

          {/* 6. Career & Learning Milestones with Dynamic Scroll Drawing Line */}
          <ExperienceSection />

          {/* 7. Contact & Social Links with Secure API Route Submission */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
