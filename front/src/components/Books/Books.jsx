// src/components/Users/Users.js
import React from "react";
import Layout from "../Layout/Layout";
import BooksForm from "./Booksform";

const Books = () => {
  return (
    <Layout>
      <h1>Modulo para Libros</h1>
      <BooksForm /> {/* Aquí insertamos el formulario de creación de libros */}
    </Layout>
  );
};

export default Books;
