export interface Categorie{
  id: number,
  name: string
}

export interface CaterogiesState {
  categories: Categorie[],
  categorySelected: string | null
  wasAdded: boolean,
  loading: boolean,
  error: string | null
}