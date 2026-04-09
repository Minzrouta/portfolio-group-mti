import './index.css';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <main>
      <Hero />
      <TeamSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
