import React, { useState, useEffect } from "react";
import { AuthorType } from "../../interfaces/AuthorType"; // Importa la interfaz AuthorType

const AuthorsForm = () => {
  const [author, setAuthor] = useState<AuthorType>({
    ID: null,
    nombre: "",
    biografia: "",
  });

  const [authorsList, setAuthorsList] = useState<AuthorType[]>([]);

  // Cargar la lista de autores cuando el componente se monta
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/authors");
        const data = await response.json();
        console.log(data); // Verifica la estructura de la respuesta
        setAuthorsList(data.authors); // Suponiendo que la respuesta tiene una propiedad 'authors'
      } catch (error) {
        console.error("Error al cargar los autores:", error);
      }
    };

    fetchAuthors(); // Llamar la función para obtener los autores
  }, []); // Solo se ejecuta una vez al cargar el componente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthor({
      ...author,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica si existe un ID para decidir si es actualización o creación
    const method = author.ID ? "PUT" : "POST";
    const url = author.ID
      ? `http://localhost:5000/api/authors/${author.ID}`
      : "http://localhost:5000/api/authors";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
      });

      if (response.ok) {
        const data = await response.json();
        if (method === "POST") {
          setAuthorsList((prevList) => [...prevList, data.author]); // Añadir el nuevo autor a la lista
        } else {
          // Actualizar la lista con el autor editado
          setAuthorsList((prevList) =>
            prevList.map((a) => (a.ID === data.author.ID ? data.author : a))
          );
        }

        // Limpiar el formulario después de la operación
        setAuthor({ ID: null, nombre: "", biografia: "" });
      } else {
        console.log("Error al guardar el autor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEdit = (ID: number) => {
    // Buscar el autor en la lista de autores por ID
    const authorToEdit = authorsList.find((a) => a.ID === ID);

    if (authorToEdit) {
      // Si el autor es encontrado, actualizar el formulario con sus datos
      setAuthor(authorToEdit);
    }
  };

  const handleDelete = async (ID: number) => {
    try {
      // Enviar solicitud DELETE al backend
      const response = await fetch(`http://localhost:5000/api/authors/${ID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, actualizamos la lista de autores
        const result = await response.json();
        console.log(result.message); // Mensaje de éxito de la eliminación

        // Actualizar el estado para eliminar el autor de la lista
        setAuthorsList((prevList) =>
          prevList.filter((author) => author.ID !== ID)
        );
      } else {
        // Si la eliminación no fue exitosa, mostrar error
        console.log("Error al eliminar el autor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={author.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="biografia">Biografía:</label>
          <input
            type="text"
            id="biografia"
            name="biografia"
            className="form-control"
            value={author.biografia}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {author.ID ? "Actualizar Autor" : "Guardar Autor"}
        </button>
      </form>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Biografía</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {authorsList.length > 0 ? (
            authorsList.map((author) => (
              <tr key={author.ID}>
                <td>{author.ID}</td>
                <td>{author.nombre}</td>
                <td>{author.biografia}</td>
                <td>
                  <button
                    className="btn btn-info mr-2"
                    onClick={() => handleEdit(author.ID!)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(author.ID!)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay autores disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorsForm;
