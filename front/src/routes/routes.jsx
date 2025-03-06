import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard/"; // Importar el Dashboard
import Users from "../components/Users/Users"; // Importar Usuarios
import Libros from "../components/Libros/Libros"; // Importar Libros
import Login from "../modules/Auth/Login"; // Importar Login
import Logout from "../modules/Auth/Logout"; // Importar Login
import Estudiantes from "../components/Estudiante/Estudiantes"; // Importar Estudiantes
import Autores from "../components/Autores/Autores"; // Importar Autores
import Carreras from "../components/Carreras/Carreras"; // Importar Carreras 
import Categorias from "../components/Categorias/Categorias"; // Importar Categorias 

import Prestamos from "../components/Prestamos/Prestamos"; // Importar Categorias 
import HomeDashboard from "../components/Dashboard/HomeDashboard"
import PrivateRoute from "./PrivateRoute"
const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Página de login */}
      {/* Rutas privadas */}
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<HomeDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="libros" element={<Libros />} />
            <Route path="estudiantes" element={<Estudiantes />} />
            <Route path="autores" element={<Autores />} />
            <Route path="carreras" element={<Carreras />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="prestamos" element={<Prestamos />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>

      </Route>

    </Routes>
  );
};
export default RoutesApp;