# Full-Stack Portfolio with Authentication

A modern portfolio website with admin dashboard, built with React (frontend) and Node.js/Express (backend).

## 🚀 Features

- 🔐 JWT-based authentication (Admin & Visitor roles)
- 📊 Admin dashboard to manage projects
- 🎨 Animated UI with smooth transitions
- 📱 Responsive design
- 🔒 Role-based access control
- 📧 Contact form with EmailJS
- 🔑 Secure password hashing with bcrypt

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router DOM
- SCSS
- FontAwesome Icons
- Animate.css
- EmailJS

**Backend:**
- Node.js & Express
- JWT (jsonwebtoken)
- bcrypt for password hashing
- CORS enabled
- File-based JSON storage

## 📁 Project Structure

```
Portefolio/
├── src/                          # Frontend React app
│   ├── components/
│   │   ├── Home/                # Landing page with animations
│   │   ├── About/               # About section
│   │   ├── Portfolio/           # Projects display
│   │   ├── Contact/             # Contact form
│   │   ├── Dashboard/           # Admin panel (protected)
│   │   ├── Login/               # Authentication page
│   │   └── Sidebar/             # Navigation menu
│   ├── utils/
│   │   └── ProtectedRoute.js    # Route protection HOC
│   └── App.js                   # Main app with routes
│
├── portefolio-backend/           # Backend API
│   ├── controllers/
│   │   ├── authController.js    # Login & authentication
│   │   └── projectController.js # CRUD for projects
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── roleMiddleware.js    # Role-based access
│   ├── models/
│   │   └── userModel.js         # User data (hashed passwords)
│   ├── data/
│   │   └── projects.json        # Projects database (JSON)
│   └── server.js                # Express server
│
└── public/                       # Static assets
```

## ⚙️ Installation

### Prerequisites
- Node.js v14 or higher
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend folder
cd portefolio-backend

# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
# From root folder
npm install

# Start React app
npm start

# App runs on http://localhost:3000
```

## 🔐 Environment Variables

### Backend `.env` File
Create `portefolio-backend/.env`:

```env
PORT=5000
JWT_SECRET=super-secret-jwt-key-change-this-in-production-12345
NODE_ENV=development
```

### Frontend `.env` File
Create `.env` in root folder:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 👤 User Credentials

### Admin Account
- **Email:** `admin@local`
- **Password:** `admin123`
- **Access:** Full dashboard + CRUD operations on projects

### Visitor Account
- **Email:** `visitor@local`
- **Password:** `visitor123`
- **Access:** View portfolio only (no dashboard access)

## 📡 API Endpoints

### Authentication
- `POST /auth/login` - User login (returns JWT token)
- `GET /auth/me` - Get current user info (protected)

### Projects
- `GET /projects` - Get all projects (public)
- `POST /projects` - Create new project (admin only)
- `DELETE /projects/:id` - Delete project (admin only)
- `GET /projects/dashboard` - Get dashboard stats (protected)

## ✅ Features Checklist

- [x] JWT-based authentication with token expiration
- [x] Role-based authorization (admin/visitor)
- [x] Password hashing with bcrypt (10 rounds)
- [x] Protected routes (frontend & backend)
- [x] RESTful API design
- [x] Dynamic project management
- [x] Responsive UI with animations
- [x] Clear modular code structure
- [x] CORS configuration
- [x] Environment variables for secrets

## 🔒 Security Features

- **JWT Tokens:** Expire after 24 hours
- **bcrypt:** Password hashing with 10 salt rounds
- **Middleware Protection:** All sensitive routes protected
- **Role-Based Access Control:** Admin-only endpoints
- **CORS Configuration:** Controlled cross-origin requests
- **Environment Variables:** Secrets stored securely

## 🚀 Usage

### Adding a New Project (Admin)

1. Login with admin credentials
2. Navigate to Dashboard (`/dashboard`)
3. Click **"+ Add New Project"**
4. Fill in:
   - **Title:** Project name
   - **Description:** Brief description
   - **Image URL:** Screenshot URL (use imgur.com)
   - **Project URL:** GitHub repo or live demo
5. Click **"Add Project"**
6. Project appears in Portfolio section

### Viewing Portfolio (Visitor)

1. Login with visitor credentials
2. Navigate through Home, About, Portfolio, Contact
3. Dashboard is hidden (admin-only)

## 📦 Deployment

### Frontend (Vercel/Netlify)
1. Build production version: `npm run build`
2. Deploy `build/` folder
3. Update `REACT_APP_API_URL` to production backend URL

### Backend (Heroku/Railway)
1. Set environment variables in hosting platform
2. Use strong `JWT_SECRET` in production
3. Replace JSON file storage with MongoDB/PostgreSQL
4. Enable HTTPS

## 🔄 Future Improvements

- [ ] Replace JSON storage with MongoDB
- [ ] Add image upload functionality
- [ ] Implement password reset via email
- [ ] Add project categories/tags
- [ ] Implement search and filter for projects
- [ ] Add unit tests
- [ ] Implement rate limiting

## 📄 License

MIT License

## 👨‍💻 Author

**João Oliveira**
- GitHub: [@joaoliveira12345](https://github.com/joaoliveira12345)
- LinkedIn: [João Oliveira](https://www.linkedin.com/in/joão-oliveira-303102309)

---

**Built with ❤️ for Full-Stack Integration Exercise**

4. **Save the file** (Ctrl+S)

---

## **STEP 7: Create .gitignore File**

### **File to Create:** `c:\Users\Joaol\OneDrive\Ambiente de Trabalho\Projetos\Portefolio\.gitignore`

**Instructions:**
1. Check if `.gitignore` already exists in root folder
2. If it **exists**, open it and **append** this content
3. If it **doesn't exist**, create new file named `.gitignore` and paste:

````gitignore
# Dependencies
node_modules/
portefolio-backend/node_modules/

# Environment Variables
.env
.env.local
.env.development
.env.production
portefolio-backend/.env

# Build Output
build/
dist/
*.tsbuildinfo

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS Files
.DS_Store
Thumbs.db
desktop.ini

# Testing
coverage/
.nyc_output/

# Misc
.cache/
.temp/
````
