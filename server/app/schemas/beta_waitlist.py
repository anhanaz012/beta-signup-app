from pydantic import BaseModel, EmailStr, constr


class BetaWaitlistInput(BaseModel):
    email: EmailStr
    name: str = constr(min_length=3, max_length=100)


class BetaWaitlistResponse(BaseModel):
    success: bool
    message: str
