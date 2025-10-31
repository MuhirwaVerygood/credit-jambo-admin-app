# Credit Jambo - Admin Application

A comprehensive administrative platform for managing the Credit Jambo financial system, users, transactions, and system operations.

## Overview

Credit Jambo Admin is a powerful administrative dashboard that provides complete control over the financial platform. It enables administrators to manage users, monitor transactions, handle device verifications, and oversee the entire system's operations with advanced analytics and reporting capabilities.

## Features

### User Management
- **User Administration** - Create, view, edit, and delete user accounts
- **User Analytics** - Track user activity and account statistics
- **Account Status Management** - Enable/disable user accounts
- **Profile Oversight** - Monitor and update user information

### Transaction Management
- **Transaction Monitoring** - Real-time view of all system transactions
- **Transaction Analytics** - Detailed reports and transaction insights
- **Fraud Detection** - Monitor suspicious activities and patterns
- **Transaction History** - Complete audit trail of all financial activities

### Device Management
- **Device Verification** - Approve or reject device registration requests
- **Device Monitoring** - Track all registered devices across the platform
- **Security Management** - Monitor device-based security events
- **Device Analytics** - Usage patterns and device statistics

### System Administration
- **Dashboard Analytics** - System-wide statistics and KPIs
- **Notification Management** - Send system-wide notifications
- **Settings Configuration** - Manage system settings and parameters
- **Audit Logs** - Complete system activity logging

### Financial Oversight
- **Balance Management** - Monitor total system balances
- **Deposit/Withdrawal Oversight** - Track all financial movements
- **Financial Reports** - Generate comprehensive financial reports
- **Risk Management** - Monitor and manage financial risks

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **State Management**: TanStack Query (React Query)
- **Authentication**: JWT with role-based access control
- **API Communication**: Axios with custom API client
- **Data Visualization**: Charts and analytics components
- **Form Handling**: React Hook Form with Zod validation

## Project Structure

```
Admin/
├── Frontend/          # Next.js admin dashboard
│   ├── app/          # App router pages
│   │   ├── dashboard/    # Admin dashboard pages
│   │   │   ├── users/    # User management
│   │   │   ├── transactions/ # Transaction oversight
│   │   │   ├── devices/  # Device management
│   │   │   └── settings/ # System settings
│   │   └── login/    # Admin authentication
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utilities, services, and hooks
│   └── public/       # Static assets
└── Backend/          # Node.js API server
    ├── src/          # Source code
    │   ├── controllers/  # Admin controllers
    │   ├── services/     # Business logic
    │   ├── repositories/ # Data access layer
    │   └── utils/        # Utilities
    └── prisma/       # Database schema and migrations
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager
- PostgreSQL database
- Admin privileges

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MuhirwaVerygood/credit-jambo-admin-app.git
   cd credit-jambo-admin-app
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd Frontend
   pnpm install
   
   # Backend
   cd ../Backend
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp Frontend/.env.example Frontend/.env.local
   cp Backend/.env.example Backend/.env
   ```

4. **Database Setup**
   ```bash
   cd Backend
   pnpm prisma:migrate
   pnpm prisma:generate
   ```

5. **Start Development Servers**
   ```bash
   # Backend (Port 3500)
   cd Backend
   pnpm dev
   
   # Frontend (Port 3000)
   cd Frontend
   pnpm dev
   ```

## Admin API Endpoints

- **Admin Authentication**: `/api/admin/auth/*`
- **User Management**: `/api/admin/users/*`
- **Transaction Management**: `/api/admin/transactions/*`
- **Device Management**: `/api/admin/devices/*`
- **System Analytics**: `/api/admin/analytics/*`
- **Notifications**: `/api/admin/notifications/*`

## Security Features

- **Role-Based Access Control** - Admin-only access with permission levels
- **Audit Logging** - Complete activity tracking
- **Secure Authentication** - Multi-factor authentication support
- **Session Management** - Secure session handling
- **Data Encryption** - Sensitive data protection

## Dashboard Features

- **Real-time Analytics** - Live system statistics
- **User Activity Monitoring** - Track user behaviors
- **Financial Reporting** - Comprehensive financial insights
- **System Health Monitoring** - Server and database status
- **Alert Management** - System-wide notification system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For support and questions, please contact the development team.