# Robo@EEE API

Backend for the Team Robo website: Node.js + Express 5 + Mongoose, with data stored in MongoDB Atlas.

## Setup

```bash
yarn install
cp .env.example .env   # then fill in the real values
yarn dev               # restarts on file changes (http://localhost:5000)
yarn start             # without auto-restart
yarn seed              # load the roster in seed/teamMembers.data.js (see "Seeding the roster")
```

If the MongoDB password contains special characters, URL-encode them in `DATABASE` (`@` becomes `%40`).

## Deploying on Vercel

The API runs on Vercel as its own project, from the same GitHub repo as the website. Vercel detects `server.js` as an Express app; no extra configuration is needed.

1. **MongoDB Atlas → Network Access:** allow access from anywhere (`0.0.0.0/0`). Vercel has no fixed IP address, so Atlas can't allow just Vercel. The database is then protected by its username and password only, so use a long random password.
2. **Vercel → Add New → Project:** import the repo, set **Root Directory** to `backend` (the Framework Preset shows Express).
3. **Environment Variables:** the ones in `.env.example`, except `PORT`. `CLIENT_ORIGIN` is the website's address, e.g. `https://<site>.vercel.app` (add a custom domain comma-separated). Changing a variable later needs a redeploy.
4. Deploy, then open `https://<api>.vercel.app/api/health`. It should show `{"status":"ok","database":"connected"}`.
5. In the **website's** Vercel project, set `VITE_API_URL` to `https://<api>.vercel.app/api` and redeploy it.

Each push to `main` redeploys both projects.

## Folders

| Folder | What goes in it |
| --- | --- |
| `config/` | Database connection |
| `models/` | Mongoose schemas (the shape of each collection) |
| `services/` | Database queries |
| `controllers/` | Read the request, call a service, send the response |
| `routes/` | Match URLs to controllers |
| `middlewares/` | Admin key check, 404 and error responses |
| `helper/` | Photo uploads to Cloudinary |
| `utils/` | Small shared helpers |
| `seed/` | The team roster and the script that loads it into the database |

## Endpoints

All under `/api`. `GET` requests are public. `POST`, `PATCH` and `DELETE` need the `ADMIN_API_KEY` from `.env` in an `x-api-key` header.

| Method | Path | Does |
| --- | --- | --- |
| GET | `/health` | Server and database status |
| GET | `/team-members` | All members. Optional filters: `?year=AY26/27&department=software` |
| GET | `/team-members/:id` | One member |
| POST | `/team-members` | Add a member (optionally with a photo) |
| PATCH | `/team-members/:id` | Change some fields of a member, or replace their photo |
| DELETE | `/team-members/:id/photo` | Remove a member's photo (back to the default avatar) |
| DELETE | `/team-members/:id` | Remove a member and their photo |

A member has `year` (e.g. `AY26/27`), `department`, `name`, `role` (several can be listed comma-separated, e.g. `Team Lead, Software Lead`; the first one decides the card's position), and optional `github`, `linkedin`, `website` (full `https://` links) and `photo`. `department` is one of `leads`, `software`, `hardware`, `business`, `finance`, `branding` (the Team page tabs) or `advisors` (the Advisors section).

Someone in several departments has one member per department, e.g. every lead and co-lead has one in `leads` and one in their own department. The list endpoint returns members in the order the cards appear in (`utils/memberOrder.util.js`): newest year first, then in each department the Team Lead and Deputy Lead, then the leaders (leads and co-leads), then everyone else. In `leads`, the leaders follow the order of the department tabs (Software, Hardware, Business Development, …); a Leads card counts as the department where the same person has the same role. Within each of those, members are grouped by division, which is read from the role: "Software Perception Co-Lead" and "Software Perception Member" are both in "Software Perception". A division's lead comes right before its co-lead (Hardware Lead, then Hardware Co-Lead), and members follow the same division order as their leaders. Anything still tied keeps the order it was added.

Example: add a member

```bash
curl -X POST http://localhost:5000/api/team-members \
  -H "Content-Type: application/json" \
  -H "x-api-key: <ADMIN_API_KEY>" \
  -d '{"year":"AY26/27","department":"software","name":"Jessica Carter","role":"Perception Developer"}'
```

### Member photos

Photos are stored on Cloudinary (folder `robo-eee/team`). MongoDB only keeps the link (`photo`) and Cloudinary's id for it (`photoPublicId`). To add or replace a photo, send the request as `multipart/form-data` with the image in a `photo` field (JPG, PNG or WebP, up to 4 MB, because Vercel rejects requests over 4.5 MB):

```bash
curl -X POST http://localhost:5000/api/team-members \
  -H "x-api-key: <ADMIN_API_KEY>" \
  -F "year=AY26/27" -F "department=software" -F "name=Jessica Carter" -F "role=Perception Developer" \
  -F "photo=@jessica.jpg"
```

`photo` can't be set to a link directly in the request body. It only changes through an upload, so every stored link points to an image this API manages. When a photo is replaced, removed, or its member is deleted, the old image is deleted from Cloudinary too, unless another member still uses it (the seed gives everyone one photo, shared by all of their departments).

### Seeding the roster

`seed/teamMembers.data.js` holds the AY26/27 roster: everyone once with their links and photo file, then each department's list of `[name, role]` in card order. Photos are read from the `Photo` folder next to `backend/`.

```bash
yarn seed           # adds the roster; stops if that year already has members
yarn seed --reset   # deletes that year's members and their photos first, then adds the roster again
```

`--reset` also wipes any changes made to that year through the API, so once the team edits members through the API, make further changes there instead of re-seeding.

Errors come back as JSON with a `message` (and an `errors` object per field when validation fails).
