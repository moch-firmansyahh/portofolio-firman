import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import AmbientCursor from "@/components/AmbientCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechMarquee from "@/components/TechMarquee";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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
          {/* 1. Hero Section with Magnetic CTAs & Scroll Parallax */}
          <HeroSection />

          {/* 2. Infinite Tech Stack Kinetic Marquee */}
          <TechMarquee />

          {/* 3. About Section with 3D Tilt Card & Animated Stats Counter */}
          <AboutSection />

          {/* 4. Skills Section with Animated Sliding Tabs & Level Meters */}
          <SkillsSection />

          {/* 5. Selected Featured Projects with Category Filters & Layout Animations */}
          <ProjectsSection />

          {/* 6. Career & Learning Milestones with Dynamic Scroll Drawing Line */}
          <ExperienceSection />

          {/* 7. Contact & Social Links with Celebration Confetti */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
