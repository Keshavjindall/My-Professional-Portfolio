import React from 'react';
import './Experience.css';

const Experience = ({ data }) => {
  if (!data) return null;

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>

        <div className="experience-timeline">
          {data.map((exp, index) => (
            <div key={exp.id} className="timeline-item" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                {index < data.length - 1 && <div className="marker-line"></div>}
              </div>

              <div className="timeline-content">
                <div className="experience-card">
                  <div className="card-header">
                    <div className="company-info">
                      <h3 className="company-name">{exp.company}</h3>
                      <div className="company-location">{exp.location}</div>
                      <div className="position-duration">
                        <span className="position">{exp.position}</span>
                        <span className="duration">{exp.duration}</span>
                      </div>
                    </div>
                    <div className="company-logo">
                      <div className="logo-placeholder">
                        <span>{exp.company.charAt(0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <p className="experience-description">
                      {exp.description}
                    </p>

                    <div className="experience-highlights">
                      <h4>Key Achievements:</h4>
                      <ul>
                        {exp.achievements && exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="tech-stack">
                      <span className="tech-label">Technologies:</span>
                      <div className="tech-tags">
                        {exp.technologies && exp.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="experience-summary">
          <div className="summary-content">
            <h3>Let's Work Together</h3>
            <p>
              I'm always interested in new opportunities and exciting projects.
              Whether you're looking for a full-time position, freelance work, or just want to chat about technology,
              I'd love to hear from you.
            </p>
            <a href="#contact" className="btn btn-primary">
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
