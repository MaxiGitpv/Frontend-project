"use client";
import { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import Image from "next/image";
import {Movie} from './interfaces/Movie';


export default function Banner() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/movies/popular",
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
          setMovies(data.results);
        } else {
          console.error("No results found in API response.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 7000); 

    return () => clearInterval(interval); 
  }, [movies]);

  if (loading) return <p>Loading...</p>;

  const currentMovie = movies[currentIndex];

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <h2>{currentMovie.title}</h2>
        <p>{currentMovie.overview}</p>
        <button className={styles.playButton}>Reproducir</button>
      </div>
        <div className={styles.bannerImage}>
          <Image
            src={`https://image.tmdb.org/t/p/w200${currentMovie.poster_path}`}
            alt={currentMovie.title || "No title"}
            width={400} 
            height={560}
            objectFit="cover" 
          />
        </div>
      
      <button
        className={styles.prevButton}
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + movies.length) % movies.length)
        }>
        ❮
      </button>
      <button
        className={styles.nextButton}
        onClick={() => setCurrentIndex((currentIndex + 1) % movies.length)}>
        ❯
      </button>
    </div>
  );
}
