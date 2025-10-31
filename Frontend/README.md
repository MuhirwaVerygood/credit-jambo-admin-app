# Credit Jambo - Admin Frontend

Modern React-based admin dashboard for managing the Credit Jambo platform. Provides a comprehensive interface for administrators to manage users, monitor transactions, handle devices, and oversee system operations.

## Features

- **User Management**: View, create, edit, and delete user accounts
- **Transaction Monitoring**: Real-time transaction tracking and management
- **Device Management**: Monitor and manage registered devices
- **Dashboard Analytics**: Overview of system metrics and statistics
- **Notification System**: Send and manage system notifications
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (via shadcn/ui)
- **State Management**: React Query (TanStack Query)
- **Authentication**: JWT tokens with HTTP-only cookies
- **Forms**: React Hook Form
- **Icons**: Lucide React

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Admin Backend API running (default: http://localhost:3500)

## Installation

1. Navigate to the Admin/Frontend directory:
   ```bash
   cd Admin/Frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3500/api/v1
   ```

## Development

Start the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`

## Production Build

1. Build the application:
   ```bash
   pnpm run build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages
│   │   ├── users/         # User management
│   │   ├── transactions/  # Transaction monitoring
│   │   ├── devices/       # Device management
│   │   └── wallet/        # Wallet overview
│   ├── login/             # Authentication
│   └── register/          # Admin registration
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── dashboard-*       # Dashboard-specific components
├── lib/                  # Utilities and configurations
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   ├── providers/        # React context providers
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Key Components

### Authentication Flow
- Login/Register forms with validation
- JWT token management with secure cookies
- Protected routes with middleware
- Automatic token refresh

### Dashboard Layout
- Responsive sidebar navigation
- Header with user profile and notifications
- Main content area with breadcrumbs
- Mobile-friendly collapsible menu

### Data Management
- React Query for server state management
- Optimistic updates for better UX
- Error handling and retry logic
- Loading states and skeletons

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Admin Backend API URL | `http://localhost:3500/api/v1` |

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint for code quality

## API Integration

The frontend communicates with the Admin Backend API through:
- RESTful endpoints for CRUD operations
- JWT authentication with Bearer tokens
- Error handling with user-friendly messages
- Loading states during API calls

## Styling Guidelines

- Uses Tailwind CSS for utility-first styling
- Consistent color scheme with CSS custom properties
- Responsive design patterns
- Accessible UI components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- TypeScript is strictly enforced for type safety
- ESLint configuration ensures code quality
- Component composition over inheritance
- Custom hooks for reusable logic
