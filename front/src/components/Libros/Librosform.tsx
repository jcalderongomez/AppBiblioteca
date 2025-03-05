import React, { useState, useEffect } from "react";
import { LibroType } from "../../interfaces/LibroType";
import { AutorType } from "../../interfaces/AutorType";
import { CategoriaType } from "../../interfaces/CategoriaType";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

const LibroForm = () => {
  const [libro, setLibro] = useState<LibroType>({
    id: null,
    titulo: "",
    id_categoria: null,
    categoria: "",
    anio_publicacion: null,
    cantidad_disponible: null,
    id_autor: null,
    autor: "",
  });

  const [autoresList, setAutoresList] = useState<AutorType[]>([]);
  const [categoriaList, setCategoriaList] = useState<CategoriaType[]>([]);
  const [libroList, setLibrosList] = useState<LibroType[]>([]);
  useEffect(() => {
    fetchAutores();
    fetchCategorias();
    fetchLibros();
  }, []);

  const fetchAutores = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/autores", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (Array.isArray(data.autores)) {
        setAutoresList(data.autores);
      } else {
        console.error("Formato incorrecto de autores:", data);
      }
    } catch (error) {
      console.error("Error al cargar los autores:", error);
    }
  };

  const fetchLibros = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/libros", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Datos de libros recibidos:", data);
      setLibrosList(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error al cargar los libros:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (Array.isArray(data.categorias)) {
        setCategoriaList(data.categorias);
      } else {
        console.error("Formato incorrecto de categorías:", data);
      }
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLibro((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    e: SelectChangeEvent<string>,
    field: "AutorId" | "CategoriaId"
  ) => {
    const selectedId = Number(e.target.value);
    if (field === "AutorId") {
      const selectedAutor = autoresList.find((a) => a.id === selectedId);
      setLibro((prev) => ({
        ...prev,
        id_autor: selectedId,
        autor: selectedAutor ? selectedAutor.nombre : "",
      }));
    } else {
      const selectedCategoria = categoriaList.find((c) => c.id === selectedId);
      setLibro((prev) => ({
        ...prev,
        id_categoria: selectedId,
        categoria: selectedCategoria ? selectedCategoria.nombre : "",
      }));
    }
  };

  const handleEdit = (id: number) => {
    const libroToEdit = libroList.find((l) => l.id === id);
    console.log("Editando libro:", libroToEdit);
    if (libroToEdit) {
      setLibro(libroToEdit);
    }
  };

  const handleDelete = async (ID: number) => {
    try {
      const token = localStorage.getItem("token"); // Obtener token
      // Enviar solicitud DELETE al backend
      const response = await fetch(`http://localhost:5000/api/libros/${ID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, actualizamos la lista de libros
        const result = await response.json();
        console.log(result.message); // Mensaje de éxito de la eliminación

        // Actualizar el estado para eliminar el libro de la lista
        setLibrosList((prevList) =>
          prevList.filter((libro) => libro.id !== ID)
        );
      } else {
        // Si la eliminación no fue exitosa, mostrar error
        console.log("Error al eliminar el autor");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/libros/${libro.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              titulo: libro.titulo,
              id_categoria: libro.id_categoria,
              id_autor: libro.id_autor,
              cantidad_disponible: libro.cantidad_disponible,
              anio_publicacion: libro.anio_publicacion,
            }),
          }
        );

        if (response.ok) {
          const updatedLibro = await response.json();
          console.log("Libro actualizado:", updatedLibro);

          // Actualizar la lista de libros sin necesidad de recargar la página
          setLibrosList((prevList) =>
            prevList.map((item) =>
              item.id === updatedLibro.id ? updatedLibro : item
            )
          );

          // Limpiar el formulario
          setLibro({
            id: null,
            titulo: "",
            id_categoria: null,
            categoria: "",
            anio_publicacion: null,
            cantidad_disponible: null,
            id_autor: null,
            autor: "",
          });
        } else {
          console.error("Error al actualizar el libro");
        }
      } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
      }
    };
  };
  return (
    <div className="container mt-5">
      <form className="bg-light p-4 rounded shadow">
        <TextField
          fullWidth
          label="Título"
          name="titulo"
          value={libro.titulo}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="categoria-label">Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            value={libro.id_categoria ? String(libro.id_categoria) : ""}
            onChange={(e) => handleSelectChange(e, "CategoriaId")}
          >
            <MenuItem value="">
              <em>Selecciona una categoría</em>
            </MenuItem>
            {categoriaList.map((categoria) => (
              <MenuItem key={categoria.id} value={String(categoria.id)}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="autor-label">Autor</InputLabel>
          <Select
            labelId="autor-label"
            value={libro.id_autor ? String(libro.id_autor) : ""}
            onChange={(e) => handleSelectChange(e, "AutorId")}
          >
            <MenuItem value="">
              <em>Selecciona un autor</em>
            </MenuItem>
            {autoresList.map((autor) => (
              <MenuItem key={autor.id} value={String(autor.id)}>
                {autor.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Cantidad Disponible"
          name="cantidad_disponible"
          type="number"
          value={libro.cantidad_disponible || ""}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!libro.titulo || !libro.id_autor || !libro.id_categoria}
        >
          {libro.id ? "Actualizar Libro" : "Guardar Libro"}
        </button>
      </form>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Autor</th>
            <th>Fecha publicación</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libroList.length > 0 ? (
            libroList.map((libro) => (
              <tr key={libro.id}>
                <td>{libro.id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.categoria}</td>
                <td>{libro.autor}</td>
                <td>
                  {libro.anio_publicacion?.toString() || "Fecha desconocida"}
                </td>
                <td>{libro.cantidad_disponible}</td>
                <td>
                  <button
                    className="btn btn-info mr-2"
                    onClick={() => handleEdit(libro.id!)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(libro.id!)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay libros disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LibroForm;
