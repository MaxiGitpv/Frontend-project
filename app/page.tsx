"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Sidebar from "./components/Sidebar";
import styles from './components/Sidebar.module.css';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  // Simular una autenticación que durara 7 segundos)
  useEffect(() => {
    //verificamos si el usuario está autenticado, por ejemplo, revisando el token en localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Si está autenticado, redirigimos a la página de películas
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  return (
    <>
      <Header />
      <Banner />
        <div className={styles.containerMov} >
          <Movies />
        </div>
      
    </>
  );
};

export default HomePage;
