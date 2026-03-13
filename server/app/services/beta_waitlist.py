from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.beta_waitlist import BetaWaitlist


def add_to_waitlist(db: Session, name: str, email: str):

    entry = BetaWaitlist(
        name=name,
        email=email
    )

    try:
        db.add(entry)
        db.commit()

        return {
            "success": True,
            "message": "Successfully added to beta waitlist"
        }

    except IntegrityError:
        db.rollback()

        return {
            "success": False,
            "message": "Email already registered for beta"
        }
