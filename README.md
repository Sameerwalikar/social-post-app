# Social Feed Application

Production-ready full stack Social Feed app built with React, Express, and MongoDB Atlas.

## Architecture

- `frontend`: React + Router + MUI + Axios + Context API
- `backend`: Express + Mongoose + JWT + Multer + Validation + Security middleware
- `uploads`: Local image storage in backend runtime

## Core Features

- Register, login, and session persistence
- Public feed with newest-first pagination
- Create post (text only, image only, or both)
- Like toggle with instant UI update
- Comment modal with instant updates
- Infinite scroll, skeleton loading, empty states, toasts
- Protected feed route and auto-login token bootstrap

## Backend Setup

1. Copy `backend/.env.example` to `backend/.env` and set values.
2. Install dependencies:
   - `cd backend`
   - `npm install`
3. Run server:
   - `npm run dev`

Backend runs on `http://localhost:5000`.

## Frontend Setup

1. Copy `frontend/.env.example` to `frontend/.env`.
2. Install dependencies:
   - `cd frontend`
   - `npm install`
3. Run app:
   - `npm run dev`

Frontend runs on `http://localhost:5173`.

## API Response Contract

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "..."
}
```

## MongoDB Atlas Setup Guide

1. Create a MongoDB Atlas project and cluster.
2. Create a database user with read/write permissions.
3. Add your IP to Network Access (or `0.0.0.0/0` for development only).
4. Copy connection string and paste into `MONGODB_URI` in `backend/.env`.
5. Start backend and verify `/api/health`.

## Render Deployment Guide (Backend)

1. Push repository to GitHub.
2. Create a **Web Service** in Render from the backend project.
3. Build command: `npm install`
4. Start command: `npm start`
5. Root directory: `backend`
6. Set environment variables from `backend/.env.example`.
7. Add persistent disk only if you require durable uploads (recommended to migrate uploads to cloud storage for production).

## Vercel Deployment Guide (Frontend)

1. Create a Vercel project linked to this repository.
2. Set root directory to `frontend`.
3. Framework preset: `Vite`.
4. Add env vars:
   - `VITE_API_URL=https://<render-backend-domain>/api`
   - `VITE_SERVER_URL=https://<render-backend-domain>`
5. Deploy and validate auth + feed workflows.

## Production Notes

- Rotate `JWT_SECRET` regularly.
- Enable strict CORS origin in production.
- Consider cloud image storage (S3/Cloudinary) for scalable uploads.
- Add API rate limiting and structured logging before public launch.
# Social_App
