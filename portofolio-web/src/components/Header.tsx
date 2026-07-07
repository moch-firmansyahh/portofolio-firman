"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={isHidden ? "hidden" : ""} data-aos="fade-down" data-aos-delay="200">
      <div className="container">
        <div className="content">
          <div className="logo">
            <Link href="/" onClick={closeMenu}>MOCH FIRMANSYAH</Link>
          </div>
          <nav className={isOpen ? "open" : ""}>
            <Link href="/#about" onClick={closeMenu}>About</Link>
            <Link href="/#skills" onClick={closeMenu}>Skills</Link>
            <Link href="/#project" onClick={closeMenu}>Project</Link>
            <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          </nav>
          <button 
            className={`nav-toggle ${isOpen ? "open" : ""}`} 
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
