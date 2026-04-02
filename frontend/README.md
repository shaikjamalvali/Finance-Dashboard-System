# Finance Dashboard Frontend

A modern, responsive React frontend for the Finance Dashboard system. Built with TypeScript, Tailwind CSS, and React Query for a professional financial management application.

## Features

- **Authentication**: User login and registration with JWT token management
- **Dashboard**: Real-time financial overview with income, expenses, and net balance
- **Analytics**: Interactive charts for spending by category and monthly trends
- **Records Management**: Create, read, update, and delete financial records with filtering
- **User Management**: Admin panel for managing users and roles (admin only)
- **Role-Based Access Control**: Different views and permissions for admin, analyst, and viewer roles
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Data**: Automatic refetching of data with React Query
- **Form Validation**: Client-side validation with Zod and React Hook Form

## Tech Stack

- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v6**: Client-side routing
- **React Query**: Server state management and data fetching
- **Zustand**: Lightweight state management for auth
- **React Hook Form**: Efficient form handling
- **Zod**: TypeScript-first schema validation
- **Recharts**: Composable charting library
- **Axios**: HTTP client
- **Lucide React**: Beautiful SVG icons

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Auth/           # Authentication forms and guards
│   │   ├── Dashboard/      # Dashboard visualization components
│   │   ├── Records/        # Financial records management
│   │   ├── Users/          # User management (admin)
│   │   ├── Layout/         # App layout (navbar, sidebar)
│   │   └── Common/         # Common UI components
│   ├── pages/              # Page-level components
│   ├── services/           # API service layer
│   │   ├── api.ts          # Axios instance with interceptors
│   │   ├── auth.ts         # Authentication API calls
│   │   ├── records.ts      # Records API calls
│   │   ├── dashboard.ts    # Dashboard API calls
│   │   └── users.ts        # Users API calls
│   ├── store/              # Zustand state management
│   │   └── auth.ts         # Authentication store
│   ├── hooks/              # Custom React hooks
│   │   ├── useDashboard.ts # Dashboard data hooks
│   │   ├── useRecords.ts   # Records data hooks
│   │   └── useUsers.ts     # Users data hooks
│   ├── utils/              # Utility functions
│   │   ├── formatters.ts   # Data formatting helpers
│   │   ├── validators.ts   # Zod validation schemas
│   │   └── constants.ts    # App constants
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # React DOM entry point
│   └── index.css           # Global styles with Tailwind
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js v16+ and npm
- Backend server running on http://localhost:4000

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   
   Verify the API URL matches your backend:
   ```
   VITE_API_URL=http://localhost:4000
   ```

### Running the Application

#### Development Server
```bash
npm run dev
```
- Opens at http://localhost:3000
- Hot module replacement enabled
- Proxy configured to backend API

#### Production Build
```bash
npm run build
```
- Creates optimized build in `dist/` directory
- Minified and tree-shaken assets

#### Preview Build
```bash
npm run preview
```
- Serves the production build locally

## User Roles and Permissions

### Admin Role
- ✅ View dashboard and analytics
- ✅ Create, read, update, delete financial records
- ✅ Manage users (create, update, delete)
- ✅ Full system access

### Analyst Role
- ✅ View dashboard and analytics
- ✅ View financial records
- ❌ Cannot create, update, or delete records
- ❌ Cannot manage users

### Viewer Role
- ✅ View dashboard and analytics
- ❌ Cannot view detailed records
- ❌ Cannot manage users

## Key Components

### Authentication
- **LoginForm**: Email/password login with JWT token storage
- **RegisterForm**: User registration with password confirmation
- **ProtectedRoute**: Route guard that redirects unauthenticated users
- **AuthStore**: Zustand store for managing auth state

### Dashboard
- **DashboardSummary**: Cards showing income, expenses, balance, record count
- **CategoryChart**: Bar chart of spending by category
- **TrendChart**: Line chart of monthly income/expense/net trends
- **RecentActivity**: List of latest transactions

### Records Management
- **RecordsList**: Table of financial records with filtering
- **RecordForm**: Create/edit record form with validation

### User Management
- **UsersList**: Table of users (admin only)
- **UserForm**: Create/edit user form with role selection

### Layout
- **Navbar**: Top navigation with user profile and logout
- **Sidebar**: Navigation menu with role-based item visibility
- **MainLayout**: Wrapper component for authenticated pages

## API Integration

The frontend communicates with the backend API using Axios. All API calls are organized in the `services/` directory:

### Authentication Service
```typescript
authService.register(name, email, password)
authService.login(email, password)
authService.logout()
```

### Records Service
```typescript
recordsService.listRecords({ type, category, startDate, endDate, q, page, limit })
recordsService.getRecord(id)
recordsService.createRecord(data)
recordsService.updateRecord(id, data)
recordsService.deleteRecord(id)
```

### Dashboard Service
```typescript
dashboardService.getSummary()
dashboardService.getCategoryTotals()
dashboardService.getMonthlyTrends()
dashboardService.getRecentActivity()
```

### Users Service
```typescript
usersService.listUsers()
usersService.getUser(id)
usersService.createUser(data)
usersService.updateUser(id, data)
usersService.deleteUser(id)
```

## Form Validation

Client-side validation is implemented using Zod schemas:

- **Login**: Email format, password minimum length
- **Register**: Name, email, password, password confirmation match
- **Records**: Amount > 0, required fields, date format validation
- **Users**: All required fields, email format, role and status enums

## Error Handling

- API errors are caught and displayed in user-friendly error alerts
- 401 Unauthorized errors trigger automatic logout and redirect to login
- Form validation errors show per-field messages
- Global error boundary could be added for unhandled exceptions

## Styling

- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **Custom Colors**: Primary (blue), Success (green), Danger (red), Warning (orange)
- **Responsive Design**: Mobile-first approach with breakpoints (sm, md, lg)
- **Dark Mode Ready**: Can be enabled via `tailwind.config.js`

## Performance Optimizations

- **Code Splitting**: Automatic with Vite and React Router
- **Query Caching**: React Query caches data with stale-time of 5 minutes
- **Image Optimization**: SVG icons from Lucide React
- **Bundle Analysis**: Can be added with `vite-plugin-visualizer`

## State Management

### Authentication State (Zustand)
- Persisted to localStorage
- Auto-initialized on app load
- Methods: login, register, logout, setUser, hasPermission, isAuthenticated

### Server State (React Query)
- Automatic caching and refetching
- Background updates when stale
- Optimistic updates support
- Separate hooks for each data domain

## Testing Recommendations

Add testing with:
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | http://localhost:4000 |

## Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome)

## Contributing

1. Create a feature branch
2. Follow existing code style
3. Test your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check existing documentation
2. Review component examples in the codebase
3. Open an issue on the GitHub repository

---

**Happy coding! 🚀**
