from fastapi import FastAPI
from app.api.router import api_router

app = FastAPI(
    title="Beta Signup API",
    description="Invite code verification and beta waitlist service",
    version="1.0.0"
)

app.include_router(api_router)
