import React from 'react';
import './Navigation.css';

const Navigation = ({ darkMode, toggleDarkMode }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>Keshav Jindal</h2>
        </div>

        <ul className="nav-menu" role="menubar">
          <li role="none">
            <button
              className="nav-link"
              onClick={() => scrollToSection('hero')}
              role="menuitem"
              aria-label="Go to home section"
            >
              Home
            </button>
          </li>
          <li role="none">
            <button
              className="nav-link"
              onClick={() => scrollToSection('about')}
              role="menuitem"
              aria-label="Go to about section"
            >
              About
            </button>
          </li>
          <li role="none">
            <button
              className="nav-link"
              onClick={() => scrollToSection('skills')}
              role="menuitem"
              aria-label="Go to skills section"
            >
              Skills
            </button>
          </li>
          <li role="none">
            <button
              className="nav-link"
              onClick={() => scrollToSection('projects')}
              role="menuitem"
              aria-label="Go to projects section"
            >
              Projects
            </button>
          </li>
          <li role="none">
            <button
              className="nav-link"
              onClick={() => scrollToSection('experience')}
              role="menuitem"
              aria-label="Go to experience section"
            >
              Experience
            </button>
          </li>
          <li role="none">
            <button
              className="nav-link"
              onClick={() => scrollToSection('contact')}
              role="menuitem"
              aria-label="Go to contact section"
            >
              Contact
            </button>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            className={`theme-toggle ${darkMode ? 'active' : ''}`}
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded="false"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
