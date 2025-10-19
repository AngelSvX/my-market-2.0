export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthPayload {
  response: {
    found: boolean;
    isMatch: boolean;
    token: string;
  };
}

export type Role = "Administrador" | "Vendedor" | "Comprador";

export interface DecodedToken {
  id: number;
  name: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface LoginState {
  data: AuthPayload | null;
  error: string | null;
  loading: boolean;
  userData: DecodedToken | null;
}
