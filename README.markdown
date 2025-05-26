# FletNix Frontend

FletNix is a frontend application for a streaming platform, built with Angular. It allows users to log in, register, browse shows, search content, and view show details. This README provides instructions for setting up, running, and deploying the frontend.

## Features
- **Authentication**: User login and registration with JWT-based token storage.
- **Show Browsing**: Paginated list of shows, filterable by type (e.g., movie, TV show).
- **Search**: Search shows by query with paginated results.
- **Show Details**: View detailed information for individual shows.
- **Responsive Design**: Styled with Tailwind CSS for a modern, responsive UI.
- **HTTP Interceptor**: Automatically adds `Authorization` headers with JWT tokens to API requests.

## Tech Stack
- **Angular**
- **TypeScript**
- **Tailwind CSS**
- **RxJS**
- **Node.js**
- **Angular CLI**

## Prerequisites
- **Node.js**: Install from [nodejs.org](https://nodejs.org).
- **Angular CLI**: Install globally with `npm install -g @angular/cli`.
- **Git**: Required to clone the repository.
- **GitHub Account**: For pushing code.
- **Backend API**: A running backend on Render (e.g., `https://your-backend.onrender.com/api`) with endpoints for `/auth/login`, `/auth/register`, and `/shows`.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/fletnix-frontend.git
   cd fletnix-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Running Locally
1. **Start the Development Server**:
   ```bash
   npm start
   ```
   - This runs `ng serve`, updating `environment.ts` and serving the app at `http://localhost:4200`.

## Project Structure
- `src/app/services/auth.service.ts`: Handles login, registration, and logout.
- `src/app/services/show.service.ts`: Fetches shows, search results, and show details.
- `src/app/interceptors/auth.interceptor.ts`: Adds `Authorization: Bearer <token>` to API requests.
- `src/environments/environment.ts`: Defines `apiUrlBase`, generated from `.env`.
