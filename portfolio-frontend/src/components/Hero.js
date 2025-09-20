import React from 'react';
import './Hero.css';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="hero-name">{data.name}</span>
            </h1>
            <h2 className="hero-subtitle">{data.title}</h2>
            <p className="hero-description">{data.bio}</p>

            <div className="hero-location">
              <span className="location-icon">📍</span>
              <span>{data.location}</span>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="profile-image">
              <img
                src={data.profileImage || "/profile_pic.jpg"}
                alt={`${data.name} - ${data.title}`}
                className="profile-photo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}}>
                <span>👨‍💻</span>
              </div>
            </div>
            <div className="floating-elements">
              <div className="floating-element element-1">⚛️</div>
              <div className="floating-element element-2">🚀</div>
              <div className="floating-element element-3">💡</div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
          <span>Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
