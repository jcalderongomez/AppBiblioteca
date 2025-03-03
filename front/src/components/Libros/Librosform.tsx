import React, { useState } from "react";

const LibrosForm = () => {
  const [student, setStudent] = useState({
    nombre: "",
    email: "",
    edad: "",
    grado: "",
    materia: "",
  });

  return (
    <div className="container mt-5">
      <form className="bg-light p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={student.nombre}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombre">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            className="form-control"
            value={student.nombre}
            // onChange={handleChange}
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

export default LibrosForm;
