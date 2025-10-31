# Credit Jambo - Admin Backend

Backend API server for the Credit Jambo admin panel, providing comprehensive administrative functionality for managing users, transactions, devices, and notifications.

## Features

- User management (CRUD operations)
- Transaction monitoring and management
- Device tracking and management
- Notification system
- Authentication and authorization
- Email notifications
- Database management with Prisma ORM

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Validation**: Custom validation utilities
- **Security**: bcrypt for password hashing

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm package manager

## Installation

1. Navigate to the Admin/Backend directory:
   ```bash
   cd Admin/Backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

   Configure the following variables in `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/credit_jambo_admin?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   PORT=3500
   FRONTEND_URL="http://localhost:3000"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   ```

## Database Setup

1. Ensure PostgreSQL is running and create the database:
   ```sql
   CREATE DATABASE credit_jambo_admin;
   ```

2. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## Development

Start the development server:
```bash
pnpm run dev
```

The server will start on `http://localhost:3500`

## Production Build

1. Build the application:
   ```bash
   pnpm run build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new admin user
- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/logout` - Logout

### User Management
- `GET /api/v1/admin/users` - Get all users
- `POST /api/v1/admin/users` - Create new user
- `PUT /api/v1/admin/users/:id` - Update user
- `DELETE /api/v1/admin/users/:id` - Delete user

### Transaction Management
- `GET /api/v1/admin/transactions` - Get all transactions
- `GET /api/v1/admin/transactions/:id` - Get transaction details

### Device Management
- `GET /api/v1/admin/devices` - Get all devices
- `POST /api/v1/admin/devices` - Register device
- `PUT /api/v1/admin/devices/:id` - Update device
- `DELETE /api/v1/admin/devices/:id` - Delete device

### Notifications
- `GET /api/v1/admin/notifications` - Get all notifications
- `POST /api/v1/admin/notifications` - Send notification

## Project Structure

```
src/
├── controllers/     # Route handlers
├── services/        # Business logic
├── repositories/    # Database operations
├── routes/          # API routes
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── middleware/      # Express middleware
└── index.ts         # Application entry point
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Server port (default: 3500) | No |
| `FRONTEND_URL` | Admin frontend URL | Yes |
| `SMTP_HOST` | Email SMTP host | No |
| `SMTP_PORT` | Email SMTP port | No |
| `SMTP_USER` | Email SMTP username | No |
| `SMTP_PASS` | Email SMTP password | No |

## Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build for production
- `pnpm start` - Start production server
- `pnpm run lint` - Run ESLint

## Security Notes

- JWT secrets should be strong and unique
- Database credentials should never be committed
- Use HTTPS in production
- Regularly update dependencies for security patches