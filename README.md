# Beta Signup Web App

A full-stack beta signup system built with **FastAPI (Python)**, **PostgreSQL**, and **Angular**.
The application implements an **invite code verification system** and a **beta waitlist**.

Users must first verify a valid invite code. After successful verification, they can submit their details to join the beta waitlist.

---

# Features

### Invite Code Verification

- 50 predefined invite codes stored in PostgreSQL
- API verifies if a code exists and is unused
- Valid codes are marked as **used** after verification
- Invalid or reused codes are rejected

### Beta Waitlist

- Users can submit **name and email**
- Data is stored in the database with timestamp
- Duplicate emails are prevented

### Backend

- Built using **FastAPI**
- Uses **SQLAlchemy ORM**
- PostgreSQL database
- Modular architecture with services and API layers

---

# Project Structure

```
server/
 ┣ app/
 ┃ ┣ api/
 ┃ ┃ ┣ v1/
 ┃ ┃ ┃ ┗ endpoints/
 ┃ ┃ ┃   ┣ invite.py
 ┃ ┃ ┃   ┗ beta.py
 ┃ ┃ ┗ router.py
 ┃ ┣ database/
 ┃ ┃ ┗ db.py
 ┃ ┣ models/
 ┃ ┃ ┣ invite_code.py
 ┃ ┃ ┗ beta_waitlist.py
 ┃ ┣ schemas/
 ┃ ┃ ┣ invite_code.py
 ┃ ┃ ┗ beta_waitlist.py
 ┃ ┣ services/
 ┃ ┃ ┣ invite_code.py
 ┃ ┃ ┗ beta_waitlist.py
 ┃ ┣ scripts/
 ┃ ┃ ┣ create_tables.py
 ┃ ┃ ┗ seed_codes.py
 ┃ ┗ main.py
 ┗ requirements.txt
```

---

# Setup Instructions

## 1. Clone the Repository

```
git clone <repository-url>
cd beta-signup-web/server
```

---

## 2. Create Virtual Environment

```
python -m venv venv
```

Activate it:

### Windows

```
venv\Scripts\activate
```

### Mac / Linux

```
source venv/bin/activate
```

---

## 3. Install Dependencies

```
pip install -r requirements.txt
```

If needed:

```
pip install email-validator
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the **server** directory.

Example:

```
DATABASE_URL=postgresql://username:password@localhost:5432/beta_app
```

---

## 5. Create Database Tables

Run:

```
python app/scripts/create_tables.py
```

This will create:

- `invite_codes`
- `beta_waitlist`

---

# How to Seed Invite Codes

The project includes a script that generates **50 secure random invite codes**.

Run:

```
python app/scripts/seed_codes.py
```

The script will:

- Generate unique codes
- Insert them into the `invite_codes` table
- Avoid duplicates

Example output:

```
50 invite codes inserted successfully
```

---

# Running the Backend Server

Start the FastAPI server:

```
uvicorn app.main:app --reload
```

Server will start at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

# API Endpoints

### Verify Invite Code

```
POST /invite/verify
```

Request:

```
{
  "code": "YOUR_INVITE_CODE"
}
```

Response:

```
{
  "is_valid": true,
  "message": "Invite code verified successfully"
}
```

---

### Join Beta Waitlist

```
POST /beta/join
```

Request:

```
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Response:

```
{
  "success": true,
  "message": "Successfully added to beta waitlist"
}
```

---

# Architecture Explanation

The backend follows a **layered architecture** to maintain separation of concerns.

### API Layer

Located in:

```
app/api/
```

Responsibilities:

- Define HTTP endpoints
- Handle request/response flow
- Validate data using schemas

Example:

```
POST /invite/verify
POST /beta/join
```

---

### Schema Layer

Located in:

```
app/schemas/
```

Uses **Pydantic models** to:

- Validate request data
- Structure API responses
- Enforce constraints such as valid email and string length

---

### Service Layer

Located in:

```
app/services/
```

Handles **business logic**, including:

- Verifying invite codes
- Marking codes as used
- Adding users to the beta waitlist
- Preventing duplicate email entries

---

### Model Layer

Located in:

```
app/models/
```

Defines database tables using **SQLAlchemy ORM**.

Tables:

**invite_codes**

| Column     | Description               |
| ---------- | ------------------------- |
| id         | Primary key               |
| code       | Unique invite code        |
| is_used    | Whether the code was used |
| created_at | Creation timestamp        |
| used_at    | When the code was used    |

**beta_waitlist**

| Column   | Description  |
| -------- | ------------ |
| id       | Primary key  |
| name     | User name    |
| email    | Unique email |
| added_at | Timestamp    |

---

### Database Layer

Located in:

```
app/database/db.py
```

Responsible for:

- Creating SQLAlchemy engine
- Managing database sessions
- Connecting to PostgreSQL

---

# Development Workflow

Typical request flow:

```
Client
   ↓
API Endpoint
   ↓
Pydantic Schema Validation
   ↓
Service Layer (Business Logic)
   ↓
SQLAlchemy Models
   ↓
PostgreSQL Database
```

---

# Demonstration Flow

1. User enters invite code
2. Backend verifies code from database
3. If valid → code marked as used
4. User submits name and email
5. User is added to beta waitlist

---

# Technologies Used

Backend:

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic

Frontend:

- Angular

---

# Future Improvements

- Rate limiting for invite verification
- Email confirmation system
- Admin dashboard for managing invite codes
- API authentication
