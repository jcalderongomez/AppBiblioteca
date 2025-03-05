import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

import { EstudianteType } from "../../interfaces/EstudianteType";
import { CarreraType } from "../../interfaces/CarreraType";

const EstudianteForm = () => {
  const [estudiante, setEstudiante] = useState<EstudianteType>({
    ID: null,
    nombre: "",
    email: "",
    carrera: null, // Carrera inicia como null
  });

  const [estudiantesList, setEstudiantesList] = useState<EstudianteType[]>([]);
  const [carrerasList, setCarrerasList] = useState<CarreraType[]>([]);

  useEffect(() => {
    fetchCarreras();
    fetchEstudiantes();
  }, []);

  // Cargar carreras desde la API
  const fetchCarreras = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/carreras", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (Array.isArray(data.carreras)) {
        setCarrerasList(data.carreras);
      } else {
        console.error("Formato incorrecto de carreras:", data);
      }
    } catch (error) {
      console.error("Error al cargar las carreras:", error);
    }
  };

  // Cargar estudiantes desde la API
  const fetchEstudiantes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/estudiantes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      // Mapeamos la respuesta
      const estudiantesMapeados = data.map((est: any) => ({
        ID: est.id,
        nombre: est.nombre,
        email: est.email,
        carrera: est.carrera_relacionada
          ? {
              id: est.carrera_relacionada.id,
              nombre: est.carrera_relacionada.nombre,
            }
          : null,
      }));

      console.log("Estudiantes con carrera mapeada:", estudiantesMapeados);

      setEstudiantesList(estudiantesMapeados);
    } catch (error) {
      console.error("Error al cargar los estudiantes:", error);
    }
  };

  // Manejo del input general (nombre y email)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstudiante({ ...estudiante, [e.target.name]: e.target.value });
  };

  // Manejo del Select para carreras
  const handleSelectChange = (e: any) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedCarrera =
      carrerasList.find((c) => c.id === selectedId) || null;

    setEstudiante({
      ...estudiante,
      carrera: selectedCarrera, // Guardamos el objeto completo de la carrera
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Estudiante antes de enviar:", estudiante);

    // Verificar si es una actualización o un nuevo estudiante
    const isUpdating = estudiante.ID !== null && estudiante.ID !== undefined;
    const url = isUpdating
      ? `http://localhost:5000/api/estudiantes/${estudiante.ID}`
      : "http://localhost:5000/api/estudiantes";
    const method = isUpdating ? "PUT" : "POST";

    // Asegurar que solo enviamos el ID de la carrera
    const estudianteData = {
      nombre: estudiante.nombre,
      email: estudiante.email,
      carrera_id: estudiante.carrera ? estudiante.carrera.id : null, // Usamos carrera_id
    };

    try {
      const token = localStorage.getItem("token"); // Obtener token
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la
          "Content-Type": "application/json",
        },
        body: JSON.stringify(estudianteData),
      });

      const responseText = await response.text();

      if (response.ok) {
        console.log("Estudiante guardado con éxito:", responseText);
        await fetchEstudiantes(); // Recargar la lista de estudiantes
        setEstudiante({ ID: null, nombre: "", email: "", carrera: null }); // Resetear el formulario
      } else {
        console.error("Error al guardar el estudiante:", responseText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Eliminar estudiante
  const handleDelete = async (id: number | null) => {
    if (!id) return;

    try {
      const token = localStorage.getItem("token"); // Obtener token
      const response = await fetch(
        `http://localhost:5000/api/estudiantes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Agregar token en la
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        fetchEstudiantes();
        setEstudiantesList((prev) => prev.filter((est) => est.ID !== id));
      } else {
        console.error(
          "Error al eliminar el estudiante:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Editar estudiante
  const handleEdit = (est: EstudianteType) => {
    setEstudiante({
      ID: est.ID,
      nombre: est.nombre,
      email: est.email,
      carrera: est.carrera,
    });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={estudiante.nombre}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={estudiante.email}
          onChange={handleChange}
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="carrera-label">Carrera</InputLabel>
          <Select
            labelId="carrera-label"
            value={estudiante.carrera ? String(estudiante.carrera.id) : ""}
            onChange={handleSelectChange}
          >
            <MenuItem value="">
              <em>Selecciona una carrera</em>
            </MenuItem>
            {carrerasList.map((carrera) => (
              <MenuItem key={carrera.id} value={String(carrera.id)}>
                {carrera.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {estudiante.ID ? "Actualizar Estudiante" : "Guardar Estudiante"}
        </Button>
      </form>

      <h2 className="mt-5">Lista de Estudiantes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Carrera</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estudiantesList.length > 0 ? (
              estudiantesList.map((est) => (
                <TableRow key={est.ID}>
                  <TableCell>{est.nombre}</TableCell>
                  <TableCell>{est.email}</TableCell>
                  <TableCell>
                    {est.carrera ? est.carrera.nombre : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(est)}
                      style={{ marginRight: "10px" }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(est.ID)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay estudiantes registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EstudianteForm;
