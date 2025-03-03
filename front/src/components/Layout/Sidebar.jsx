import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Dashboard, ChevronLeft, ChevronRight, People, Build, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true); // Controla el estado de apertura/cierre

  const toggleSidebar = () => {
    setOpen(!open); // Alterna entre abierto y cerrado
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60, // El ancho cambia dependiendo del estado
        flexShrink: 0,
        transition: "width 0.3s", // Transición suave para la expansión y contracción
        "& .MuiDrawer-paper": {
          width: open ? 240 : 60,
          transition: "width 0.3s",
          overflowX: "hidden", // Evita el desbordamiento
        },
      }}
    >
      {/* Botón para alternar la apertura y cierre del Sidebar */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={toggleSidebar}>
          {open ? <ChevronLeft /> : <ChevronRight />} {/* Icono para cerrar o abrir */}
        </IconButton>
      </div>

      <List>
      <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><Dashboard /></ListItemIcon>
          {open && <ListItemText primary="Dashboard" />} {/* Texto solo cuando está abierto */}
        </ListItem>
        <ListItem button component={Link} to="/dashboard/users">
          <ListItemIcon><People /></ListItemIcon>
          {open && <ListItemText primary="Usuarios" />} {/* Texto solo cuando está abierto */}
        </ListItem>
        <ListItem button component={Link} to="/dashboard/student">
          <ListItemIcon><Person /></ListItemIcon>
          {open && <ListItemText primary="Estudiantes" />} {/* Texto solo cuando está abierto */}
        </ListItem>
        <ListItem button component={Link} to="/dashboard/authors">
          <ListItemIcon><Person /></ListItemIcon>
          {open && <ListItemText primary="Autores" />} {/* Texto solo cuando está abierto */}
        </ListItem>
        <ListItem button component={Link} to="/dashboard/carreras">
          <ListItemIcon><Build /></ListItemIcon>
          {open && <ListItemText primary="Carreras" />} {/* Texto solo cuando está abierto */}
        </ListItem>
        
        {/* Agrega más elementos aquí si lo necesitas */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
