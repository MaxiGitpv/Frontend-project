
"use client"

export const checkUserAuthenticated = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/check-auth', {
        method: 'GET',
        credentials: 'include', 
      });
  
      if (!response.ok) {
        return false; 
      }
  
      const data = await response.json();
      return data; // Retorna los datos del usuario si está autenticado
    } catch (error) {
      console.error(error);
      return false; // Si hay un error, asumimos que no está autenticado
    }
  };
  