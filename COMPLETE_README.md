# Finance Dashboard System

A complete, production-ready finance management application with a professional backend and modern frontend. The system provides role-based access control (RBAC), financial record management, user management, and comprehensive analytics.

## 📋 Project Overview

This is a full-stack application designed to manage financial records with different access levels for users based on their roles. It demonstrates best practices in:

- **Backend Architecture**: Express.js with MongoDB, Mongoose, and professional middleware patterns
- **Frontend Development**: React with TypeScript, Tailwind CSS, and modern state management
- **API Design**: RESTful API with comprehensive validation and error handling
- **Authentication**: JWT-based authentication with secure token management
- **Authorization**: Role-based access control (RBAC) with three distinct roles
- **Data Persistence**: MongoDB document database with optimized queries
- **Dashboard Analytics**: Real-time aggregation and visualization of financial data

## 🎯 Key Features

### Core Functionality
✅ User authentication (register/login with JWT)
✅ Role-based access control (Admin/Analyst/Viewer)
✅ Financial record management (Income/Expense transactions)
✅ User management system (admin only)
✅ Dashboard with KPI metrics and charts
✅ Advanced filtering and search on records
✅ Monthly trend analysis
✅ Category-wise spending breakdown
✅ Pagination and sorting
✅ Input validation and error handling

### Backend Features
✅ Express.js REST API
✅ MongoDB + Mongoose for data persistence
✅ JWT authentication with token expiration
✅ Comprehensive Joi schema validation
✅ Centralized error handling
✅ Rate limiting (300 requests per 15 minutes)
✅ Security headers via Helmet
✅ Swagger/OpenAPI documentation
✅ Request logging with Morgan
✅ Admin self-protection guards

### Frontend Features
✅ React 18 with TypeScript
✅ Modern responsive UI with Tailwind CSS
✅ React Router v6 navigation
✅ React Query for server state management
✅ Zustand for authentication state
✅ React Hook Form with Zod validation
✅ Interactive charts with Recharts
✅ Real-time data synchronization
✅ Automatic token refresh and error handling
✅ Mobile-friendly responsive design

## 📁 Project Structure

```
finance-dashboard-system/
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── config/            # Database and Swagger config
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API route definitions
│   │   ├── services/          # Business logic
│   │   ├── validators/        # Joi schemas
│   │   ├── utils/             # Helper functions
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Server entry point
│   ├── .env.example           # Environment template
│   ├── package.json           # Dependencies
│   └── README.md              # Backend documentation
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   ├── store/             # Zustand stores
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Utilities and constants
│   │   ├── types.ts           # TypeScript types
│   │   ├── App.tsx            # App routing
│   │   └── main.tsx           # React entry point
│   ├── index.html             # HTML template
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   ├── package.json           # Dependencies
│   └── README.md              # Frontend documentation
│
├── docs/                      # Documentation
│   ├── ARCHITECTURE_NOTES.md  # Technical architecture
│   └── API.postman_collection.json  # API testing
│
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **MongoDB**: v5.0 or higher (local installation or MongoDB Atlas connection string)
- **Git**: For version control

### Step 1: Backend Setup

1. **Clone and navigate to backend**
   ```bash
   cd finance\ dashboard\ system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your MongoDB connection:
   ```
   PORT=4000
   MONGODB_URI=mongodb://127.0.0.1:27017/finance_dashboard
   JWT_SECRET=your-secret-key-change-me
   JWT_EXPIRES_IN=8h
   NODE_ENV=development
   ```

4. **Start MongoDB** (if running locally)
   
   **Windows (PowerShell as Admin):**
   ```powershell
   # Install MongoDB via winget if not already installed
   winget install MongoDB.Server
   
   # Start MongoDB service
   Start-Service -Name MongoDB
   net start MongoDB
   ```
   
   **macOS:**
   ```bash
   brew services start mongodb-community
   ```
   
   **Linux (Ubuntu):**
   ```bash
   sudo systemctl start mongodb
   ```

