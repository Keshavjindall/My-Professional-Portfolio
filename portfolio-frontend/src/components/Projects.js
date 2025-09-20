import React, { useState } from 'react';
import './Projects.css';

const Projects = ({ data }) => {
  const [filter, setFilter] = useState('all');

  if (!data) return null;

  const categories = ['all', ...new Set(data.flatMap(project => project.technologies))];

  const filteredProjects = filter === 'all'
    ? data
    : data.filter(project => project.technologies.includes(filter));

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Some of my recent work</p>
        </div>

        <div className="projects-filter">
          <div className="filter-buttons">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="project-card" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="project-image">
                <div className="image-placeholder">
                  <span>🚀</span>
                </div>
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                      <span>📁</span>
                      <span>Code</span>
                    </a>
                    <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                      <span>🌐</span>
                      <span>Live</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-technologies">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-tag more">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-footer">
                  <div className="project-links-mobile">
                    <a href={project.githubUrl} className="btn-link" target="_blank" rel="noopener noreferrer">
                      View Code
                    </a>
                    <a href={project.liveUrl} className="btn-link primary" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <div className="cta-content">
            <h3>Interested in working together?</h3>
            <p>I'm always open to discussing new opportunities and interesting projects.</p>
            <a href="#contact" className="btn btn-primary">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
