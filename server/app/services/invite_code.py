from sqlalchemy.orm import Session
from datetime import datetime
from app.models.invite_code import InviteCode


def verify_invite_code(db: Session, code: str):
    invite = db.query(InviteCode).filter(InviteCode.code == code).first()

    if not invite:
        return {
            "is_valid": False,
            "message": "Invalid invite code"
        }

    if invite.is_used:
        return {
            "is_valid": False,
            "message": "Invite code already used"
        }

    invite.is_used = True
    invite.used_at = datetime.utcnow()

    db.commit()

    return {
        "is_valid": True,
        "message": "Invite code verified successfully"
    }
