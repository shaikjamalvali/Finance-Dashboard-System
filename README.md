# Finance Dashboard System

Finance Dashboard System is a role-based finance backend, with a matching frontend, built for the Zorvyn assignment brief. The project focuses on clean API design, access control, analytics, validation, and maintainable architecture rather than unnecessary complexity.

## What this project covers

This backend matches the assignment requirements in a direct way:
- User and role management with admin, analyst, and viewer roles
- Financial record management for income and expense entries
- Dashboard summary endpoints with aggregation logic
- Route-level authorization and input validation
- MongoDB persistence with Mongoose
- Swagger API documentation and Postman collection for testing
- Optional improvements such as JWT auth, cookie auth, rate limiting, and pagination

## Submission identity

- Name: Jamal Vali Shaik
- Email: shaikjamalvali2004@gmail.com
- Role: Backend Developer Intern
- Portal: Zorvyn Assignment Portal
- Domain: Finance Data Processing and Access Control Backend

## Role behavior

The system is intentionally simple and explicit:
- Admin can manage users and records, and view all dashboard data
- Analyst can view records and dashboard analytics
- Viewer can only view dashboard analytics

## Tech stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Joi validation
- Swagger/OpenAPI documentation
- React + TypeScript frontend
- Tailwind CSS, React Query, Zustand, and Recharts on the frontend

## Architecture at a glance

The backend is split into small, predictable layers:
- Routes decide which middleware and controller to run
- Controllers handle request/response flow
- Services contain aggregation and filtering logic
- Models define MongoDB schema structure
- Middleware handles auth, roles, validation, and errors
- Validators keep request data consistent

### Backend folders

- `src/controllers/` - auth, user, record, and dashboard handlers
- `src/models/` - user and record database schemas
- `src/routes/` - API endpoints
- `src/services/` - record filtering and dashboard aggregation
- `src/middleware/` - auth, role checks, validation, and error handling
- `src/validators/` - Joi schemas for body, params, and query input
- `src/config/` - database and Swagger configuration
- `src/utils/` - reusable helpers

## Data model

### User
- `name`
- `email`
- `password`
- `role` - admin, analyst, or viewer
- `status` - active or inactive
- timestamps

### Record
- `amount`
- `type` - income or expense
- `category`
- `date`
- `notes`
- `createdBy`
- timestamps

## API overview

### Public auth routes
- `POST /auth/register`
- `POST /auth/login`

### User management
- `GET /users`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

### Financial records
- `GET /records`
- `POST /records`
- `GET /records/:id`
- `PATCH /records/:id`
- `DELETE /records/:id`

Filtering examples:
- `GET /records?type=expense`
- `GET /records?category=food`
- `GET /records?startDate=2026-01-01&endDate=2026-12-31`
- `GET /records?q=salary&page=1&limit=10`

### Dashboard analytics
- `GET /dashboard/summary`
- `GET /dashboard/category-totals`
- `GET /dashboard/monthly-trends`
- `GET /dashboard/recent-activity`

### System
- `GET /health`
- `GET /api/docs`

## Validation and error handling

The backend validates input before processing it and returns clear errors when something is wrong.

- Joi validates request body, params, and query values
- Invalid input returns 400
- Missing or invalid auth returns 401
- Permission issues return 403
- Missing resources return 404
- Unhandled issues are sent through centralized error middleware

Example error shape:

```json
{
  "message": "Validation failed",
  "details": [
    "\"amount\" must be a positive number"
  ]
}
```

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and set at least:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/finance_dashboard
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=8h
NODE_ENV=development
```

### 3. Start the backend

```bash
npm run start
```

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Open the docs

- Swagger: http://localhost:4000/api/docs
- Health: http://localhost:4000/health

## Demo credentials for testing

Use this current demo identity in Swagger, Postman, or the frontend:

- Name: Jamal Vali Shaik
- Email: shaikjamalvali2004@gmail.com
- Password: Shaik@2004Finance

## Testing flow

Recommended sequence:
1. Register or reuse the demo admin account
2. Login and copy the token
3. Authorize in Swagger or set the token in Postman
4. Create a financial record
5. Open dashboard analytics
6. View users and records based on your role

## Project navigation

If you want a quick path through the code:
- Start with `src/server.js`
- Then read `src/app.js`
- Then inspect `src/routes/`
- Then check `src/controllers/`
- Then review `src/services/` and `src/models/`
- Swagger setup is in `src/config/swagger.js`

## Assumptions and tradeoffs

- This is a single-tenant assessment project
- Currency conversion is out of scope
- MongoDB was chosen for flexible aggregation and simple document modeling
- The code favors clarity and separation of concerns over abstraction-heavy patterns
- Swagger and Postman are included to make review and testing easier

## Why this fits the assignment

This repository shows the parts the assignment asks for:
- Role-based user and access control
- Financial CRUD and filtering
- Aggregated dashboard APIs
- Validation and structured errors
- Persistence with a real database
- Documentation and testability

## Submission note

This README is the single consolidated document for the project. The older helper docs were merged into this file so the submission has one clear entry point.

## Render deployment

If you deploy the backend on Render using the included [render.yaml](render.yaml), your public Swagger link will be:

```text
https://your-render-service.onrender.com/api/docs
```

### Render setup

1. Create a new Render Blueprint from this repository.
2. Add the required secrets in Render:
  - `MONGODB_URI`
  - `JWT_SECRET`
3. Keep `SWAGGER_SERVER_URL` set to your Render service domain.
4. Deploy the service.

### Notes

- Do not submit the localhost Swagger URL.
- Use the Render-generated public domain in your submission.
- If your Render service name differs, replace `your-render-service` with the actual service hostname.
