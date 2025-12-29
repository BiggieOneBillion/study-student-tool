# Getting Started

Follow these steps to set up the Student Study Tool locally on your machine.

## Prerequisites
- **Node.js**: v18.x or later
- **npm** or **yarn**
- **MongoDB**: A running instance (local or Atlas)

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Liveblocks Collaboration
LIVEBLOCKS_SECRET_KEY=

# Google Gemini AI
GOOGLE_GEMINI_API_KEY=

# Database
MONGODB_URI=

# NextAuth (if applicable)
AUTH_SECRET=
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/study-student-tool.git
   cd study-student-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.
