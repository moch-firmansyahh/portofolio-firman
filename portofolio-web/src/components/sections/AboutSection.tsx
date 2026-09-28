"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { getProfile } from "@/services/portfolio";
import { supabase } from "@/lib/supabase/client";
import { PERSONAL_INFO as DEFAULT_INFO } from "@/data/portfolioData";
import type { PersonalInfo } from "@/types/profile";

// Helper to format inline markdown (**bold** and *italic*)
function formatBioText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-neutral-900 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

export default function AboutSection() {
  const [profile, setProfile] = useState<PersonalInfo>(DEFAULT_INFO);

  useEffect(() => {
    let isMounted = true;
    async function loadLiveProfile() {
      try {
        const live = await getProfile();
        if (isMounted && live) {
          setProfile(live);
        }
      } catch (err) {
        console.warn("Using default profile in AboutSection:", err);
      }
    }
    loadLiveProfile();

    // Realtime Supabase Subscription untuk Seksi About
    const channel = supabase
      .channel("realtime-about-profile-web")
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

  const bioContent = profile.bio?.trim() || DEFAULT_INFO.bio;
  const paragraphs = bioContent
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <section id="about" className="py-32 md:py-44 relative">
      <div className="max-w-[860px] mx-auto px-6 md:px-12">
        <ScrollReveal direction="up" distance={35} duration={0.8}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 leading-tight mb-8 tracking-tight">
            {profile.tagline || DEFAULT_INFO.tagline}
          </h2>

          <div className="space-y-5 text-base sm:text-lg md:text-[19px] text-neutral-600 leading-relaxed font-normal">
            {paragraphs.map((paragraph, index) => (
              <p key={`bio-p-${index}`}>
                {formatBioText(paragraph)}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
