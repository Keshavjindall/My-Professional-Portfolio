const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.error('MongoDB Atlas connection error:', err));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// Portfolio data routes
app.get('/api/portfolio', (req, res) => {
  // This would typically fetch from database
  const portfolioData = {
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
  };

  res.json(portfolioData);
});

// Contact form API endpoints
// POST - Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save to database
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Error saving contact:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// GET - Retrieve all contact submissions (for admin use)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 contacts

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// GET - Get contact statistics
app.get('/api/contacts/stats', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const unreadContacts = await Contact.countDocuments({ status: 'unread' });
    const readContacts = await Contact.countDocuments({ status: 'read' });
    const repliedContacts = await Contact.countDocuments({ status: 'replied' });

    res.json({
      success: true,
      data: {
        total: totalContacts,
        unread: unreadContacts,
        read: readContacts,
        replied: repliedContacts
      }
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
