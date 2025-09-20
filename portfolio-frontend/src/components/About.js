import React from 'react';
import './About.css';

const About = ({ data }) => {
  if (!data) return null;

  const stats = [
    { number: '1+', label: 'Years Experience' },
    { number: '20+', label: 'Projects Completed' },
    { number: '20+', label: 'Technologies' },
    { number: '100%', label: 'Client Satisfaction' }
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know more about my journey</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <h3>Hi there! I'm {data.name.split(' ')[0]}</h3>
              <p className="intro-text">
                {data.bio}
              </p>
            </div>

            <div className="about-details">
              <div className="detail-item">
                <span className="detail-icon">🎯</span>
                <div>
                  <h4>Passion</h4>
                  <p>Building scalable solutions that make a real impact</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">🚀</span>
                <div>
                  <h4>Focus</h4>
                  <p>Full-stack development with modern technologies</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">💡</span>
                <div>
                  <h4>Approach</h4>
                  <p>Clean code, best practices, and continuous learning</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-visual">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="about-image">
              <div className="image-container">
                <div className="floating-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
                <div className="profile-card">
                  <div className="card-header">
                    <span className="status-indicator"></span>
                    <span>Available for opportunities</span>
                  </div>
                  <div className="card-content">
                    <h4>{data.name}</h4>
                    <p>{data.title}</p>
                    <div className="contact-info">
                      <span>📧 {data.email}</span>
                      <span>📱 {data.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
