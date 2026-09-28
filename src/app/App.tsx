import { ChatProvider } from "./bot/ChatContext";
import { ChatLauncher } from "./components/ChatLauncher";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero, HERO_CHAT_ID } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Stack } from "./components/Stack";

export default function App() {
  return (
    <ChatProvider>
      <Navigation />
      <main id="main">
        <Hero />
        <Projects />
        <Services />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <ChatLauncher heroChatId={HERO_CHAT_ID} />
    </ChatProvider>
  );
}
