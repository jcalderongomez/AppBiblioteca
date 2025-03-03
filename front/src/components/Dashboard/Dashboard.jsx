// src/components/Dashboard.js
import React from "react";
import Layout from "../Layout/Layout"; // Aquí se incluye el layout
import { Outlet } from "react-router-dom";
import { useStyles } from "./DashboardStyles";  // Asegúrate de que la importación sea correcta


const Dashboard = () => {

  const classes = useStyles();  // Aquí obtienes las clases

  return (
    <Layout>
      <div className="dashboard-container">
        {/* Header */}
        <header className={classes.dashboardHeader}>
          <h1>SISTEMA DE ADMINISTRACIÓN DE BIBLIOTECAS</h1>
        </header>

        {/* Contenido Principal */}
        <main className={classes.dashboardContent}>
          <Outlet />
        </main>

        {/* Footer */}
        <footer className={classes.dashboardFooter}>
          <p>© 2025 Biblioteca Virtual - Todos los derechos reservados</p>
        </footer>
      </div>
    </Layout>
  );
};

export default Dashboard;
