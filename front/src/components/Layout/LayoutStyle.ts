import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#1e1e2f"// Fondo oscuro del Sidebar

  },

  drawer: {
    flexShrink: 0,
    transition: "width 0.3s ease-in-out",
    "& .MuiDrawer-paper": {
      transition: "width 0.3s ease-in-out",
      overflowX: "hidden",
      backgroundColor: "#1e1e2f",
      color: "white",
    },
  },
  listItem: {
    color: "white", // Hace que el texto de la lista sea blanco
    "& .MuiListItemIcon-root": {
      color: "white", // Hace que los íconos sean blancos
    },
  },
  drawerOpen: {
    width: 240,
  },

  drawerClose: {
    width: 60,
  },

  drawerContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
  },
  activeListItem: {
    backgroundColor: "#5C6BC0", // Azul claro
    "&:hover": {
      backgroundColor: "#3F51B5", // Azul más oscuro al pasar el mouse
    },
  },
  iconButton: {
    color: "white", // Aplica el color blanco
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: "white !important", // Fuerza el color blanco en los íconos
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },

  iconText: {
    color: "white",
    marginRight: "8px",
    fontSize: "14px",
  },
  
  iconStyle: {
    color: "white",
  },
}));
