import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Dashboard, ChevronLeft, ChevronRight, Build, BookSharp } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import LockIcon from "@mui/icons-material/Lock";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useStyles } from "./LayoutStyle";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const classes = useStyles();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      className={`${classes.drawer} ${open ? classes.drawerOpen : classes.drawerClose}`}
      classes={{ paper: open ? classes.drawerOpen : classes.drawerClose }}
    >
      <div className={classes.drawerContainer}>
        <IconButton onClick={toggleSidebar} className={classes.iconButton}>
          <span className={classes.iconText}>Contraer</span>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>

      <List>
        <ListItem
          component={Link}
          to="/dashboard"
          className={location.pathname === "/dashboard" ? classes.activeListItem : classes.listItem}
        >
          <ListItemIcon>
            <Dashboard className={classes.iconStyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" />}
        </ListItem>

        <ListItem
          component={Link}
          to="/dashboard/authors"
          className={location.pathname === "/dashboard/authors" ? classes.activeListItem : classes.listItem}
        >
          <ListItemIcon>
            <ModeEditOutlineIcon className={classes.iconStyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Autores" />}
        </ListItem>

        <ListItem
          component={Link}
          to="/dashboard/carreras"
          className={location.pathname === "/dashboard/carreras" ? classes.activeListItem : classes.listItem}
        >
          <ListItemIcon>
            <Build className={classes.iconStyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Carreras" />}
        </ListItem>

        <ListItem
          component={Link}
          to="/dashboard/student"
          className={location.pathname === "/dashboard/student" ? classes.activeListItem : classes.listItem}
        >
          <ListItemIcon>
            <GroupIcon className={classes.iconStyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Estudiantes" />}
        </ListItem>
        <ListItem
          component={Link}
          to="/dashboard/libros"
          className={location.pathname === "/dashboard/libros" ? classes.activeListItem : classes.listItem}
        >
          <ListItemIcon>
            <BookSharp className={classes.iconStyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Libros" />}
        </ListItem>
        <ListItem
          component={Link}
          to="/dashboard/users"
          className={location.pathname === "/dashboard/users" ? classes.activeListItem : classes.listItem}
        >
          <ListItemIcon>
            <LockIcon className={classes.iconStyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Usuarios" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