5. **Start the backend server**
   ```bash
   npm run start
   ```
   
   Expected output:
   ```
   Finance backend listening on port 4000
   MongoDB connected successfully
   ```

6. **Verify backend is running**
   
   In a new terminal:
   ```bash
   curl http://localhost:4000/health
   # Expected response: {"status":"ok"}
   ```

### Step 2: Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Verify API URL:
   ```
   VITE_API_URL=http://localhost:4000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app opens at http://localhost:3000

### Step 3: Test the Application

#### Demo Credentials (After First Register)

Create your first admin user:
```bash
# In PowerShell terminal
$body = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "Password@123"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:4000/auth/register" `
  -ContentType "application/json" -Body $body
```

Then login with these credentials in the frontend at http://localhost:3000/login

## 🔑 User Roles and Permissions

### Admin
- **Access**: Full system access
- **Capabilities**: 
  - Create, read, update, delete financial records
  - Manage users (create, update, delete)
  - View analytics and dashboard
  - Cannot delete their own account

### Analyst
- **Access**: Read-only for records and dashboard
- **Capabilities**:
  - View financial records
  - View analytics and dashboard
  - View user list (read-only)

### Viewer
- **Access**: Dashboard and analytics only
- **Capabilities**:
  - View dashboard summary
  - View analytics charts
  - Cannot access detailed records or user management

## 📊 API Endpoints

All endpoints require JWT authentication (except `/auth/register` and `/auth/login`)

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Login and get JWT token

### Records
- `GET /records` - List all records (with filtering)
- `GET /records/:id` - Get record details
- `POST /records` - Create new record (admin only)
- `PATCH /records/:id` - Update record (admin only)
- `DELETE /records/:id` - Delete record (admin only)

### Users
- `GET /users` - List all users (admin only)
- `POST /users` - Create new user (admin only)
- `PATCH /users/:id` - Update user (admin only)
- `DELETE /users/:id` - Delete user (admin only)

### Dashboard Analytics
- `GET /dashboard/summary` - Get KPI metrics
- `GET /dashboard/category-totals` - Get spending by category
- `GET /dashboard/monthly-trends` - Get monthly trends
- `GET /dashboard/recent-activity` - Get recent transactions

### System
- `GET /health` - Health check endpoint
- `GET /api/docs` - Swagger API documentation

For complete API documentation, start the backend and visit:
http://localhost:4000/api/docs

## 🔌 API Request Examples

### Register New User
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Create Financial Record (requires Bearer token)
```bash
curl -X POST http://localhost:4000/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "amount": 150.00,
    "type": "income",
    "category": "Salary",
    "date": "2026-04-02",
    "notes": "Monthly salary"
  }'
```

### Get Dashboard Summary
```bash
curl -X GET http://localhost:4000/dashboard/summary \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🛠️ Development

### Running Both Services Together

**Terminal 1 - Backend:**
```bash
cd finance\ dashboard\ system
npm run start
```

**Terminal 2 - Frontend:**
```bash
cd finance\ dashboard\ system/frontend
npm run dev
```

**Terminal 3 - Testing (optional):**
```bash
# Test API endpoints
curl http://localhost:4000/health
```

### Environment Files

#### Backend (.env)
```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/finance_dashboard
JWT_SECRET=dev-secret-change-me
JWT_EXPIRES_IN=8h
NODE_ENV=development
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:4000
```

## 📚 Tech Stack Details

### Backend
- **Express.js 4.21.2**: Web server framework
- **MongoDB 8.10.0**: Document database
- **Mongoose 8.10.0**: MongoDB object modeling
- **jsonwebtoken 9.0.2**: JWT token management
- **Joi 17.13.3**: Data validation
- **Bcryptjs 2.4.3**: Password hashing
- **Helmet 8.0.0**: Security headers
- **Express-rate-limit 7.4.1**: API rate limiting
- **Morgan 1.10.0**: HTTP request logging
- **Swagger 6.2.8**: API documentation

