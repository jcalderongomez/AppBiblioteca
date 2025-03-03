// src/components/Users/Users.js
import React from "react";
import Layout from "../Layout/Layout";
import AuthorsForm from "./AuthorsForm";

const Carreras = () => {
    return (
        <div>
            <h1>Modulo Autores</h1>
            <AuthorsForm /> {/* Aquí insertamos el formulario de creación de autores */}
        </div>
    );
};

export default Carreras;
