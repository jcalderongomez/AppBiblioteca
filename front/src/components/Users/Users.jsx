// src/components/Users/Users.js
import React from "react";
import Layout from "../Layout/Layout";
import UserForm from "./UserForm"; // Asegúrate de importar el formulario

const Users = () => {
  return (
    <Layout>
      <h1>Modulo para Usuarios</h1>
      <UserForm /> {/* Aquí insertamos el formulario de creación de usuarios */}
    </Layout>
  );
};

export default Users;
