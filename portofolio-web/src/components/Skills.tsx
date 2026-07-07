"use client";

import { useEffect, useRef } from "react";

interface Skill {
  id: string;
  name: string;
  logo: string;
  percent: number;
}

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skills.length || !skillsRef.current) return;

    const progressEls = skillsRef.current.querySelectorAll(".progress");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = Number(el.getAttribute("data-percent")) || 0;
          
          el.style.width = target + "%";
          el.classList.add("animate");
          setTimeout(() => el.classList.remove("animate"), 1200);

          obs.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    progressEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [skills]);

  return (
    <section className="skills-page" id="skills">
      <div className="container">
        <div className="content">
          <div className="title">
            <h2 data-aos="fade-right" data-aos-duration="500" data-aos-delay="300">
              Skills
            </h2>
            <h1 data-aos="fade-right" data-aos-duration="500" data-aos-delay="500">
              What I Do
            </h1>
          </div>

          <div 
            ref={skillsRef}
            className="skills-grid" 
            data-aos="fade-up" 
            data-aos-duration="800" 
            data-aos-delay="300"
          >
            {skills.map((skill) => (
              <div key={skill.id} className="skill">
                <div className="skill-top">
                  <div className="label">
                    <span className="skill-logo">{skill.logo}</span> {skill.name}
                  </div>
                  <div className="percent">{skill.percent}%</div>
                </div>
                <div className="bar">
                  <div 
                    className="progress" 
                    data-percent={skill.percent} 
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="note" data-aos="fade-up" data-aos-delay="500">
            <p></p>
          </div>
        </div>
      </div>
    </section>
  );
}
