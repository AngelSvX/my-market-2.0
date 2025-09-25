export interface Review {
  id: number,
  name: string,
  email: string,
  rating: number,
  comment: string,
  created_at: string
}

export interface ReviewState {
  comments: Review[];
  commentOpenId: number | null
  loading: boolean;
  error: string | null
}