### Frontend
- **React 18.2.0**: UI library
- **TypeScript 5.0**: Type safety
- **Vite 5.0.8**: Build tool
- **Tailwind CSS 3.3.6**: Utility-first styling
- **React Router 6.20.0**: Client-side routing
- **React Query 5.28.0**: Server state management
- **Zustand 4.4.1**: Client state management
- **React Hook Form 7.48.0**: Form handling
- **Zod 3.22.4**: Schema validation
- **Recharts 2.10.3**: Charting library
- **Axios 1.6.2**: HTTP client
- **Lucide React 0.294.0**: Icon library

## 🧪 Testing

### API Testing with Postman

Import the provided Postman collection:
```bash
docs/Finance-Dashboard-Backend.postman_collection.json
```

Or test with curl as shown in API Examples above.

### Manual UI Testing

1. Register a new user at http://localhost:3000/register
2. Login with credentials at http://localhost:3000/login
3. Navigate dashboard to view KPIs
4. Create financial records (if admin)
5. View analytics and trends
6. Manage users (if admin)

## 🚢 Production Deployment

### Backend Deployment (Heroku Example)

1. Create Heroku app
2. Set MongoDB Atlas connection string
3. Deploy with `git push heroku main`

### Frontend Deployment (Vercel Example)

1. Push to GitHub
2. Connect to Vercel
3. Set `VITE_API_URL` to production API
4. Auto-deploys on push

See individual README files for detailed deployment instructions.

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED
```
Solution: Ensure MongoDB is running. Check with `net start MongoDB` (Windows) or `brew services start mongodb-community` (macOS)

**Port 4000 Already in Use**
```bash
# Windows PowerShell - Kill process
Get-NetTCPConnection -LocalPort 4000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object {Stop-Process $_ -Force}

# macOS/Linux
lsof -ti:4000 | xargs kill -9
```

### Frontend Issues

**API Connection Error**
- Verify backend is running on http://localhost:4000
- Check `.env` has correct `VITE_API_URL`

**Module Not Found**
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules
npm install
```

## 📖 Documentation

- [Backend README](./README.md) - Backend architecture and API details
- [Frontend README](./frontend/README.md) - Frontend components and features
- [Architecture Notes](./docs/ARCHITECTURE_NOTES.md) - System design decisions
- [API Documentation](./docs/Finance-Dashboard-Backend.postman_collection.json) - API testing collection

## ✨ Key Highlights

### Code Quality
- **Modular Architecture**: Clear separation of concerns with controllers, services, and models
- **Type Safety**: Full TypeScript implementation in frontend
- **Error Handling**: Comprehensive error middleware and try-catch blocks
- **Input Validation**: Joi (backend) and Zod (frontend) schema validation
- **Security**: JWT authentication, bcrypt hashing, rate limiting, helmet headers

### Best Practices
- **MVC Pattern**: Controllers → Services → Models separation
- **DRY Principle**: Reusable components and utilities
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Query caching, lazy loading, code splitting
- **Accessibility**: Semantic HTML, proper labeling, keyboard navigation

### Production Ready
- ✅ Comprehensive error handling
- ✅ Input validation at all layers
- ✅ JWT-based authentication
- ✅ Rate limiting
- ✅ Security headers
- ✅ Logging and monitoring hooks
- ✅ Deployment-ready configuration
- ✅ API documentation

## 📝 License

MIT License - Free to use and modify

## 👤 Author

Built as a comprehensive backend and frontend solution demonstrating professional development practices.

---

## 🚀 Quick Start Checklist

- [ ] Node.js v16+ installed
- [ ] MongoDB installed or Atlas URI ready
- [ ] Clone repository
- [ ] Backend: `npm install && npm run start`
- [ ] Verify backend health: `curl http://localhost:4000/health`
- [ ] Frontend: `cd frontend && npm install && npm run dev`
- [ ] Open http://localhost:3000
- [ ] Register and login with test account
- [ ] Explore dashboard, create records, manage users

**Questions? Check the README files in each directory or review the code comments!**

Happy coding! 🎉
