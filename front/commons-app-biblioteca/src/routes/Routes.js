import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Users from "../components/Users/Users";
import Books from "../components/Books/Books";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usuarios" element={<Users />} />
      <Route path="/libros" element={<Books />} />
      <Route path="/estudiantes" element={<Estudiantes />} />
    </Routes>
  );
};

export default RoutesApp;
