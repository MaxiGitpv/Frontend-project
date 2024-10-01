"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from './register.module.css';
import Link from "next/link";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const resJSON = await res.json();
  
      if (res.ok) {
        // Redirigir a la página de login después del registro
        router.push("/auth/login");
      } else {
        alert(resJSON.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  });
  

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className={styles.form_font}>Registro de usuario</h1>
        <label htmlFor="username" className={styles.form_lab}></label>
        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: true,
          })}
        />
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
        <button className={styles.form_font}>Registrar</button>
        <div className={styles.register}>
        <p className={styles.form_fontt}>¿No tienes una cuenta?</p>
        <Link className={styles.register_link} href="/auth/login">
          Iniciar sesion
        </Link>
      </div>
      </form>
    </div>
  );
};

export default Register;
