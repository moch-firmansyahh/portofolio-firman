import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LearnMore() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "12vh" }}>
        <section className="learn-more-section">
          <div className="container">
            <div className="content">
              <div className="title">
                <h2 data-aos="fade-right" data-aos-delay="200">
                  About Me
                  <hr />
                </h2>
                <h1 data-aos="fade-right" data-aos-delay="350">More Details</h1>
              </div>

              <div className="learn-grid">
                <article className="learn-card" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon">
                    <i className="bx bxs-briefcase" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h3>Pengalaman</h3>
                  <p>
                    1 tahun belajar coding dan mengikuti beberapa bootcamp online,
                    Mencoba belajar melalui beberapa website code untuk melatih
                    logika.
                  </p>
                </article>

                <article className="learn-card" data-aos="fade-up" data-aos-delay="450">
                  <div className="icon">
                    <i className="bx bxs-code-alt" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h3>Skills & Tools</h3>
                  <p>HTML, CSS, JavaScript, React, C++, Figma, Canva, Golang.</p>
                </article>

                <article className="learn-card" data-aos="fade-up" data-aos-delay="600">
                  <div className="icon">
                    <i className="bx bxs-cog" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h3>Pendidikan</h3>
                  <p>
                    Lulusan MAN 1 Sumedang, Jurusan IPA, sekarang sedang berkuliah
                    di Telkom University Jurusan Teknik Informatika.
                  </p>
                </article>

                <article className="learn-card" data-aos="fade-up" data-aos-delay="750">
                  <div className="icon">
                    <i className="bx bxs-chat" style={{ fontSize: "2.5rem" }}></i>
                  </div>
                  <h3>Soft Skills</h3>
                  <p>
                    Teamwork, Problem Solving, Critical Thinking, Time Management,
                    Adaptability.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
