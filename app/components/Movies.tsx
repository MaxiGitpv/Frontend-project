"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Movies.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Movie } from "./interfaces/Movie";
import Sidebar from "./Sidebar";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const router = useRouter();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  // Verificación de autenticación
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("auth/login");
    }
  }, [router]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchMovies = async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/movies/popular?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching movies: ${response.statusText}`);
        }

        const data = await response.json();
        if (data && data.results) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
          setFilteredMovies((prevMovies) => [...prevMovies, ...data.results]); // Actualiza las películas filtradas
        } else {
          console.error("No results found in API response.");
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchMovies(page);
    }
  }, [isAuthenticated, page]);

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  const lastMovieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastMovieRef.current) {
      observer.observe(lastMovieRef.current);
    }

    return () => {
      if (lastMovieRef.current) {
        observer.unobserve(lastMovieRef.current);
      }
    };
  }, [lastMovieRef.current, loading]);

  if (!isAuthenticated) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerCard_Serch} >
        <Sidebar />
      </div>
      <div className={styles.movieGrid}>
        {filteredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={styles.movieCard}
            ref={index === filteredMovies.length - 1 ? lastMovieRef : null}>
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title || "No title"}
              layout="responsive"
              width={200}
              height={300}
            />
            <h3>{movie.title || "Untitled Movie"}</h3>
            <p>Fecha de estreno: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <button
              onClick={() => toggleFavorite(movie)}
              className={
                isFavorite(movie.id) ? styles.favButtonActive : styles.favButton
              }>
              {isFavorite(movie.id)
                ? "Eliminar de Favoritos"
                : "Agregar a Favoritos"}
            </button>
          </div>
        ))}
        {loading && <p>Cargando más películas...</p>}
      </div>
    </div>
  );
}
