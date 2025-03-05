import React, { useState, useEffect } from "react";
import { CategoriaType } from "../../interfaces/CategoriaType"; // Importa la interfaz CategoriaType

const CategoriasForm = () => {
  const [categoria, setCategoria] = useState<CategoriaType>({
    id: null,
    nombre: "",
  });
  const [categoriasList, setCategoriasList] = useState<CategoriaType[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para mensajes de éxito

  // Cargar la lista de categorias cuando el componente se monta
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener token
        const response = await fetch("http://localhost:5000/api/categorias", {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar token en la cabecera
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data); // Verifica la estructura de la respuesta
        setCategoriasList(data.categorias); // Suponiendo que la respuesta tiene una propiedad 'categorias'
      } catch (error) {
        console.error("Error al cargar las categorias:", error);
      }
    };

    fetchCategorias(); // Llamar la función para obtener los categorias
  }, []); // <- Esto evita el loop infinito

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoria.id) {
      console.warn(
        "No se detectó un id válido, se creará una nueva categoría."
      );
    } else {
      console.log(`Intentando actualizar la categoría con id: ${categoria.id}`);
    }

    const method = categoria.id ? "PUT" : "POST";
    const url = categoria.id
      ? `http://localhost:5000/api/categorias/${categoria.id}`
      : "http://localhost:5000/api/categorias";

    try {
      const token = localStorage.getItem("token"); // Obtener token
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      });

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (!data || !data.categoria) {
        console.error("Error: Respuesta inesperada del backend", data);
        return;
      }

      if (method === "POST") {
        console.log("Creando nueva categoría:", data.categoria);
        setCategoriasList((prevList) => [...prevList, data.categoria]);
      } else {
        console.log("Actualizando categoría existente:", data.categoria);
        setCategoriasList((prevList) =>
          prevList.map((a) => (a.id === data.categoria.id ? data.categoria : a))
        );
      }

      setCategoria({ id: null, nombre: "" }); // Limpiar formulario
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value,
    });
  };

  const handleEdit = (id: number) => {
    // Buscar la categoria en la lista de categorias por id
    const categoriaToEdit = categoriasList.find((a) => a.id === id);

    if (categoriaToEdit) {
      // Si la categoria encontrada, actualizar el formulario con sus datos
      setCategoria(categoriaToEdit);
    }
  };

  const handleDelete = async (id: number) => {
    console.log("eliminar:", id);
    if (id !== null) {
      const token = localStorage.getItem("token"); // Obtener token
      const response = await fetch(`http://localhost:5000/api/categorias/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCategoriasList((prevList) =>
          prevList.filter((categoria) => categoria.id !== id)
        );
        setSuccessMessage("Carrera eliminada exitosamente!");
      } else {
        setError("Error al eliminar la carrera.");
      }
    } else {
      setError("ID es null, no se puede eliminar la carrera.");
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
            value={categoria.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {categoria.id ? "Actualizar Categoria" : "Guardar Categoria"}
        </button>
      </form>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categoriasList.length > 0 ? (
            categoriasList.map((categoria) => (
              <tr key={categoria.id ?? crypto.randomUUID()}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <button
                    className="btn btn-info mr-2"
                    onClick={() => handleEdit(categoria.id!)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(categoria.id!)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay categorias disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriasForm;
