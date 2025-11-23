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

export type Role = "Administrador" | "Vendedor" | "Comprador" | "Por Definir";

export interface DecodedToken {
  id: number;
  name: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
  google_id?: string
}

export interface LoginState {
  data: AuthPayload | null;
  google_token: string | null;
  error: string | null;
  loading: boolean;
  userData: DecodedToken | null;
  getRole: PayloadPutRole | null;
  google_auth_fullfiled: boolean;
  roleSelected: boolean;
}

export interface PayloadPutRole {
  id: number,
  role_id: number
}