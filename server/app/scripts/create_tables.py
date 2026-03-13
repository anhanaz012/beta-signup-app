from app.database.db import Base, engine
from app.models.beta_waitlist import BetaWaitlist
from app.models.invite_code import InviteCode


def create_tables():
    Base.metadata.create_all(engine)
    print("Tables created successfully")


if __name__ == "__main__":
    create_tables()
