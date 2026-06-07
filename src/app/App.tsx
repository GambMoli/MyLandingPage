import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Metrics } from "./components/Metrics";
import { Navigation } from "./components/Navigation";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";

export default function App() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Services />
      <Metrics />
      <Contact />
      <Footer />
    </div>
  );
}
