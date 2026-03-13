from fastapi import APIRouter
from app.api.v1.endpoints import invite, beta

api_router = APIRouter()

api_router.include_router(invite.router)
api_router.include_router(beta.router)
