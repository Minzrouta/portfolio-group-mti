import projects from '../data/projects.json';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  return (
    <section className="section projects-section">
      <div className="section-inner">
        <h2>Nos projets</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
