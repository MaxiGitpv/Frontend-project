"use client";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import {Movie} from './interfaces/Movie';

interface SidebarProps {
  movies: Movie[];
}

export default function Sidebar({ movies }: SidebarProps) {
  const [popularQuery, setPopularQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);

  // Filtrado en tiempo real por título y género
  useEffect(() => {
    let updatedFilteredMovies: Movie[] = movies; // Inicializar con todas las películas

    // Filtrar por título si hay consulta
    if (popularQuery) {
      updatedFilteredMovies = updatedFilteredMovies.filter((movie) =>
        movie.title && movie.title.toLowerCase().includes(popularQuery.toLowerCase())
      );
    }

    // Filtrar por género si se seleccionó alguno
    if (selectedGenre) {
      updatedFilteredMovies = updatedFilteredMovies.filter((movie) =>
        movie.genre_ids && movie.genre_ids.includes(selectedGenre)
      );
    }

    // Actualizar películas filtradas
    setFilteredMovies(updatedFilteredMovies); 
  }, [popularQuery, selectedGenre, movies]);

  const handlePopularSearch = () => {
    
    const updatedFilteredMovies = movies.filter((movie) =>
      movie.title && movie.title.toLowerCase().includes(popularQuery.toLowerCase())
    );
    setFilteredMovies(updatedFilteredMovies);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value === "" ? null : parseInt(e.target.value, 10);
    setSelectedGenre(selectedValue);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.searchContainer}>
        <h3>Buscar Películas Populares</h3>
        <input
          type="text"
          value={popularQuery}
          onChange={(e) => setPopularQuery(e.target.value)}
          placeholder="Buscar películas populares..."
          className={styles.input}
        />
        <button onClick={handlePopularSearch}>Buscar</button>
      </div>

      <div className={styles.searchContainer}>
        <div>
          
        </div>
        <h3>Filtrar por Género</h3>
        <select value={selectedGenre ?? ""} onChange={handleGenreChange} className={styles.input}>
          <option value="">Seleccionar género</option>
          <option value="28">Acción</option>
          <option value="12">Aventura</option>
          <option value="16">Animación</option>
          <option value="35">Comedia</option>
          <option value="80">Crimen</option>
          <option value="18">Drama</option>
          <option value="10749">Romance</option>
        </select>
      </div>
    </div>
  );
}
