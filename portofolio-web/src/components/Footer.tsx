"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | string>("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="content">
          <h1></h1>
          <div className="social">
            <div className="logo">
              <a href="https://www.linkedin.com/in/firman-ajah-681637313/" target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-linkedin-square" style={{ fontSize: "2rem" }}></i>
              </a>
            </div>
            <div className="logo">
              <a href="https://www.instagram.com/frmzyx/" target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-instagram" style={{ fontSize: "2rem" }}></i>
              </a>
            </div>
            <div className="logo">
              <a href="https://www.tiktok.com/@frmnzy_" target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-tiktok" style={{ fontSize: "2rem" }}></i>
              </a>
            </div>
          </div>
          <p><span>{year}</span></p>
        </div>
      </div>
    </footer>
  );
}
