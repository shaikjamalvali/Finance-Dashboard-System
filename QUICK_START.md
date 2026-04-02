# Finance Dashboard - Quick Start Guide

Complete step-by-step setup instructions for running the entire Finance Dashboard system locally.

## ⚡ 5-Minute Quick Start

### 1. Start Backend (Terminal 1)

```bash
# Navigate to project
cd "d:\finance dashboard system"

# Install dependencies (first time only)
npm install

# Start server
npm run start

# Wait for: "Finance backend listening on port 4000"
```

### 2. Start Frontend (Terminal 2)

```bash
# Navigate to frontend
cd "d:\finance dashboard system\frontend"

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev

# Opens automatically at http://localhost:3000
```

### 3. Create Test User

In **Terminal 3** or in the frontend UI:

**Option A: Using PowerShell**
```powershell
$body = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "Password@123"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:4000/auth/register" `
  -ContentType "application/json" -Body $body
```

**Option B: Using browser**
1. Go to http://localhost:3000/register
2. Fill in the form
3. Click Register

### 4. Login & Explore

1. Navigate to http://localhost:3000/login
2. Use registered email and password
3. Explore dashboard, create records, etc.

## 📋 Prerequisites

### Windows

- **Node.js & npm**
  ```powershell
  # Check if installed
  node --version
  npm --version
  
  # If not installed, use:
  winget install nodejs
  ```

- **MongoDB** (Choose one)
  
  **Local Installation (Optional)**
  ```powershell
  # Install
  winget install MongoDB.Server
  
  # Start service
  net start MongoDB
  
  # Or use Services app and search "MongoDB"
  ```
  
  **OR Use MongoDB Atlas (Recommended for simplicity)**
  - Create free account at https://www.mongodb.com/cloud/atlas
  - Create a cluster
  - Get connection string
  - Update `.env` MONGODB_URI with your connection string

### macOS

```bash
# Install Node.js
brew install node

# Install MongoDB (optional)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB (optional)
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

## 🔧 Detailed Setup Steps

### Step 1: Clone Repository

```bash
# Create a copy of the project folder if needed
cd d:\
```

### Step 2: Backend Configuration

```bash
cd "finance dashboard system"

# Check Node version
node --version  # Should be v16+

# Install dependencies
npm install

# Create .env file (already provided)
# Edit .env with your MongoDB connection
# - For local MongoDB: mongodb://127.0.0.1:27017/finance_dashboard
# - For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/finance_dashboard

# Optional: Test MongoDB connection
# If using local MongoDB, ensure service is running
# If using Atlas, ensure network access is configured
```

### Step 3: Start Backend Server

```bash
npm run start

# Expected output:
# ✓ Database connected
# ✓ Finance backend listening on port 4000
# ✓ Health endpoint: http://localhost:4000/health
```

### Step 4: Verify Backend (New Terminal)

```bash
# Test health endpoint
curl http://localhost:4000/health

# Expected response: {"status":"ok"}
```

### Step 5: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Verify .env
cat .env.example
# Should show: VITE_API_URL=http://localhost:4000
```

### Step 6: Start Frontend

```bash
npm run dev

# Automatically opens http://localhost:3000
# If not, manually navigate to it
```

## 🧪 Testing the Application

### Test 1: Health Check

```powershell
# In PowerShell
Invoke-RestMethod -Uri "http://localhost:4000/health"

# Expected: @{status='ok'}
```

### Test 2: Register User

```powershell
# In PowerShell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "TestPass123"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:4000/auth/register" `
  -ContentType "application/json" -Body $body

