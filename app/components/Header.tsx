
"use client";

import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Mi Cine</div>
      <nav className={styles.navLinks}>
        <Link href="/">Inicio</Link>
        <Link href="/favorites">Favorites</Link>
        <Link href="/auth/login">Iniciar Sesión</Link> 
        <Link href="auth/register">Registrarse</Link> 
      </nav>
    </header>
  );
}
