from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router

app = FastAPI(
    title="Beta Signup API",
    description="Invite code verification and beta waitlist service",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Root endpoint


@app.get("/")
def root():
    return {"message": "Beta Signup API is running, version 1.0.0. Visit /docs for API documentation."}


# Include API routers
app.include_router(api_router)
