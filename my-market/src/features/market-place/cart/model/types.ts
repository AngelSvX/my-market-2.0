export interface Article{
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface CartState {
  articleList: Article[];
  loading: boolean;
  error: string | null
}