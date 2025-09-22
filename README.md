# StudyTracker 📚

A modern, full-stack student planner application that helps students organize their courses, track assignments, and manage their academic schedule efficiently.

## 🌟 Features

### Core Functionality
- **Course Management**: Create and organize courses with color-coded identification
- **Assignment Tracking**: Add, edit, and track assignments with due dates and completion status
- **Smart Dashboard**: Real-time statistics and overview of academic progress
- **Interactive Calendar**: Visual calendar interface for scheduling and planning
- **Task Status Management**: Automatic categorization (Pending, Overdue, Due Soon, Completed)

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Material-UI Components**: Modern, accessible, and intuitive interface
- **Real-time Updates**: Instant feedback and status updates
- **Data Persistence**: Secure local storage with JWT authentication

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Material-UI (MUI)** - Comprehensive React component library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **JWT Decode** - Token management and authentication

### Backend
- **Django 5.2** - High-level Python web framework
- **Django REST Framework** - Powerful toolkit for building Web APIs
- **PostgreSQL** - Advanced open-source relational database
- **JWT Authentication** - Secure token-based authentication
- **CORS Headers** - Cross-origin resource sharing support

### DevOps & Deployment
- **Render** - Cloud platform for deployment
- **WhiteNoise** - Static file serving for Django
- **Gunicorn** - Python WSGI HTTP Server
- **Environment Variables** - Secure configuration management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- PostgreSQL
- Git

### Backend Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd studytracker/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 📱 Screenshots & Demo

### Dashboard Overview
- Real-time statistics showing total courses, pending assignments, and completion rates
- Quick access to all major features
- Responsive grid layout adapting to screen size

<img width="1901" height="938" alt="image" src="https://github.com/user-attachments/assets/f4f17b73-0f23-448f-91d0-daac3c5f7d73" />


### Course Management
- Add, edit, and delete courses with unique color identification
- Validation to prevent duplicate course codes
- Clean, card-based interface

<img width="1917" height="944" alt="image" src="https://github.com/user-attachments/assets/0f7baa89-5d75-483f-886d-358c212df5f0" />


### Assignment Tracking
- Comprehensive assignment creation with course association
- Due date tracking with automatic status updates
- Checkbox completion with visual feedback
- Priority-based color coding (Overdue: Red, Due Soon: Orange, Normal: Blue, Completed: Green)

<img width="1914" height="939" alt="image" src="https://github.com/user-attachments/assets/691322f8-786a-4bff-86f0-4807faeedf99" />


## 🔧 Key Technical Implementations

### Authentication System
```python
# Custom User Model with email as primary identifier
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
```

### JWT Token Management
- Automatic token refresh on expiration
- Secure token storage and validation
- Protected routes with authentication middleware

### Responsive Design Patterns
```jsx
// Mobile-first responsive design
const isSmallMobile = useMediaQuery('(max-width:600px)');
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// Conditional rendering based on screen size
{isSmallMobile ? 'Add' : 'Add Assignment'}
```

### State Management
- React Hooks for local state management
- Centralized data flow between components
- Real-time UI updates with optimistic rendering

## 🏗️ Architecture

### Project Structure
```
studytracker/
├── backend/
│   ├── api/                 # Django app
│   │   ├── models.py       # Data models
│   │   ├── views.py        # API endpoints
│   │   ├── serializers.py  # Data serialization
│   │   └── urls.py         # URL routing
│   ├── backend/            # Django project settings
│   └── requirements.txt    # Python dependencies
└── frontend/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── utils/         # Utility functions
    │   └── assets/        # Static assets
    ├── public/            # Public assets
    └── package.json       # Node.js dependencies
```

### Database Schema
- **CustomUser**: Extended Django user model with email authentication
- **Courses**: Course information with color coding
- **Assignments**: Task management with status tracking and course relationships

### API Endpoints
- `POST /api/signup/` - User registration
- `POST /api/login/` - User authentication
- `POST /api/token/refresh/` - Token refresh

## 🔒 Security Features
- JWT Authentication with automatic token refresh
- CSRF Protection enabled for form submissions
- CORS Configuration for secure cross-origin requests
- Input Validation on both client and server side
- Environment Variables for sensitive configuration

## 🚀 Deployment

### Backend Deployment (Render)
- Automatic deployments from Git repository
- PostgreSQL database integration
- Environment variable management
- Static file serving with WhiteNoise

### Frontend Deployment (Render)
- Optimized production build
- Client-side routing support with _redirects file
- Environment variable configuration

<a href = "https://planner-2-hl7k.onrender.com/">Website available here</a>

## 📝 Future Enhancements
- [ ] Email notifications for upcoming deadlines
- [ ] File attachment support for assignments
- [ ] Collaboration features for group projects
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Integration with popular calendar services
- [ ] Dark mode support
- [ ] Offline functionality with PWA

## 👨‍💻 Developer
**Your Name**

- **LinkedIn**: https://www.linkedin.com/in/abdu1lah
- **GitHub**: https:/www.github.com/adbu1lah-a
- **Email**: abdullah.arif@dal.ca

---

Built with ❤️ for students who want to stay organized and succeed in their academic journey.
