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

// CORS configuration for Vercel deployment
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  process.env.NODE_ENV === 'production' ? 'https://keshavjindal-portfolio.vercel.app' : null
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked CORS request from origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
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

// MongoDB Atlas connection with retry logic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log('MongoDB Atlas connected successfully');
    console.log(`Connected to database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
};

// Connect to database
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// Database connection status endpoint
app.get('/api/db-status', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const dbStatus = {
    status: states[dbState] || 'unknown',
    readyState: dbState,
    name: mongoose.connection.name,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    environment: process.env.NODE_ENV || 'development',
    mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not Set',
    vercelUrl: process.env.VERCEL_URL || 'Not Set'
  };

  const isConnected = dbState === 1;
  res.json({
    success: isConnected,
    message: isConnected ? 'Database connected successfully' : 'Database connection issue',
    data: dbStatus
  });
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

    // Enhanced validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Trim whitespace from inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        message: 'All fields must contain valid content (no empty spaces only)'
      });
    }

    // Check database connection before attempting to save
    if (mongoose.connection.readyState !== 1) {
      console.error('Database not connected. Current state:', mongoose.connection.readyState);
      return res.status(503).json({
        success: false,
        message: 'Service temporarily unavailable. Please try again in a few moments.',
        error: 'Database connection issue'
      });
    }

    // Create new contact
    const contact = new Contact({
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage
    });

    // Save to database with timeout
    const savedContact = await Promise.race([
      contact.save(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database operation timeout')), 10000)
      )
    ]);

    console.log('Contact saved successfully:', savedContact._id);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        subject: savedContact.subject,
        createdAt: savedContact.createdAt
      }
    });
  } catch (error) {
    console.error('Error saving contact:', error);

    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Please check your input and try again.',
        errors
      });
    }

    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      return res.status(503).json({
        success: false,
        message: 'Unable to connect to database. Please try again later.',
        error: 'Database connection error'
      });
    }

    if (error.message === 'Database operation timeout') {
      return res.status(504).json({
        success: false,
        message: 'Request timed out. Please try again.',
        error: 'Operation timeout'
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
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
