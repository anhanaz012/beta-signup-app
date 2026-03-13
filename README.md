# Beta Signup App

A full-stack beta signup system. Users enter an invite code, and if valid, can join the beta waitlist.

---

## Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | Angular, Tailwind CSS  |
| Backend  | Python, FastAPI        |
| Database | PostgreSQL, SQLAlchemy |

---

## How It Works

1. User visits the app and enters an invite code
2. Backend checks if the code is valid and unused
3. If valid, the code is marked as used
4. User is taken to a Thank You page and can join the waitlist
5. User submits name and email to join the beta
6. Data is saved to the database (duplicate emails are rejected)

---

## Project Structure

```
beta-signup-app/
├── client/                        # Angular frontend
│   └── src/app/
│       ├── core/                  # Services, guards
│       ├── features/
│       │   ├── invite-code/       # Invite form + Thank You page
│       │   └── join-beta/         # Waitlist form
│       └── shared/                # Reusable components, models
│
└── server/                        # FastAPI backend
    └── app/
        ├── api/                   # Route definitions
        ├── models/                # Database tables
        ├── schemas/               # Request/response shapes
        ├── services/              # Business logic
        ├── database/              # DB connection
        └── scripts/               # Table creation, seeding
```

---

## Frontend Pages

| Route        | Page        | Description                            |
| ------------ | ----------- | -------------------------------------- |
| `/invite`    | Invite Code | Enter an invite code to get access     |
| `/thank-you` | Thank You   | Shown after a valid code is entered    |
| `/join-beta` | Join Beta   | Submit name and email to join waitlist |

The `/join-beta` route is protected — users who haven't verified a code are redirected to `/invite`.

---

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/anhanaz012/beta-signup-app
cd beta-signup-app/server
```

### 2. Create and activate virtual environment

```bash
python -m venv venv
source venv/Scripts/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add environment variables

Create a `.env` file in the `server/` directory:

```
DATABASE_URL="postgresql+psycopg2://<username>:<password>@<host>:<port>/<database_name>"
```

### 5. Create database tables

```bash
python -m app.scripts.create_tables
```

### 6. Seed invite codes

```bash
python -m app.scripts.seed_codes
```

This inserts 50 unique invite codes into the database.

### 7. Start the backend

```bash
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

---

## Frontend Setup

### 1. Go to the client directory

```bash
cd beta-signup-app/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
ng serve
```

Frontend runs at `http://localhost:4200`

---

## API Endpoints

### Verify Invite Code

```
POST /invite/verify
```

```json
// Request
{ "code": "YOUR_INVITE_CODE" }

// Response
{ "is_valid": true, "message": "Invite code verified successfully" }
```

### Join Beta Waitlist

```
POST /beta/join
```

```json
// Request
{ "name": "Ahmed Raza", "email": "ahmed@example.com" }

// Response
{ "success": true, "message": "Successfully added to beta waitlist" }
```

---

## Database Tables

**invite_codes**

| Column     | Description               |
| ---------- | ------------------------- |
| id         | Primary key               |
| code       | Unique invite code        |
| is_used    | Whether the code was used |
| created_at | When the code was created |
| used_at    | When the code was used    |

**beta_waitlist**

| Column   | Description      |
| -------- | ---------------- |
| id       | Primary key      |
| name     | User's name      |
| email    | Unique email     |
| added_at | Signup timestamp |
