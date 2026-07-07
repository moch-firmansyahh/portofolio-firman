"use client";

import Link from "next/link";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="content">
          <div className="title">
            <h2 data-aos="fade-right" data-aos-duration="500" data-aos-delay="300">
              About <hr />
            </h2>
            <h1 data-aos="fade-right" data-aos-duration="500" data-aos-delay="500">
              Firman
            </h1>
          </div>

          <div className="profile-container" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="300">
            <div className="profile">
              <img src="/assets/foto4.jpeg" alt="profile" />
            </div>
          </div>

          <div className="about-me" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
            <p>
              Halo, saya Moch Firmansyah. Mahasiswa Informatika Telkom University yang senang mempelajari hal baru. Saat
              ini saya fokus mendalami Front-End Development untuk menciptakan pengalaman pengguna yang nyaman dan mulus
              di web
            </p>
            <Link className="learn-more" href="/learn-more">
              Learn More <i className="bx bx-arrow-back arrow" style={{ transform: "rotate(180deg)", display: "inline-block", marginLeft: "5px" }}></i>
            </Link>
          </div>
          <div className="text-wrapper" data-aos="flip-up">
            <div className="text">
              <h1>
                FIRMAN <span>PORTOFOLIO</span>
              </h1>
              <h1>
                FIRMAN <span>PORTOFOLIO</span>
              </h1>
            </div>
            <div className="text">
              <h1>
                FIRMAN <span>PORTOFOLIO</span>
              </h1>
              <h1>
                FIRMAN <span>PORTOFOLIO</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
