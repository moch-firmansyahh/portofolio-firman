"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const jakartaTime = now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
        const parts = jakartaTime.split(", ");
        if (parts.length > 1) {
          setTimeStr(`${parts[1]} GMT+7`);
        }
      } catch (e) {
        // Fallback if timezone not supported
        const hours = String(now.getUTCHours() + 7).padStart(2, "0");
        const minutes = String(now.getUTCMinutes()).padStart(2, "0");
        const seconds = String(now.getUTCSeconds()).padStart(2, "0");
        setTimeStr(`${hours}:${minutes}:${seconds} GMT+7`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="content">
          <div className="shape-1"></div>
          <div className="shape-2"></div>
          <div className="line"></div>
          <div className="text">
            <h1 className="row-1" data-aos="fade-right" data-aos-duration="2000">
              FRONT END
            </h1>
            <h1 className="row-2" data-aos="flip-down" data-aos-duration="2000">
              DEVELOPMENT
            </h1>
            <h1 className="row-3" data-aos="fade-left" data-aos-duration="2000">
              ENTHUSIAST
            </h1>
          </div>

          <i className="bx bx-chevron-down arrow" style={{ fontSize: "2.5rem" }}></i>

          <div className="short-info">
            <div className="left-side" data-aos="fade-up-right" data-aos-delay="300">
              <h1>Based in Bandung, Indonesia</h1>
              <p className="time">{timeStr}</p>
            </div>

            <div className="right-side" data-aos="fade-up-left" data-aos-delay="300">
              <p>LEVEL</p>
              <h1>
                <div className="pulse"></div>
                JUNIOR FRONTEND DEVELOPER
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
