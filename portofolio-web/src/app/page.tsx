import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Force dynamic rendering to ensure updates from Firebase reflect instantly without caching
export const dynamic = "force-dynamic";

async function getPortfolioData() {
  try {
    // Fetch skills from Firestore
    const skillsSnapshot = await getDocs(collection(db, "skills"));
    const skillsData = skillsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        logo: data.logo || "",
        percent: data.percent || 0,
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt)) : new Date(0)
      };
    });
    skillsData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    // Fetch projects from Firestore
    const projectsSnapshot = await getDocs(collection(db, "projects"));
    const projectsData = projectsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        description: data.description || "",
        image: data.image || "",
        link: data.link || "",
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt)) : new Date(0)
      };
    });
    projectsData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return {
      skills: skillsData,
      projects: projectsData,
    };
  } catch (error) {
    console.warn("Error fetching portfolio data from Firebase:", (error as any)?.message || error);
    return { skills: [], projects: [] };
  }
}

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
