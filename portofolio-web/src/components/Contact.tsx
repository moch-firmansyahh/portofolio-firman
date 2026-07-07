"use client";

import React from "react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you can send this data to an email API or database.
    alert("Terima kasih! Pesan Anda telah terkirim (fitur simulasi).");
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="content">
          <div className="title" data-aos="fade-down" data-aos-delay="300">
            <h2>LET'S</h2>
            <h1>CONNECT</h1>
          </div>

          <div className="contact-area">
            <div data-aos="fade-right" data-aos-delay="300" className="left-side">
              <h1>LET'S START</h1>
              <h1>OUR STORY</h1>
              <h1>TOGETHER</h1>
            </div>

            <div className="right-side">
              <form onSubmit={handleSubmit} data-aos="fade-left" data-aos-delay="500">
                <input type="text" placeholder="YOUR NAME" required />
                <input type="email" placeholder="YOUR EMAIL ADDRESS" required />
                <textarea placeholder="WHAT CAN I HELP FOR YOU?" required></textarea>
                <button type="submit">SEND</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
