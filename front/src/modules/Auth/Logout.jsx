import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Eliminar el token
    localStorage.removeItem("token");

    // Redirigir al login
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // No renderiza nada
};

export default Logout;
