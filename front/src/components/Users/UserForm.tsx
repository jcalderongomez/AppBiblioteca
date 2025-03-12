import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { useStyles } from "./UserStyles"; // Asegúrate de que la importación sea correcta
import { API_URL } from "../../config/config";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const classes = useStyles(); // Aquí obtienes las clases

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, role: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      setError("Todos los campos son requeridos.");
      return;
    }

    // Datos que se enviarán al backend
    const userData = {
      nombre: formData.name,
      email: formData.email,
      password_hash: formData.password, // Asegúrate de que coincide con lo que el backend espera
      rol: formData.role,
    };

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error en la creación del usuario");
      }

      const result = await response.json();
      console.log("Usuario creado:", result);

      // Limpiar formulario después del envío exitoso
      setFormData({ name: "", email: "", password: "", role: "" });
      setError(null);
    } catch (error) {
      console.error("❌ Error al enviar la solicitud:", error);
      setError("Hubo un error al crear el usuario.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Nombre"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        required
        className={classes.body}
      />
      <TextField
        label="Correo electrónico"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
        type="email"
        required
        className={classes.body}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        fullWidth
        type="password"
        required
        className={classes.body}
      />
      <FormControl fullWidth required>
        <InputLabel>Rol</InputLabel>
        <Select
          name="role"
          value={formData.role}
          onChange={handleRoleChange}
          label="Rol"
        >
          <MenuItem value="admin">Administrador</MenuItem>
          <MenuItem value="user">Usuario</MenuItem>
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Crear Usuario
      </Button>
    </form>
  );
};

export default UserForm;
