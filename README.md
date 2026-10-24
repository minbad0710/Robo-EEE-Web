# Team Robo@EEE

Website for Team Robo@EEE, the competition robotics team of NTU's School of Electrical and Electronic Engineering.

| Folder | What it is | Details |
| --- | --- | --- |
| [`frontend/`](frontend) | The website: React + Vite + Tailwind, deployed on Vercel | [frontend/README.md](frontend/README.md) |
| [`backend/`](backend) | The API for the Team page: Node.js + Express + MongoDB, photos on Cloudinary | [backend/README.md](backend/README.md) |

## Running it locally

```bash
cd backend && yarn install && yarn dev     # API on http://localhost:5000 (needs backend/.env, see .env.example)
cd frontend && yarn install && yarn dev    # site on http://localhost:5173
```

## Deploying

- **Frontend (Vercel):** the project's Root Directory must be `frontend` (Vercel → Settings → Build & Deployment). Set `VITE_API_URL` to the deployed API's URL, e.g. `https://<api-host>/api`.
- **Backend:** host it on any Node.js host with the variables from `backend/.env.example`, and add the site's URL to `CLIENT_ORIGIN`.
