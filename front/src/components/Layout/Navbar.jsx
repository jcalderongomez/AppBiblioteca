import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Dashboard, Lock, Group, ModeEditOutline, Build, Book } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStyles } from "./LayoutStyle";  // Asegúrate de que la importación sea correcta

const Navbar = () => {
  const classes = useStyles();  // Aquí obtienes las clases


  return (
    <AppBar position="static">
      <Toolbar className={classes.navbarContainer}>
        {/* Título a la izquierda */}
        <Typography variant="h6">Panel de Administración: </Typography>

        {/* Menú de navegación con iconos y texto */}
        <div className={classes.navbarContainer}>
          <Button component={Link} to="/dashboard" color="inherit" startIcon={<Dashboard />}>
            Dashboard
          </Button>
          <Button component={Link} to="/dashboard/authors" color="inherit" startIcon={<ModeEditOutline />}>
            Autores
          </Button>
          <Button component={Link} to="/dashboard/carreras" color="inherit" startIcon={<Build />}>
            Carreras
          </Button>
          <Button component={Link} to="/dashboard/student" color="inherit" startIcon={<Group />}>
            Estudiantes
          </Button>
          <Button component={Link} to="/dashboard/libros" color="inherit" startIcon={<Book />}>
            Libros
          </Button>
          {/* <Button component={Link} to="/dashboard/libros" color="inherit" startIcon={<Book />}>
            Libros
          </Button> */}
          <Button component={Link} to="/dashboard/users" color="inherit" startIcon={<Lock />}>
            Usuarios
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
