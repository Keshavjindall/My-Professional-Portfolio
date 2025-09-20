import React from 'react';
import './Skills.css';

const Skills = ({ data }) => {
  if (!data) return null;

  const skillLevels = {
    'Expert': { percentage: 90, color: '#10b981' },
    'Advanced': { percentage: 75, color: '#3b82f6' },
    'Intermediate': { percentage: 60, color: '#f59e0b' },
    'Beginner': { percentage: 40, color: '#ef4444' }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Programming Languages': '💻',
      'Frontend Development': '🎨',
      'Backend Development': '⚙️',
      'Databases': '🗄️',
      'Cloud & DevOps': '☁️',
      'Tools & APIs': '🛠️',
      'Data Visualization & Analytics': '📊'
    };
    return iconMap[category] || '🔧';
  };

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="section-header">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>

        <div className="skills-grid">
          {data.map((category, index) => (
            <div key={index} className="skill-category" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="category-header">
                <h3 className="category-title">{category.category}</h3>
                <div className="category-icon">
                  {getCategoryIcon(category.category)}
                </div>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill}</span>
                      <div className="skill-bar">
                        <div
                          className="skill-progress"
                          style={{
                            width: `${skillLevels['Expert'].percentage}%`,
                            backgroundColor: skillLevels['Expert'].color
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="skill-percentage">
                      {skillLevels['Expert'].percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-visual">
          <div className="tech-stack">
            <h3>Tech Stack Overview</h3>
            <div className="tech-icons">
              <div className="tech-icon-group">
                <div className="tech-icon">💻</div>
                <span>Java</span>
              </div>
              <div className="tech-icon-group">
                <div className="tech-icon">⚛️</div>
                <span>React</span>
              </div>
              <div className="tech-icon-group">
                <div className="tech-icon">🟢</div>
                <span>Node.js</span>
              </div>
              <div className="tech-icon-group">
                <div className="tech-icon">🐍</div>
                <span>Python</span>
              </div>
              <div className="tech-icon-group">
                <div className="tech-icon">☁️</div>
                <span>AWS</span>
              </div>
              <div className="tech-icon-group">
                <div className="tech-icon">🐳</div>
                <span>Docker</span>
              </div>
              <div className="tech-icon-group">
                <div className="tech-icon">📊</div>
                <span>Tableau</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
