import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading portfolio data
    const loadPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const data = await response.json();
          setPortfolioData(data);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Fallback data
        setPortfolioData({
          personalInfo: {
            name: "Keshav Jindal",
            title: "Software Development Engineer",
            email: "keshavjindal1411@gmail.com",
            phone: "+91 8307112024",
            location: "Bangalore, India",
            bio: "Passionate Software Developer with 1+ years of experience in web and mobile application development. Skilled in Java, MERN stack, and cloud technologies, with a proven ability to deliver scalable and user-centric solutions.",
            github: "https://github.com/Keshavjindall",
            linkedin: "https://www.linkedin.com/in/keshavjindal14/",
            twitter: "https://x.com/Keshav_jindal14",
            profileImage: "http://localhost:3000/profile_pic.jpg"
          },
          skills: [
            {
              category: "Programming Languages",
              skills: ["C", "Java", "Python", "Dart", "Kotlin", "R", "Go", "Rust", "C#"]
            },
            {
              category: "Frontend Development",
              skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Angular", "Vue.js", "Next.js", "Tailwind CSS"]
            },
            {
              category: "Backend Development",
              skills: ["Node.js", "Express.js", "Spring Boot", ".NET"]
            },
            {
              category: "Databases",
              skills: ["MySQL", "MongoDB", "PostgreSQL"]
            },
            {
              category: "Cloud & DevOps",
              skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Git", "GitHub"]
            },
            {
              category: "Tools & APIs",
              skills: ["Postman", "Figma", "AutoCAD"]
            },
            {
              category: "Data Visualization & Analytics",
              skills: ["Tableau", "Power BI"]
            }
          ],
          projects: [
            {
              id: 1,
              title: "E-commerce Platform",
              description: "Full-stack e-commerce solution with React frontend, Node.js backend, and PostgreSQL database. Features include user authentication, payment processing, and admin dashboard.",
              technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
              githubUrl: "https://github.com/Keshavjindall/ecommerce-platform",
              liveUrl: "https://ecommerce-demo.keshavjindal.dev",
              image: "/api/placeholder/400/300"
            },
            {
              id: 2,
              title: "Task Management App",
              description: "Collaborative task management application with real-time updates, team workspaces, and advanced filtering capabilities.",
              technologies: ["React", "Socket.io", "MongoDB", "Express", "Material-UI"],
              githubUrl: "https://github.com/Keshavjindall/task-manager",
              liveUrl: "https://tasks.keshavjindal.dev",
              image: "/api/placeholder/400/300"
            },
            {
              id: 3,
              title: "Weather Analytics Dashboard",
              description: "Real-time weather analytics dashboard with interactive charts, location-based forecasts, and historical data analysis.",
              technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "Redis"],
              githubUrl: "https://github.com/Keshavjindall/weather-analytics",
              liveUrl: "https://weather.keshavjindal.dev",
              image: "/api/placeholder/400/300"
            }
          ],
          experience: [
            {
              id: 1,
              company: "EAZYBYTS",
              location: "Uttar Pradesh, India",
              position: "Full Stack Web Developer Intern",
              duration: "Jun 2024 – Jun 2024",
              description: "Contributed to full-stack development by building and maintaining web solutions",
              achievements: [
                "Delivered a responsive portfolio website and an expense tracker application",
                "Contributed to full-stack development by building and maintaining web solutions"
              ],
              technologies: ["React.js", "Node.js"]
            },
            {
              id: 2,
              company: "UPTOSKILLS",
              location: "Delhi, India",
              position: "Android Application Development Intern",
              duration: "Jan 2025 – Apr 2025",
              description: "Developed and deployed Android applications in collaboration with an agile team",
              achievements: [
                "Developed and deployed two Android applications in collaboration with an agile team",
                "Built a learning-focused leave management app and a client-facing driver ticket booking platform"
              ],
              technologies: ["Flutter (Dart)", "Firebase"]
            }
          ]
        });
      }
      setIsLoading(false);
    };

    // Simulate loading delay
    setTimeout(loadPortfolioData, 2000);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero data={portfolioData?.personalInfo} />
        <About data={portfolioData?.personalInfo} />
        <Skills data={portfolioData?.skills} />
        <Projects data={portfolioData?.projects} />
        <Experience data={portfolioData?.experience} />
        <Contact data={portfolioData?.personalInfo} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
