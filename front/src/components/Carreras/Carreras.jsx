// src/components/Users/Users.js
import React from "react";
import Layout from "../Layout/Layout";
import CarrerasForm from "./CarrerasForm";

const Carreras = () => {
    return (
        <Layout>
            <h1>Modulo para Carreras</h1>
            <CarrerasForm /> {/* Aquí insertamos el formulario de creación de carreras */}
        </Layout>
    );
};

export default Carreras;
