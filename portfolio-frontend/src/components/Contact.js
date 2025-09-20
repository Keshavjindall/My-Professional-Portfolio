import React, { useState } from 'react';
import './Contact.css';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.error('Form submission error:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  if (!data) return null;

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss your next project</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <span>📧</span>
              </div>
              <h3>Email</h3>
              <p>Drop me a line anytime</p>
              <a href={`mailto:${data.email}`} className="contact-link">
                {data.email}
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <span>📱</span>
              </div>
              <h3>Phone</h3>
              <p>Let's have a chat</p>
              <a href="tel:+918307112024" className="contact-link">
                +91 8307112024
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <span>📍</span>
              </div>
              <h3>Location</h3>
              <p>Based in {data.location}</p>
              <span className="contact-text">
                {data.location}
              </span>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>📤</span>
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="form-message success">
                  <span>✅</span>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-message error">
                  <span>❌</span>
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="contact-social">
          <h3>Follow Me</h3>
          <div className="social-links">
            <a href="https://github.com/Keshavjindall" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>🐙</span>
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/keshavjindal14/" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>💼</span>
              <span>LinkedIn</span>
            </a>
            <a href="https://x.com/Keshav_jindal14" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>🐦</span>
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
