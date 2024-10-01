"use client";
import { useEffect, useState } from "react";
import styles from "./Movies.module.css";
import Image from "next/image";

// Definir la interfaz para los datos de las películas
interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    // Cargar favoritos de localStorage cuando se monta el componente
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Actualizar localStorage
  };

  if (favorites.length === 0) {
    return <p>No tienes películas favoritas.</p>;
  }

  return (
    <div>
      <h2>Mis Favoritos</h2>
      <div className={styles.movieGrid}>
        {favorites.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title || "No title"}
              layout="responsive"
              width={200}
              height={300}
            />
            <h3>{movie.title || "Untitled Movie"}</h3>
            <button
              onClick={() => removeFavorite(movie.id)}
              className={styles.removeButton}
            >
              Eliminar de Favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
