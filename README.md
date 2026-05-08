# Smart Ecommerce

Smart Ecommerce is a modern ecommerce frontend built with React, TypeScript, and Vite. It includes a product listing page, product detail pages, cart management, and Firebase-powered authentication flows for login, signup, Google sign-in, forgot password, and reset password.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Firebase Authentication
- Zustand for client state
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- Zod
- ESLint

## Getting Started

Clone the repository:

```bash
git clone <repository-url>
cd smart-ecommerce
```

Install dependencies:

```bash
npm install
```

Create your local environment file from the example:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Open `.env` and add your own Firebase project values:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Do not commit `.env`. The `.env.example` file is only a template and should not contain real secrets or project-specific credentials.

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
src/
  app/                 App setup, providers, routes, and pages
  features/            Feature modules for auth, cart, and products
  shared/              Shared components, stores, types, and utilities
  assets/              Static image assets
```

## Features

- Product catalog with responsive product cards
- Product detail pages
- Shopping cart state management
- Email/password authentication
- Google authentication
- Forgot password and reset password flows
- Shared UI components and layout shell

