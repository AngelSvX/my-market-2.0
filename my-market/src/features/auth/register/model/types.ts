export interface RegisterRequest {
  role_id: number;
  name: string;
  email: string;
  password: string;
}

export interface RegisterState {
  registerData: RegisterRequest | null;
  isDataFullfiled: boolean;
  isRoleFullfiled: boolean;
  isReadyToSend: boolean;
  loading: boolean;
  error: string | null;
  successful: string | null;
}