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

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const classes = useStyles(); // Aquí obtienes las clases

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, role: event.target.value });
  };

  const handleSubmit = (event: any) => {
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

    console.log("Formulario enviado:", formData);
    setFormData({ name: "", email: "", password: "", role: "" });
    setError(null); // Establecer el error como null después del envío
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.form} // Aplicamos el estilo 'form'
    >
      <TextField
        label="Nombre"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        required
        className={classes.body} // Aplicamos el estilo 'body'
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
        className={classes.body} // Aplicamos el estilo 'body'
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
        className={classes.body} // Aplicamos el estilo 'body'
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
        className={classes.button} // Aplicamos el estilo 'button'
      >
        Crear Usuario
      </Button>
    </form>
  );
};

export default UserForm;
