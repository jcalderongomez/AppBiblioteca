import React, { useState, useEffect } from "react";

import { CarreraType } from "../../interfaces/CarreraType"; // Importa la interfaz CarreraType
import { Button } from "@mui/material";

const CarrerasForm = () => {
  const [carrera, setCarrera] = useState<CarreraType>({
    id: undefined,
    nombre: "",
    descripcion: "",
  });

  const [carrerasList, setCarrerasList] = useState<CarreraType[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para mensajes de éxito

  // Cargar la lista de carreras cuando el componente se monta
  const fetchCarreras = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener token
      const response = await fetch("http://localhost:5000/api/carreras", {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data); // Verifica la estructura de la respuesta

      // Asegúrate de que la respuesta tiene la estructura correcta
      if (data.carreras && Array.isArray(data.carreras)) {
        setCarrerasList(data.carreras); // Establece las carreras en el estado
      } else {
        setError("Error al cargar las carreras.");
      }
    } catch (error) {
      console.error("Error al cargar las carreras:", error);
      setError("Error al cargar las carreras.");
    }
  };
  useEffect(() => {
    fetchCarreras(); // Llamar la función para obtener las carreras
  }, []); // Solo se ejecuta una vez al cargar el componente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarrera({
      ...carrera,
      [name]: value,
    });
  };

  const handleEdit = (id: number) => {
    const carreraToEdit = carrerasList.find((a) => a.id === id);

    if (carreraToEdit) {
      setCarrera(carreraToEdit);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita la recarga de la página

    const method = carrera.id ? "PUT" : "POST";
    const url = carrera.id
      ? `http://localhost:5000/api/carreras/${carrera.id}`
      : "http://localhost:5000/api/carreras";

    try {
      const token = localStorage.getItem("token"); // Obtener token
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carrera),
      });

      if (response.ok) {
        setSuccessMessage(
          carrera.id
            ? "Carrera actualizada con éxito!"
            : "Carrera creada con éxito!"
        );
        setError(null);
        setCarrera({ id: undefined, nombre: "", descripcion: "" });
        fetchCarreras(); // Actualiza la lista de carreras después de la operación
      } else {
        setError("Error al guardar la carrera.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error en la solicitud.");
    }
  };

  const handleDelete = async (id: number) => {
    console.log("eliminar:", id);
    if (id !== null) {
      
      const token = localStorage.getItem("token"); // Obtener token
      const response = await fetch(`http://localhost:5000/api/carreras/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la    
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCarrerasList((prevList) =>
          prevList.filter((carrera) => carrera.id !== id)
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
            value={carrera.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            className="form-control"
            value={carrera.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          {carrera.id ? "Actualizar Carrera" : "Guardar Carrera"}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrerasList.length > 0 ? (
            carrerasList.map((carrera) => (
              <tr key={carrera.id}>
                <td>{carrera.id}</td>
                <td>{carrera.nombre}</td>
                <td>{carrera.descripcion}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(carrera.id!)}
                    style={{ marginRight: "10px" }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(carrera.id!)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay carreras disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarrerasForm;
