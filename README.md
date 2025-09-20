# Professional Portfolio Website

A modern, responsive portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a clean design, smooth animations, and professional layout suitable for Software Development Engineers.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- **Interactive**: Smooth micro-interactions and hover effects
- **Professional**: Tailored for Software Development Engineers
- **Profile Integration**: Displays professional information and profile picture
- **Skills Showcase**: Organized skill categories with visual representation
- **Project Portfolio**: Showcase your projects with descriptions and links
- **Experience Timeline**: Professional experience with detailed descriptions
- **Contact Information**: Easy way for potential employers to reach you
- **Contact Form**: Functional contact form that saves messages to MongoDB
- **Admin Dashboard**: API endpoints to view contact submissions and statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **CSS3** - Custom styling with animations
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Security** - Helmet, CORS, Rate limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for database)
- Git (for version control)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd <project-directory>
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd portfolio-frontend
npm install
cd ..
```

### 3. Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Copy `.env.example` to `.env`
6. Replace `MONGODB_URI` with your actual connection string

### 4. Configure Environment Variables

Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 5. Run the Application

```bash
# Start backend server (Terminal 1)
npm start

# Start frontend development server (Terminal 2)
cd portfolio-frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/portfolio

## 📁 Project Structure

```
portfolio-website/
├── portfolio-frontend/          # React frontend
│   ├── public/
│   │   ├── profile_pic.jpg     # Your profile picture
│   │   └── ...
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── App.js             # Main app component
│   │   └── ...
│   └── package.json
├── models/                     # MongoDB models
│   └── Contact.js             # Contact form schema
├── server.js                   # Express server
├── package.json               # Backend dependencies
├── .env.example              # Environment variables template
└── README.md
```

## 🎨 Customization

### Profile Information
Edit the portfolio data in `server.js` in the `/api/portfolio` route to update:
- Personal information (name, title, contact details)
- Skills and technologies
- Projects with descriptions and links
- Work experience

### Styling
- Main styles are in `portfolio-frontend/src/App.css`
- Component-specific styles are in their respective CSS files
- Colors and animations can be customized in the CSS files

### Profile Picture
- Add your profile picture as `profile_pic.jpg` in `portfolio-frontend/public/`
- The image will automatically appear in the Hero section

## 🚀 Deployment

### GitHub Setup
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Professional portfolio website"

# Create GitHub repository and push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Vercel Deployment
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Set build settings:
   - **Build Command**: `cd portfolio-frontend && npm run build`
   - **Output Directory**: `portfolio-frontend/build`
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI` (your MongoDB Atlas connection string)
   - `NODE_ENV=production`
4. Deploy!

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large screens**: 1440px and up

## 🔧 Development

### Available Scripts

#### Backend
- `npm start` - Start the Express server
- `npm run dev` - Start with nodemon (if configured)

#### Frontend
- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### API Endpoints

#### Portfolio Endpoints
- `GET /api/health` - Health check
- `GET /api/portfolio` - Get portfolio data

#### Contact Form Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions (admin)
- `GET /api/contacts/stats` - Get contact statistics (admin)

### Contact Form Data Structure
The contact form saves the following data to MongoDB:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "status": "unread"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support, please contact:
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)

---

**Built with ❤️ using MERN Stack**
