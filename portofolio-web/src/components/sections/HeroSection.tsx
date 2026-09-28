"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO as DEFAULT_INFO } from "@/data/portfolioData";
import { getProfile } from "@/services/portfolio";
import { supabase } from "@/lib/supabase/client";
import type { PersonalInfo } from "@/types/profile";

const DEFAULT_TYPEWRITER_PHRASES = [
  "Moch. Firmansyah",
  "Frontend Developer",
  "Security Enthusiast",
  "Informatics Student",
];

// Isolated Typewriter Subcomponent
function TypewriterText({ phrases }: { phrases: string[] }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const activeList = useMemo(() => {
    return phrases && phrases.length > 0 ? phrases : DEFAULT_TYPEWRITER_PHRASES;
  }, [phrases]);

  useEffect(() => {
    const currentPhrase = activeList[phraseIndex % activeList.length] || "Developer";
    const speed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % activeList.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, activeList]);

  return (
    <span className="font-bold text-neutral-900 inline-block">
      {displayText}
      <span className="inline-block w-0.5 h-6 bg-neutral-900 ml-1 align-middle animate-pulse" />
    </span>
  );
}

export default function HeroSection() {
  const [profile, setProfile] = useState<PersonalInfo>(DEFAULT_INFO);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveProfile() {
      try {
        const live = await getProfile();
        if (isMounted && live) {
          setProfile(live);
        }
      } catch (err) {
        console.warn("Using default profile:", err);
      }
    }
    loadLiveProfile();

    // Realtime Supabase Subscription untuk Profil Hero
    const channel = supabase
      .channel("realtime-hero-profile-web")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profile" },
        () => {
          loadLiveProfile();
        }
      )
      .subscribe();

    window.addEventListener("focus", loadLiveProfile);

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
      window.removeEventListener("focus", loadLiveProfile);
    };
  }, []);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleLine1Ref.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.1,
      })
        .from(
          titleLine2Ref.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          subheadlineRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ctaGroupRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.7,
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Parse Title into 2 lines dynamically based on profile.role
  const roleText = profile.role || DEFAULT_INFO.role;
  let titlePart1 = "Frontend Developer &";
  let titlePart2 = "Security Enthusiast.";

  if (roleText.includes(" & ")) {
    const parts = roleText.split(" & ").map((s) => s.trim()).filter(Boolean);
    titlePart1 = `${parts[0]} &`;
    titlePart2 = `${parts.slice(1).join(" & ")}.`;
  } else if (roleText.includes(" and ")) {
    const parts = roleText.split(" and ").map((s) => s.trim()).filter(Boolean);
    titlePart1 = `${parts[0]} and`;
    titlePart2 = `${parts.slice(1).join(" and ")}.`;
  } else {
    titlePart1 = roleText;
    titlePart2 = "";
  }

  // Split titlePart2 so the last word is bound directly with the star icon in a whitespace-nowrap wrapper
  const titlePart2Words = titlePart2 ? titlePart2.split(" ") : [];
  const mainWords = titlePart2Words.slice(0, -1).join(" ");
  const lastWord = titlePart2Words[titlePart2Words.length - 1] || "";

  // Typewriter phrases dynamically constructed from name & individual role titles
  const typewriterList = useMemo(() => {
    const splitRoles = roleText.includes(" & ")
      ? roleText.split(" & ").map((r) => r.trim()).filter(Boolean)
      : roleText.includes(" and ")
      ? roleText.split(" and ").map((r) => r.trim()).filter(Boolean)
      : [roleText];

    return [
      profile.name || DEFAULT_INFO.name,
      ...splitRoles,
      "Informatics Student",
    ];
  }, [profile.name, roleText]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[88vh] flex flex-col justify-center pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Background Glow */}
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(238, 242, 246, 0.8) 0%, rgba(248, 250, 252, 0.4) 50%, transparent 70%)",
        }}
        className="absolute top-1/4 left-1/3 w-[500px] md:w-[700px] h-[350px] md:h-[450px] rounded-full -z-10 pointer-events-none"
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="max-w-[1200px] w-full mx-auto px-6 md:px-12 flex flex-col items-start will-change-transform"
      >
        {/* Hero Title */}
        <div className="space-y-1 md:space-y-2 mb-8">
          <h1
            ref={titleLine1Ref}
            className="text-[42px] sm:text-[58px] md:text-[80px] lg:text-[92px] font-extrabold tracking-[-0.035em] leading-[1.05] text-[#0F172A]"
          >
            {titlePart1}
          </h1>
          {titlePart2 ? (
            <h1
              ref={titleLine2Ref}
              className="text-[42px] sm:text-[58px] md:text-[80px] lg:text-[92px] font-extrabold tracking-[-0.035em] leading-[1.05] text-[#0F172A]"
            >
              <span className="text-[#0F172A] underline decoration-neutral-300 decoration-wavy decoration-2 underline-offset-8">
                {mainWords ? `${mainWords} ` : ""}
                <span className="inline-block whitespace-nowrap">
                  <span>{lastWord}</span>
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="inline-block text-2xl sm:text-4xl md:text-5xl select-none text-neutral-400 ml-2.5 sm:ml-4 align-baseline"
                    style={{ textDecoration: "none" }}
                  >
                    ✦
                  </motion.span>
                </span>
              </span>
            </h1>
          ) : null}
        </div>

        {/* Subheadline with Dynamic Typewriter Loop */}
        <div
          ref={subheadlineRef}
          className="max-w-2xl text-lg sm:text-xl md:text-2xl text-neutral-600 font-normal leading-relaxed mb-10 tracking-tight"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-normal text-neutral-800 mb-2">
            <span>Hi, I am </span>
            <TypewriterText phrases={typewriterList} />
          </div>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            {profile.about || profile.subheadline || DEFAULT_INFO.about}
          </p>
        </div>

        {/* CTA Buttons Group */}
        <div
          ref={ctaGroupRef}
          className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0D0D0D] hover:bg-neutral-800 text-white font-semibold text-base transition-colors duration-200 shadow-xs cursor-pointer group"
          >
            <span>Explore Featured Work</span>
            <ArrowDown className="w-4 h-4 text-neutral-400 transition-transform group-hover:translate-y-0.5" />
          </a>

          <a
            href="#contact"
            onClick={scrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 text-neutral-900 font-semibold text-base transition-colors duration-200 shadow-xs cursor-pointer group"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
