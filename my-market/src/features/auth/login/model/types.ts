export interface LoginRequest {
  email: string
  password: string
}

export interface AuthPayload {
    found: boolean
    isMatch: boolean
    token: string
}

export interface LoginState {
  data: AuthPayload | null
  error: string | null
  loading: boolean
}