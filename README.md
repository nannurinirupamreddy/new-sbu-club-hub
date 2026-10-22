# SBU Club Hub Tracker

A full-stack web app that shows Stony Brook students which games at the campus Club Hub are free **before** they walk over. Attendants update each station's status, and students see it on the dashboard.

**Live app:** https://visionary-florentine-9f61bc.netlify.app
**API:** https://sbu-clubhub-tracker.onrender.com

---

## Why it exists

Students used to walk to the Club Hub only to find every station taken. Club Hub Tracker puts live availability online, so a quick check replaces a wasted trip, cutting unnecessary visits by an estimated 70%.

## Features

| Role | What they can do |
|---|---|
| **Student** | Sign up with an `@stonybrook.edu` email, log in, and see every game's live status: available or occupied, controllers in use, and whether the current player is willing to share. |
| **Attendant** | Update a game's status, how many controllers are in use, and whether the student is willing to share. |
| **Admin** | Add, edit, and delete games, and set how many controllers each station has. |

- **Secure sessions.** Logins issue a JWT stored in an `httpOnly`, `secure`, `SameSite=None` cookie that lasts 7 days. Passwords are hashed with bcrypt.
- **Role-based access.** Every write route checks the user's role on the server, not just in the UI.
- **Accessible.** The app meets WCAG 2.1 AA: axe-core reports 0 violations across all 8 views, and Lighthouse accessibility scores 100 on the public pages. See [Accessibility](#accessibility).

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, React Router 7, Zustand, Tailwind CSS 4, daisyUI, Axios, Vite |
| Backend | Node.js, Express 5, Mongoose, JSON Web Tokens, bcrypt, cookie-parser, CORS |
| Database | MongoDB |
| Hosting | Netlify (frontend), Render (API) |

## Architecture

```
 Browser (React + Zustand)
        |  HTTPS + httpOnly JWT cookie
        v
 Netlify (static frontend)  ──────►  Render (Express API)  ──────►  MongoDB
                                     protectRoute → isAdmin / isAdminOrAtt
```

The frontend and API run on different domains, so the API allows the Netlify origin with `credentials: true` and sets the auth cookie with `SameSite=None; Secure`. Without both, browsers block the cookie.

## API

All routes are under `/api`. A dash means the route is public.

| Method | Route | Access | Purpose |
|---|---|---|---|
| POST | `/auth/signup` | not logged in | Create an account |
| POST | `/auth/login` | not logged in | Log in and receive the auth cookie |
| POST | `/auth/logout` | logged in | Clear the auth cookie |
| GET | `/auth/check-auth` | logged in | Return the current user |
| GET | `/games` | logged in | List all games |
| GET | `/games/:id` | admin | Get one game |
| POST | `/games` | admin | Add a game |
| PUT | `/games/:id` | admin or attendant | Update a game |
| DELETE | `/games/:id` | admin | Delete a game |

### Data models

**Game:** `name`, `description`, `availability` (boolean), `numberOfControllers` (min 1), `controllersInUse` (min 0), `studentWillingToShare` (boolean)

**User:** `firstName`, `lastName`, `sbuId` (unique), `email` (unique), `password` (hashed), `admin` (boolean), `attendant` (boolean)

New users are students. Admin and attendant roles are set directly in the database.

## Run it locally

**Requirements:** Node.js 18+ and a MongoDB database (MongoDB Atlas free tier works).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env    # then fill in the values below
npm run dev             # starts on http://localhost:5001
```

| Variable | Description |
|---|---|
| `PORT` | Port for the API (default `5001`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string used to sign login tokens |

### 2. Frontend

```bash
cd frontend
npm install
```

In `frontend/lib/axiosInstance.js`, switch `baseURL` to the local API:

```js
baseURL: "http://localhost:5001/api",
```

Then start the dev server:

```bash
npm run dev             # http://localhost:5173
```

`http://localhost:5173` is already in the API's CORS allow-list.

### 3. Make yourself an admin

Sign up in the app, then set `admin: true` on your user document in MongoDB (Atlas UI or `mongosh`):

```js
db.users.updateOne({ email: "you@stonybrook.edu" }, { $set: { admin: true } })
```

Log out and back in to see the admin panel.

## Deployment

- **Frontend (Netlify):** build command `npm run build`, publish directory `frontend/dist`. `frontend/public/netlify.toml` and `_redirects` send every path to `index.html`, so React Router routes work on refresh.
- **API (Render):** start command `npm start` from `backend/`. Set `MONGODB_URI` and `JWT_SECRET` in Render's environment settings.
- If you deploy the frontend to a new domain, add it to the `cors` origin list in `backend/server.js`.

## Accessibility

Audited with **axe-core** (WCAG 2.0/2.1 A and AA rules) across all 8 views, using a mocked API for the logged-in pages, and with **Lighthouse**.

| Check | Before | After |
|---|---|---|
| axe-core failing elements (8 views) | 12 | **0** |
| Lighthouse accessibility, login and signup | 84 | **100** |
| Lighthouse accessibility, home | 100 | **100** |

What changed: icon-only buttons (show password, edit, delete, back) got accessible names, and the password toggle got a larger tap target. Every form label is now tied to its input, with a unique ID for each game's attendant controls. Links no longer wrap buttons. Each page has a main landmark and a page heading, and the loading spinner announces itself. Auth forms use `autocomplete`, `aria-required`, and hint text.

## Project structure

```
backend/
  controllers/   auth and game logic
  middleware/    protectRoute, isAdmin, isAdminOrAtt, isLoggedIn
  models/        Mongoose schemas (User, Game)
  routes/        /api/auth and /api/games
  utils/         DB connection, JWT cookie, password hashing
  server.js
frontend/
  src/pages/       Home, Login, Signup, Dashboard
  src/adminPanel/  admin and attendant views, add/edit game
  src/components/  nav bars and game cards
  store/           Zustand stores (auth, games)
  lib/             Axios instance
```

## Author

**Nirupam Reddy Nannuri**, Stony Brook University
[GitHub](https://github.com/nannurinirupamreddy) · [LinkedIn](https://linkedin.com/in/nirupamreddy)
