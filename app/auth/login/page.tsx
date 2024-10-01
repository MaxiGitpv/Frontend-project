"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from './login.module.css';
import Link from "next/link";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const resJSON = await res.json();
  
      if (res.ok) { 
        localStorage.setItem("authToken", resJSON.access_token); 
        router.push("/");
      } else {
        alert(resJSON.message || "Error de autenticación");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  });
  
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className={styles.form_font}>Iniciar Sesión</h1>
        <label htmlFor="email" className={styles.form_lab}></label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
        />
        <label htmlFor="password" className={styles.form_lab}></label>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />
        <button className={styles.form_font}>Iniciar Sesión</button>
        <div className={styles.register}>
        <p className={styles.form_fontt}>¿No tienes una cuenta?</p>
        <Link className={styles.register_link} href="/auth/register">
          Registrarse
        </Link>
      </div>
      </form>
    </div>
  );
};

export default Login;
