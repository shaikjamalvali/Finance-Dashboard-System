# Finance Dashboard System

This project is a full finance dashboard application with two parts that work together: an Express and MongoDB backend, and a React frontend built with TypeScript. It was shaped for the Zorvyn assignment brief, but the codebase is also organized like a small real-world product, with a clear API, role-based access control, analytics, and deployment support.

## What you get

The repository includes:

- a backend API for authentication, users, records, and dashboard analytics
- a frontend app for login, dashboard viewing, records management, and admin workflows
- Swagger documentation for the API
- a Postman collection for quick testing
- Render deployment support for the backend service

## Submission details

- Name: Jamal Vali Shaik
- Email: shaikjamalvali2004@gmail.com
- Role: Backend Developer Intern
- Portal: Zorvyn Assignment Portal

## A quick tour of the project

The backend lives in `src/` and is started from `src/server.js`. It connects to MongoDB, sets up middleware such as cookie parsing, rate limiting, validation, and error handling, and exposes the API routes used by Swagger and the frontend.

The frontend lives in `frontend/` and starts with Vite. It uses React Query for server state, Zustand for auth state, React Hook Form and Zod for forms, and Recharts for the charting views.

## Main features

### Backend

- register and login users
- support for bearer tokens and cookie-based auth
- role-based access control for admin, analyst, and viewer
- financial record CRUD
- dashboard totals, category breakdowns, monthly trends, and recent activity
- request validation with Joi
- centralized error responses
- Swagger UI at `/api/docs`

### Frontend

- login and register screens
- protected routes after sign-in
- dashboard with summary cards and charts
- record management with search, filter, pagination, create, update, and delete
- admin user management screens
- responsive layout for desktop and mobile

## Roles

- Admin can manage users, records, and analytics
- Analyst can review and manage records plus analytics
- Viewer can only view analytics

## Tech stack

- Node.js and Express
- MongoDB and Mongoose
- JWT authentication
- Joi validation
- Swagger/OpenAPI
- React and TypeScript
- Vite and Tailwind CSS
- React Query, Zustand, Recharts, React Hook Form, and Zod

## Repository layout

- `src/` - backend application code
- `frontend/` - React client application
- `docs/` - API testing collection
- `render.yaml` - Render deployment blueprint
- `README.md` - this merged guide

## Environment variables

### Backend `.env`

```env
PORT=4000
JWT_SECRET=your-strong-secret
JWT_EXPIRES_IN=8h
MONGODB_URI=your-mongodb-connection-string
NODE_ENV=development
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:4000
```

## Running the project locally

### 1. Install backend dependencies

```bash
cd "d:\finance dashboard system"
npm install
```

### 2. Start the backend

```bash
npm run start
```

When the backend is running, check:

```bash
curl http://localhost:4000/health
```

You should receive:

```json
{"status":"ok"}
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

### 4. Start the frontend

```bash
npm run dev
```

The frontend opens at `http://localhost:3000`.

## Render deployment

If you want to deploy the backend on Render, use these settings:

- Root Directory: leave empty
- Build Command: `npm install`
- Start Command: `npm start`

Add these environment variables in Render:

```env
PORT=10000
NODE_ENV=production
JWT_SECRET=your-strong-production-secret
JWT_EXPIRES_IN=8h
MONGODB_URI=your-mongodb-atlas-connection-string
SWAGGER_SERVER_URL=https://your-render-service.onrender.com
```

After deployment, check these URLs:

- https://finance-dashboard-system-1-vtew.onrender.com/api/docs/

## Important endpoints

### Public

- `GET /`
- `GET /health`
- `POST /auth/register`
- `POST /auth/login`

### Dashboard

- `GET /dashboard/summary`
- `GET /dashboard/category-totals`
- `GET /dashboard/monthly-trends`
- `GET /dashboard/recent-activity`

### Records

- `GET /records`
- `POST /records`
- `GET /records/:id`
- `PATCH /records/:id`
- `DELETE /records/:id`

### Users

- `GET /users`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

## Demo credentials for testing

Use these values when you want to try the app quickly:

- Name: Jamal Vali Shaik
- Email: shaikjamalvali2004@gmail.com
- Password: Shaik@2004Finance

## How to test the app

1. Register a new account or use the demo account.
2. Log in and copy the JWT token, or use the cookie-based login flow.
3. Open Swagger and click Authorize if you want to call protected endpoints.
4. Create a financial record.
5. Open the dashboard summary and charts.
6. Try the user management screens if you are logged in as admin.

## Validation and error handling

The backend checks incoming data before it reaches the database.

- Joi validates request bodies, params, and query strings
- invalid input returns 400
- missing or invalid auth returns 401
- role restrictions return 403
- missing resources return 404
- unexpected errors go through centralized error middleware

Example response:

```json
{
  "message": "Validation failed",
  "details": [
    "\"amount\" must be a positive number"
  ]
}
```

## Troubleshooting

- If the backend will not start, check `MONGODB_URI`, `JWT_SECRET`, and that MongoDB Atlas allows the connection.
- If Swagger shows a fetch or CORS error in production, make sure `SWAGGER_SERVER_URL` includes `https://` and matches your deployed Render URL.
- If the base Render URL shows a status JSON instead of a page, that is expected. Use `/health` or `/api/docs`.
- If the frontend cannot reach the backend, confirm `VITE_API_URL` points to the correct backend URL.

## Final note

This README is the single source of truth for the project. The older split markdown files were merged into this document so the repository feels easier to understand and easier to submit.
