from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.database.db import SessionLocal
from app.schemas.beta_waitlist import BetaWaitlistInput, BetaWaitlistResponse
from app.services.beta_waitlist import add_to_waitlist

router = APIRouter(prefix="/beta", tags=["Beta Waitlist"])


@router.post("/join", response_model=BetaWaitlistResponse)
def join_beta(request: BetaWaitlistInput, db: Session = Depends(get_db)):
    return add_to_waitlist(db, request.name, request.email)
