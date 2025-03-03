import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard/"; // Importar el Dashboard
import Users from "../components/Users/Users"; // Importar Usuarios
import Books from "../components/Books/Books"; // Importar Libros
import Login from "../modules/Auth/Login"; // Importar Login
import Students from "../components/Estudiante/Estudiantes"; // Importar Estudiantes
import Authors from "../components/Authors/Authors"; // Importar Autores
import Carreras from "../components/Carreras/Carreras"; // Importar Carreras 
import HomeDashboard from "../components/Dashboard/HomeDashboard"
const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Página de login */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Las rutas internas del Dashboard */}
        <Route index element={<HomeDashboard />} /> {/* Ruta interna para Usuarios */}
        
        <Route path="users" element={<Users />} /> {/* Ruta interna para Usuarios */}
        <Route path="books" element={<Books />} /> {/* Ruta interna para Libros */}
        <Route path="student" element={<Students />} /> {/* Ruta interna para estudiantes */}
        <Route path="authors" element={<Authors />} /> {/* Ruta interna para autores */}
        <Route path="carreras" element={<Carreras />} /> {/* Ruta interna para carreras */}
      </Route>
    </Routes>
  );
};
export default RoutesApp;