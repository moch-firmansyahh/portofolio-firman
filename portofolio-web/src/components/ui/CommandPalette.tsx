"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  Home,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  Mail,
  ExternalLink,
  Copy,
  CheckCircle2,
  X,
} from "lucide-react";
import { PERSONAL_INFO as DEFAULT_INFO } from "@/data/portfolioData";
import { getProfile } from "@/services/portfolio";
import { PersonalInfo } from "@/types/profile";
import { GithubIcon, LinkedinIcon, InstagramIcon, TiktokIcon } from "./icons";

export default function CommandPalette() {
  const [profile, setProfile] = useState<PersonalInfo>(DEFAULT_INFO);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getProfile()
      .then((live) => {
        if (isMounted && live) {
          setProfile(live);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateTo = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ACTIONS = useMemo(
    () => [
      {
        id: "home",
        title: "Home",
        category: "Navigation",
        icon: Home,
        action: () => navigateTo("#"),
      },
      {
        id: "about",
        title: "About Me",
        category: "Navigation",
        icon: User,
        action: () => navigateTo("#about"),
      },
      {
        id: "skills",
        title: "Tech Stack & Skills",
        category: "Navigation",
        icon: Code2,
        action: () => navigateTo("#skills"),
      },
      {
        id: "projects",
        title: "Featured Projects",
        category: "Navigation",
        icon: FolderGit2,
        action: () => navigateTo("#projects"),
      },
      {
        id: "experience",
        title: "Pendidikan & Pengalaman",
        category: "Navigation",
        icon: Briefcase,
        action: () => navigateTo("#experience"),
      },
      {
        id: "contact",
        title: "Hubungi Saya",
        category: "Navigation",
        icon: Mail,
        action: () => navigateTo("#contact"),
      },
      {
        id: "copy-email",
        title: copied ? "Email Berhasil Disalin!" : "Salin Alamat Email",
        category: "Quick Actions",
        icon: copied ? CheckCircle2 : Copy,
        action: handleCopyEmail,
      },
      {
        id: "github",
        title: "Buka Profil GitHub",
        category: "Social",
        icon: GithubIcon,
        action: () => window.open(profile.socialLinks.github, "_blank"),
      },
      {
        id: "linkedin",
        title: "Buka Profil LinkedIn",
        category: "Social",
        icon: LinkedinIcon,
        action: () => window.open(profile.socialLinks.linkedin, "_blank"),
      },
      {
        id: "instagram",
        title: "Buka Profil Instagram",
        category: "Social",
        icon: InstagramIcon,
        action: () => window.open(profile.socialLinks.instagram, "_blank"),
      },
      {
        id: "tiktok",
        title: "Buka Profil TikTok",
        category: "Social",
        icon: TiktokIcon,
        action: () => window.open(profile.socialLinks.tiktok, "_blank"),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copied, profile]
  );

  const filteredActions = useMemo(
    () =>
      ACTIONS.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      ),
    [ACTIONS, search]
  );

  // Reset selectedIndex whenever search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette with Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredActions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredActions.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex]);

  return (
    <>
      {/* Floating Shortcut Trigger Pill on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-white text-[#0F172A] border border-[#E2E8F0] shadow-lg text-xs font-semibold backdrop-blur-md cursor-pointer transition-colors group"
        >
          <Command className="w-3.5 h-3.5 text-neutral-900 group-hover:rotate-12 transition-transform" />
          <span>Quick Menu</span>
          <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 text-[10px] font-mono text-neutral-500 border border-neutral-200">
            Ctrl K
          </kbd>
        </motion.button>
      </div>

      {/* Spotlight Command Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden z-10"
            >
              {/* Search Input Bar */}
              <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 gap-3">
                <Search className="w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ketik perintah atau cari menu... (Gunakan ↑ ↓ Enter)"
                  className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-neutral-500 hover:text-black hover:bg-neutral-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredActions.length === 0 ? (
                  <div className="py-8 text-center text-xs text-neutral-500">
                    Tidak ada hasil untuk &ldquo;{search}&rdquo;
                  </div>
                ) : (
                  filteredActions.map((item, idx) => {
                    const IconComp = item.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <motion.button
                        key={item.id}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={item.action}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left group cursor-pointer ${
                          isSelected
                            ? "bg-neutral-100 border border-neutral-300"
                            : "hover:bg-neutral-50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isSelected
                                ? "bg-[#0D0D0D] text-white border-neutral-900"
                                : "bg-neutral-100 text-neutral-900 border-neutral-200 group-hover:bg-[#0D0D0D] group-hover:text-white"
                            }`}
                          >
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                              {item.title}
                            </span>
                            <span className="block text-[11px] text-neutral-500">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-transform" />
                      </motion.button>
                    );
                  })
                )}
              </div>

              {/* Footer Helper */}
              <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
                <div className="flex items-center gap-2">
                  <span>Navigasi:</span>
                  <kbd className="font-mono text-[10px] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                    ↑ ↓
                  </kbd>
                  <kbd className="font-mono text-[10px] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                    ↵ Enter
                  </kbd>
                </div>
                <kbd className="font-mono text-[10px] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                  ESC to close
                </kbd>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
