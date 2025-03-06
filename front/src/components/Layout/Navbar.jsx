import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Dashboard, Lock, Group, ModeEditOutline, Build, Book } from "@mui/icons-material";

import KeyIcon from '@mui/icons-material/Key';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import ConstructionIcon from '@mui/icons-material/Construction';

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
          <Button component={Link} to="/dashboard/autores" color="inherit" startIcon={<ModeEditOutline />}>
            Autores
          </Button>
          <Button component={Link} to="/dashboard/carreras" color="inherit" startIcon={<Build />}>
            Carreras
          </Button>
          <Button component={Link} to="/dashboard/estudiantes" color="inherit" startIcon={<Group />}>
            Estudiantes
          </Button>
          <Button component={Link} to="/dashboard/libros" color="inherit" startIcon={<Book />}>
            Libros
          </Button>
          <Button component={Link} to="/dashboard/users" color="inherit" startIcon={<Lock />}>
            Users APP
          </Button>
          <Button component={Link} to="/dashboard/users" color="inherit" startIcon={<ConstructionIcon />}>
            Prestamos
          </Button>
          <Button component={Link} to="/dashboard/categorias" color="inherit" startIcon={<BookmarkBorder />}>
            Categorias
          </Button>
          <Button component={Link} to="/dashboard/logout" color="inherit" startIcon={<KeyIcon />}>
            Cerrar Sesión
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
