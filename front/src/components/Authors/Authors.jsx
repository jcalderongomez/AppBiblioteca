// src/components/Users/Users.js
import React from "react";
import Layout from "../Layout/Layout";
import AuthorsForm from "./AuthorsForm";

const Carreras = () => {
    return (
        <Layout>
            <h1>Modulo para Autores</h1>
            <AuthorsForm /> {/* Aquí insertamos el formulario de creación de autores */}
        </Layout>
    );
};

export default Carreras;
