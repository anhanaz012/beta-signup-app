from sqlalchemy import Column, String, DateTime, Integer, func
from app.database.db import Base


class BetaWaitlist(Base):
    __tablename__ = "beta_waitlist"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, index=True)
    email = Column(String(254), unique=True, nullable=False)
    added_at = Column(DateTime, default=func.now(), nullable=False)
