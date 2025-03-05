import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard/"; // Importar el Dashboard
import Users from "../components/Users/Users"; // Importar Usuarios
import Libros from "../components/Libros/Libros"; // Importar Libros
import Login from "../modules/Auth/Login"; // Importar Login
import Estudiantes from "../components/Estudiante/Estudiantes"; // Importar Estudiantes
import Autores from "../components/Autores/Autores"; // Importar Autores
import Carreras from "../components/Carreras/Carreras"; // Importar Carreras 
import Categorias from "../components/Categorias/Categorias"; // Importar Categorias 
import HomeDashboard from "../components/Dashboard/HomeDashboard"

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Página de login */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Las rutas internas del Dashboard */}
        <Route index element={<HomeDashboard />} /> {/* Ruta interna para Usuarios */}

        <Route path="autores" element={<Autores />} /> {/* Ruta interna para autores */}
        <Route path="categorias" element={<Categorias />} /> {/*Ruta interna para Categorias */}
        <Route path="carreras" element={<Carreras />} /> {/* Ruta interna para carreras */}
        <Route path="libros" element={<Libros />} /> {/* Ruta interna para Libros */}
        <Route path="users" element={<Users />} /> {/* Ruta interna para Usuarios */}
        <Route path="estudiantes" element={<Estudiantes />} /> {/* Ruta interna para estudiantes */}
      </Route>
    </Routes>
  );
};
export default RoutesApp;