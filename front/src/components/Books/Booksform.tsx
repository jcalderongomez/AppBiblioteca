import React, { useState } from "react";

const BooksForm = () => {
  const [student, setStudent] = useState({
    nombre: "",
    email: "",
    edad: "",
    grado: "",
    materia: "",
  });

  // Manejador de cambio para actualizar el estado del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del estudiante enviados:", student);

    // Limpiar el formulario después del envío
    setStudent({
      nombre: "",
      email: "",
      edad: "",
      grado: "",
      materia: "",
    });
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
            value={student.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            className="form-control"
            value={student.edad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grado">Grado:</label>
          <input
            type="text"
            id="grado"
            name="grado"
            className="form-control"
            value={student.grado}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="materia">Materia:</label>
          <input
            type="text"
            id="materia"
            name="materia"
            className="form-control"
            value={student.materia}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Guardar Estudiante
        </button>
      </form>
    </div>
  );
};

export default BooksForm;
