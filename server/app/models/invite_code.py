# This Model is used to store invite codes
from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from app.database.db import Base


class InviteCode(Base):
    __tablename__ = "invite_codes"

    id = Column(Integer, primary_key=True)
    code = Column(String(12), unique=True, nullable=False)
    is_used = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    used_at = Column(DateTime, nullable=True)
