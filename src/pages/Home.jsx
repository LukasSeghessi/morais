import Hero from "../components/Hero";
import Reference from "../components/Reference";
import About from "../components/About";
import Services from "../components/Services";
import Solutions from "../components/Solutions";
import ProjectsBanner from "../components/ProjectsBanner";
import FlipCards from "../components/FlipCards";
import "../styles/variables.css";

export default function Home() {
  return (
    <main>
      <Hero />
      <Reference />
      <About />
      <Services />
      <Solutions />
      <FlipCards />
      <ProjectsBanner />
    </main>
  );
}