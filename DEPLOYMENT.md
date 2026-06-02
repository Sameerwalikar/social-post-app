# Deployment Guide

## Prerequisites

- GitHub repository with this project
- MongoDB Atlas cluster
- Render account
- Vercel account

## 1) MongoDB Atlas

1. Create a cluster.
2. Create DB user and password.
3. Add network access rule.
4. Copy connection URI.
5. Use URI in backend environment variable `MONGODB_URI`.

## 2) Backend on Render

1. Create Web Service from repository.
2. Set root directory to `backend`.
3. Set build command to `npm install`.
4. Set start command to `npm start`.
5. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `MONGODB_URI=<atlas-uri>`
   - `JWT_SECRET=<long-random-secret>`
   - `JWT_EXPIRES_IN=7d`
   - `CORS_ORIGIN=<vercel-frontend-url>`
   - `MAX_FILE_SIZE_MB=5`
6. Deploy and verify `/api/health`.

## 3) Frontend on Vercel

1. Create project from repository.
2. Set root directory to `frontend`.
3. Framework preset: Vite.
4. Add environment variables:
   - `VITE_API_URL=https://<render-domain>/api`
   - `VITE_SERVER_URL=https://<render-domain>`
5. Deploy and verify register/login/feed flows.

## 4) Production Hardening

- Replace local file uploads with cloud object storage.
- Add request rate limiting and abuse detection.
- Enable centralized logging and uptime monitoring.
- Rotate JWT secret and enforce HTTPS-only origins.
