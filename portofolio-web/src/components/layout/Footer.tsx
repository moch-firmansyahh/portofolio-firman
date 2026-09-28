"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProfile } from "@/services/portfolio";
import { supabase } from "@/lib/supabase/client";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Footer() {
  const [displayName, setDisplayName] = useState(PERSONAL_INFO.shortName || "FIRMAN");

  useEffect(() => {
    let isMounted = true;
    async function loadLiveProfile() {
      try {
        const live = await getProfile();
        if (isMounted && live?.shortName) {
          setDisplayName(live.shortName);
        }
      } catch (err) {
        console.warn("Using default shortName in Footer:", err);
      }
    }
    loadLiveProfile();

    // Realtime Subscription untuk Nama di Footer
    const channel = supabase
      .channel("realtime-footer-profile-web")
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

  return (
    <footer className="relative bg-[#0D0D0D] text-white pt-16 sm:pt-20 pb-0 overflow-hidden border-t border-neutral-800 select-none">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="w-full flex flex-col items-center justify-end relative z-10 overflow-hidden">
        {/* Giant Monolithic Name - Cropped Half Bottom Bleed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full text-center overflow-hidden flex justify-center items-end"
        >
          <h2 className="text-[25vw] sm:text-[26vw] md:text-[27vw] font-black tracking-tight leading-[0.72] text-[#222222] hover:text-[#303030] transition-colors duration-500 uppercase select-none pointer-events-auto cursor-default font-heading translate-y-[22%]">
            {displayName}
          </h2>
        </motion.div>
      </div>
    </footer>
  );
}
