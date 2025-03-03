// src/components/Users/Users.js
import React from "react";
import Layout from "../Layout/Layout";
import EstudianteForm from "./EstudianteForm";

const Estudiantes = () => {
    return (
        <Layout>
            <h1>Módulo para Estudiantes</h1>
            <EstudianteForm /> {/* Aquí insertamos el formulario de creación de estudiantes */}
        </Layout>
    );
};

export default Estudiantes;
