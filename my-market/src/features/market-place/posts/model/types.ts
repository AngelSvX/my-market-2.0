export enum WorkStatus {
  PENDING = "pendiente",
  APPROVED = "aprobado",
  DISAPPROVED = "desaprobado",
}

export interface Post {
  id: number;
  title: string;
  description: string;
  status: WorkStatus;
  price: string;
  created_at: string;
  category: string;
  url: string;
  name: string;
  email: string;
}

export interface PostState {
  postList: Post[];
  loading: boolean;
  error: string | null;
}

export interface CreatePostRequest {
  user_id: number
  category_id: number
  title: string
  description: string
  price: number
  status: WorkStatus
  url: string
}
