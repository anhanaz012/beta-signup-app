from app.database.db import SessionLocal
from app.models.invite_code import InviteCode
import secrets
import string

NUM_CODES = 50
CODE_LENGTH = 12


def generate_invite_code():
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(CODE_LENGTH))


def seed_invite_codes():
    session = SessionLocal()
    inserted = 0

    try:
        while inserted < NUM_CODES:
            code = generate_invite_code()
            invite = InviteCode(code=code)

            try:
                session.add(invite)
                session.commit()
                inserted += 1
            except Exception:
                session.rollback()

        print(f"{inserted} invite codes inserted successfully")

    finally:
        session.close()


if __name__ == "__main__":
    seed_invite_codes()
