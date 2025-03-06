import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStyles } from "./LayoutStyle";
import MaterialUI from "../../Commons/MaterialUI";


const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const classes = useStyles();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <MaterialUI.Drawer
      variant="permanent"
      className={`${classes.drawer} ${open ? classes.drawerOpen : classes.drawerClose}`}
      classes={{ paper: open ? classes.drawerOpen : classes.drawerClose }}
    >
      <div className={classes.drawerContainer}>
        <MaterialUI.IconButton onClick={toggleSidebar} className={classes.iconButton}>
          <span className={classes.iconText}>Contraer</span>
          {open ? <MaterialUI.ChevronLeft /> : <MaterialUI.ChevronRight />}
        </MaterialUI.IconButton>
      </div>

      <MaterialUI.List>
        <MaterialUI.ListItem
          component={Link}
          to="/dashboard"
          className={location.pathname === "/dashboard" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.Dashboard className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Dashboard" />}
        </MaterialUI.ListItem>

        <MaterialUI.ListItem
          component={Link}
          to="/dashboard/autores"
          className={location.pathname === "/dashboard/autores" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.ModeEditOutlineIcon className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Autores" />}
        </MaterialUI.ListItem>

        <MaterialUI.ListItem
          component={Link}
          to="/dashboard/carreras"
          className={location.pathname === "/dashboard/carreras" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.Build className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Carreras" />}
        </MaterialUI.ListItem>

        <MaterialUI.ListItem
          component={Link}
          to="/dashboard/estudiantes"
          className={location.pathname === "/dashboard/estudiantes" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.GroupIcon className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Estudiantes" />}
        </MaterialUI.ListItem>
        <MaterialUI.ListItem
          component={Link}
          to="/dashboard/libros"
          className={location.pathname === "/dashboard/libros" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.BookSharp className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Libros" />}
        </MaterialUI.ListItem>
        <MaterialUI.ListItem
          component={Link}
          to="/dashboard/users"
          className={location.pathname === "/dashboard/users" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.LockIcon className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Users App" />}
        </MaterialUI.ListItem>
        <MaterialUI.ListItem
          component={Link}
          to="/dashboard/prestamos"
          className={location.pathname === "/dashboard/prestamos" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.ConstructionIcon className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Prestamos" />}
        </MaterialUI.ListItem>

        <MaterialUI.ListItem
          component={Link}
          to="/dashboard/categorias"
          className={location.pathname === "/dashboard/categorias" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.BookmarkBorder className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Categoria de Libros" />}
        </MaterialUI.ListItem>

        <MaterialUI.ListItem
          component={Link}
          to="/dashboard/logout"
          className={location.pathname === "/dashboard/logout" ? classes.activeListItem : classes.listItem}
        >
          <MaterialUI.ListItemIcon>
            <MaterialUI.KeyIcon className={classes.iconStyle} />
          </MaterialUI.ListItemIcon>
          {open && <MaterialUI.ListItemText primary="Cerrar sesion" />}
        </MaterialUI.ListItem>
      </MaterialUI.List>
    </MaterialUI.Drawer>
  );
};

export default Sidebar;
