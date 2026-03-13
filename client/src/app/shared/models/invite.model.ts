export interface InviteCodeVerification {
  code: string;
}

export interface CodeVerifyResponse {
  is_valid: boolean;
  message: string;
}
