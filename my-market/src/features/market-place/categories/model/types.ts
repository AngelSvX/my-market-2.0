export interface Categorie{
  id: number,
  name: string
}

export interface CaterogiesState {
  categories: Categorie[],
  loading: boolean,
  error: string | null
}