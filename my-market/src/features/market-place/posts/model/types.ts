export enum WorkStatus {
  PENDING = "pendiente",
  APPROVED = "aprobado",
  DISAPPROVED = "rechazado",
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
  allPosts: Post[];
  postList: Post[];
  wasChanged: boolean;
  updateState: "updating" | "updated" | "error" | null
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
  url: File | null | string
}

export interface UpdatePostRequest {
  id: number,
  category_id: number,
  title: string,
  description: string,
  price: number
}

export interface UpdateStatusRequest {
  id: number,
  status: WorkStatus
}
