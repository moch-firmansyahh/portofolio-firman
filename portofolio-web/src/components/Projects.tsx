"use client";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="project" id="project">
      <div className="container">
        <div className="content">
          <div className="header">
            <button data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
              See All Projects <i className="bx bx-arrow-back arrow" style={{ transform: "rotate(180deg)", display: "inline-block", marginLeft: "5px" }}></i>
            </button>

            <div className="title">
              <h1 className="row-1" data-aos="fade-left" data-aos-duration="500" data-aos-delay="300">
                <hr /> Recent
              </h1>
              <h1 className="row-2" data-aos="fade-left" data-aos-duration="500" data-aos-delay="500">
                PROJECTS
              </h1>
            </div>
          </div>

          <div className="project-area" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            {projects.map((project) => (
              <a 
                href={project.link} 
                key={project.id} 
                className="projects"
                target={project.link !== "#" ? "_blank" : undefined}
                rel={project.link !== "#" ? "noopener noreferrer" : undefined}
                style={{ display: "block", color: "inherit", textDecoration: "none" }}
              >
                <img 
                  src={project.image || "/assets/portofolio.png"} 
                  alt={project.title} 
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null;
                    img.src = "/assets/portofolio.png";
                  }}
                />
                <div className="desc">
                  <h1>{project.title}</h1>
                  <p>{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
