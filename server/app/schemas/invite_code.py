from pydantic import BaseModel, constr


class InviteCodeVerification(BaseModel):
    code: str = constr(min_length=4, max_length=12)


class CodeVerifyResponse(BaseModel):
    is_valid: bool
    message: str
