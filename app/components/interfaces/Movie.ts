// interfaces/Movie.ts
export interface Movie {
    id: number;
    title: string;
    genre_ids: number[];
    poster_path?: string; // Agrega las propiedades que necesitas
    release_date?: string;
    vote_average?: number;
  }
  