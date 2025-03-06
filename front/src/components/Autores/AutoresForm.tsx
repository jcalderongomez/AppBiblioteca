import React, { useState, useEffect } from "react";
import { AutorType } from "../../interfaces/AutorType"; // Importa la interfaz AuthorType
import MaterialUI from "../../Commons/MaterialUI";

const AutoresForm = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [autor, setAuthor] = useState<AutorType>({
    id: null,
    nombre: "",
    nacionalidad: "",
    fecha_nacimiento: "",
  });

  const [autoresList, setAutoresList] = useState<AutorType[]>([]);

  // Cargar la lista de autores cuando el componente se monta
  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener token

        const response = await fetch("http://localhost:5000/api/autores", {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar token en la cabecera
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data); // Verifica la estructura de la respuesta
        setAutoresList(data.autores); // Suponiendo que la respuesta tiene una propiedad 'autores'
      } catch (error) {
        console.error("Error al cargar los autores:", error);
      }
    };

    fetchAutores(); // Llamar la función para obtener los autores
  }, []); // Solo se ejecuta una vez al cargar el componente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAuthor((prev) => ({
      ...prev,
      [name]:
        name === "fecha_nacimiento" ? new Date(value).toISOString() : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica si existe un id para decidir si es actualización o creación
    const method = autor.id ? "PUT" : "POST";
    const url = autor.id
      ? `http://localhost:5000/api/autores/${autor.id}`
      : "http://localhost:5000/api/autores";

    try {
      const token = localStorage.getItem("token"); // Obtener token

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
          "Content-Type": "application/json",
        },
        body: JSON.stringify(autor),
      });

      if (response.ok) {
        const data = await response.json();
        if (method === "POST") {
          setAutoresList((prevList) => [...prevList, data.autor]); // Añadir el nuevo autor a la lista
        } else {
          // Actualizar la lista con el autor editado
          setAutoresList((prevList) =>
            prevList.map((a) => (a.id === data.autor.id ? data.autor : a))
          );
        }

        // Limpiar el formulario después de la operación
        setAuthor({
          id: null,
          nombre: "",
          nacionalidad: "",
          fecha_nacimiento: "",
        });
      } else {
        console.log("Error al guardar el autor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEdit = (id: number) => {
    // Buscar el autor en la lista de autores por id
    const autorToEdit = autoresList.find((a) => a.id === id);

    if (autorToEdit) {
      // Si el autor es encontrado, actualizar el formulario con sus datos
      setAuthor(autorToEdit);
    }
  };

  const handleDelete = async (ID: number) => {
    try {
      const token = localStorage.getItem("token"); // Obtener token
      // Enviar solicitud DELETE al backend
      const response = await fetch(`http://localhost:5000/api/autores/${ID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, actualizamos la lista de autores
        const result = await response.json();
        console.log(result.message); // Mensaje de éxito de la eliminación

        // Actualizar el estado para eliminar el autor de la lista
        setAutoresList((prevList) =>
          prevList.filter((autor) => autor.id !== ID)
        );
      } else {
        // Si la eliminación no fue exitosa, mostrar error
        setErrorMessage("Error al eliminar el autor.");
        setOpen(true);
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
            value={autor.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nacionalidad">Nacionalidad:</label>
          <input
            type="text"
            id="nacionalidad"
            name="nacionalidad"
            className="form-control"
            value={autor.nacionalidad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">fecha de nacimiento:</label>
          <input
            type="date"
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            className="form-control"
            value={
              autor.fecha_nacimiento
                ? new Date(autor.fecha_nacimiento).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {autor.id ? "Actualizar Autor" : "Guardar Autor"}
        </button>
      </form>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nacionalidad</th>
            <th>Fecha Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autoresList.length > 0 ? (
            autoresList.map((autor) => (
              <tr key={autor.id}>
                <td>{autor.id}</td>
                <td>{autor.nombre}</td>
                <td>{autor.nacionalidad}</td>
                <td>
                  {new Date(autor.fecha_nacimiento).toISOString().split("T")[0]}
                </td>
                <td>
                  <button
                    className="btn btn-info mr-2"
                    onClick={() => handleEdit(autor.id!)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(autor.id!)}
                  >
                    Eliminar
                  </button>
                  <MaterialUI.Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                  >
                    <MaterialUI.Alert severity="error" onClose={() => setOpen(false)}>
                      {errorMessage}
                    </MaterialUI.Alert>
                  </MaterialUI.Snackbar>
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

export default AutoresForm;
