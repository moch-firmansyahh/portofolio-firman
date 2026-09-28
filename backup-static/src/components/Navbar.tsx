"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const aboutEl = document.getElementById("about");

      // When at the top / Hero Section, reset activeSection so no tab is highlighted
      if (!aboutEl || scrollY < aboutEl.offsetTop - 250) {
        setActiveSection("");
        return;
      }

      const scrollPosition = scrollY + 250;
      let foundSection = "";

      for (const link of NAV_LINKS) {
        const sectionId = link.href.substring(1);
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            foundSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Center Navbar Dock */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-8 sm:pt-10 md:pt-12 pointer-events-none flex justify-center">
        <div className="flex items-center justify-center pointer-events-auto px-6">
          {/* Desktop Navigation: Premium Glassmorphic Dynamic Dock */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden md:flex items-center gap-1.5 bg-white/80 backdrop-blur-2xl border border-white/90 p-2 rounded-full shadow-[0_14px_40px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-black/5 transition-all"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              const isHovered = hoveredNav === link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredNav(link.name)}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-6 py-2.5 text-[15px] font-semibold transition-colors duration-200 rounded-full flex items-center gap-2 select-none ${
                    isActive
                      ? "text-white font-bold"
                      : "text-neutral-600 hover:text-neutral-950"
                  }`}
                >
                  {/* Active Dark Obsidian Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#0D0D0D] rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)] -z-10"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}

                  {/* Dynamic Sliding Hover Pill on Unselected Items */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="hoverNavPill"
                      className="absolute inset-0 bg-neutral-200/60 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}

                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button on Floating Glass Capsule */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-3.5 rounded-full bg-white/90 border border-neutral-200 text-neutral-900 hover:text-black transition-colors focus:outline-none shadow-md backdrop-blur-xl ring-1 ring-black/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-50 p-5 bg-white/95 backdrop-blur-xl rounded-2xl border border-neutral-200 shadow-2xl md:hidden flex flex-col gap-2 pointer-events-auto ring-1 ring-black/5"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-4 py-3 text-base font-semibold text-neutral-900 hover:text-white hover:bg-[#0D0D0D] rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
