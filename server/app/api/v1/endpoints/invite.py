from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.schemas.invite_code import InviteCodeVerification, CodeVerifyResponse
from app.services.invite_code import verify_invite_code

router = APIRouter(prefix="/invite", tags=["Invite"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/verify", response_model=CodeVerifyResponse)
def verify_invite(request: InviteCodeVerification, db: Session = Depends(get_db)):
    return verify_invite_code(db, request.code)
