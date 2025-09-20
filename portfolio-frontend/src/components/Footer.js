import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Keshav Jindal</h3>
              <p>Software Development Engineer</p>
            </div>
            <p className="footer-description">
              Passionate about creating exceptional digital experiences through clean code and innovative solutions.
            </p>
            <div className="footer-social">
              <a href="https://github.com/Keshavjindall" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <span>🐙</span>
              </a>
              <a href="https://www.linkedin.com/in/keshavjindal14/" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="https://x.com/Keshav_jindal14" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="mailto:keshavjindal1411@gmail.com" className="social-icon" aria-label="Email">
                <span>📧</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li>Web Development</li>
              <li>Mobile Development</li>
              <li>UI/UX Design</li>
              <li>Consulting</li>
              <li>Code Review</li>
              <li>Performance Optimization</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span>📍</span>
                <span>Bangalore, India</span>
              </div>
              <div className="contact-item">
                <span>📧</span>
                <span>keshavjindal1411@gmail.com</span>
              </div>
              <div className="contact-item">
                <span>📱</span>
                <span>+91 8307112024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Keshav Jindal. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
                <span>⬆️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
