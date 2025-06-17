# Car Listing Application

A modern, responsive car listing application built with Next.js and TypeScript. This application allows users to browse and sort through a collection of cars with pagination support.

## Features

- 🚗 Browse a collection of cars with detailed information
- 🔍 Sort cars by different fields (year, price, etc.)
- 📱 Responsive design that works on all devices
- ⚡ Built with Next.js for optimal performance
- 🎨 Styled with Tailwind CSS
- 📱 Mobile-first approach

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/test-task-cars.git
   cd test-task-cars
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # App router
│   ├── api/                # API routes
│   └── page.tsx            # Home page
├── components/             # Reusable components
├── hooks/                  # Custom React hooks
└── types/                  # TypeScript type definitions
```

## API Integration

The application fetches car data from an external API endpoint. The API supports:
- Pagination (`_page`, `_limit`)
- Sorting (`_sort`, `_order`)