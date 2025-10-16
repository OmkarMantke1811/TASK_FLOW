# Copilot Instructions for TASK_FLOW

## Project Overview

TASK_FLOW is a full-stack JavaScript project with a React frontend (`client/`) and an Express/MongoDB backend (`server/`). The architecture is split for clear separation of concerns:
- **client/**: React app (bootstrapped with Create React App)
- **server/**: Express REST API, modularized by route/controller

## Key Patterns & Conventions

### Backend (server/)
- **Entry point**: `server/index.js` sets up Express and mounts routers.
- **Routing**: All user-related routes are under `/user` (see `server/routes/userRouter.js`).
    - Example: `GET /user/register` handled by `userCtrl` in `controller/userCtrl.js`.
- **Controllers**: Each route uses a controller for logic. Controllers are ES module exports.
- **Dev workflow**: Use `npm run dev` (nodemon) for hot-reloading server.
- **Dependencies**: Uses `express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `cors`.
- **API conventions**: Route handlers expect `req`, `res` and send responses via `res.send()`.

### Frontend (client/)
- **Entry point**: `client/src/index.js`.
- **Pages**: Main pages live in `client/src/pages/` (e.g., `Registration.jsx`).
- **State management**: Uses React hooks (`useState`).
- **Form handling**: Forms use controlled components. Example: `Registration.jsx` manages form state and resets on submit.
- **Dev workflow**: Use `npm start` to run frontend (port 3000 by default).
- **Testing**: Run `npm test` for React tests (Jest/Testing Library).

## Integration Points
- **No direct API calls yet**: Frontend forms do not currently POST to backend endpoints. Integration should use fetch/axios to `/user/*` routes.
- **CORS**: Backend enables CORS for cross-origin requests.

## Common Tasks & Commands
- **Start backend**: `cd server && npm run dev`
- **Start frontend**: `cd client && npm start`
- **Build frontend**: `cd client && npm run build`
- **Test frontend**: `cd client && npm test`

## Project-Specific Notes
- **ES Modules**: Both client and server use ES module syntax (`import/export`).
- **Port usage**: Backend runs on port 5000, frontend on 3000.
- **Extend routes/controllers**: Add new features by creating new route/controller files and mounting them in `index.js`.
- **No database models yet**: Mongoose is installed, but no models are defined. Add models in `server/models/` as needed.

## Example: Adding a New API Route
1. Create a controller in `server/controller/` (e.g., `taskCtrl.js`).
2. Add a route in `server/routes/` (e.g., `taskRouter.js`).
3. Mount the router in `server/index.js` (e.g., `app.use('/task', taskRoute)`).

## References
- See `client/README.md` for React scripts and workflow.
- See `server/package.json` for backend scripts and dependencies.

---

**If any conventions or workflows are unclear, ask the user for clarification or examples.**