# Expected response with user ID and email
```

### Test 3: Login

```powershell
$body = @{
    email = "test@example.com"
    password = "TestPass123"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:4000/auth/login" `
  -ContentType "application/json" -Body $body

# Expected response with JWT token
```

### Test 4: Frontend UI

1. Open http://localhost:3000 in browser
2. Register or login with test account
3. Navigate to Dashboard
4. View charts and analytics
5. Create a financial record
6. Verify data appears in dashboard

## 📊 Test Scenarios

### Scenario 1: Admin Full Access
1. Create admin user: name="Admin", email="admin@test.com", password="Admin123"
2. Login as admin
3. Create financial record
4. Access Users section and manage users
5. View all dashboard analytics

### Scenario 2: Analyst Read-Only
1. Create analyst user via admin panel
2. Login as analyst
3. View financial records (read-only)
4. View dashboard and analytics
5. Try to edit/delete record → Should fail with 403

### Scenario 3: Viewer Dashboard-Only
1. Create viewer user via admin panel
2. Login as viewer
3. View dashboard summary
4. Try to access Records → Should redirect to dashboard

## 🚨 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
```powershell
# Check if MongoDB is running
Get-Service -Name "MongoDB"

# If not running, start it
Start-Service -Name "MongoDB"

# Or if using MongoDB Atlas, update .env with connection string
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
```

### Issue: "Port 4000 already in use"

**Solution:**
```powershell
# Find process using port 4000
Get-NetTCPConnection -LocalPort 4000 | Select-Object OwningProcess

# Kill the process
Stop-Process -Id <PID> -Force

# Or use a different port in .env
PORT=4001
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Frontend will auto-detect and use next available port
# Or specify port:
npm run dev -- --port 3001
```

### Issue: "Cannot find module" error

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

### Issue: API calls failing from frontend

**Solution:**
```bash
# Verify backend is running
curl http://localhost:4000/health

# Check frontend .env
cat .env
# Should have: VITE_API_URL=http://localhost:4000

# Restart frontend dev server
npm run dev
```

### Issue: CORS errors

**Solution:**
- CORS is enabled in backend (see src/app.js)
- Ensure frontend uses correct API URL in .env
- Backend listens on 4000, frontend on 3000 - CORS should work

## 📁 Project File Structure

After setup, your directory should look like:

```
finance dashboard system/
├── src/                          # Backend source
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── validators/
├── frontend/                     # Frontend React app
│   ├── src/
│   ├── node_modules/
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── docs/                         # Documentation
├── node_modules/                 # Backend dependencies
├── .env                          # Backend environment
├── package.json                  # Backend package.json
└── README.md
```

## 🎯 What to Test First

1. **Backend Startup**
   - Backend starts without errors
   - Listens on port 4000
   - Health check returns 200

2. **API Endpoints**
   - POST /auth/register works
   - POST /auth/login returns token
   - GET /dashboard/summary works

3. **Frontend UI**
   - Loads at localhost:3000
   - Can register new user
   - Can login
   - Dashboard displays correctly

4. **Data Flow**
   - Create a record in UI
   - Verify it appears in dashboard
   - Check aggregated totals update

## 📞 Getting Help

1. **Backend issues?** Check backend README.md
2. **Frontend issues?** Check frontend README.md
3. **API issues?** Test with curl or Postman
4. **Database issues?** Check MongoDB connection string in .env

## ✅ Success Checklist

- [ ] Node.js v16+ installed
- [ ] MongoDB installed or Atlas URI configured
- [ ] Backend `npm install` completed
- [ ] Backend `npm run start` shows "listening on port 4000"
- [ ] Health check returns `{"status":"ok"}`
- [ ] Frontend `npm install` completed
- [ ] Frontend `npm run dev` opens http://localhost:3000
- [ ] Can register user via UI or API
- [ ] Can login with credentials
- [ ] Dashboard displays data
- [ ] Can create financial records (if admin)
- [ ] Can view user management (if admin)

## 🎉 You're All Set!

Once all checks pass, you have a fully functional finance dashboard system ready to explore and develop!

---

**Next Steps:**
1. Explore the dashboard UI
2. Create test data (financial records)
3. Review code architecture
4. Customize for your needs
5. Deploy to production (see individual READMEs)

Happy developing! 🚀
