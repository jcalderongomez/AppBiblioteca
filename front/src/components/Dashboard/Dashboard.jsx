// src/components/Dashboard.js
import React from "react";
import Layout from "../Layout/Layout"; // Aquí se incluye el layout
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout>
      <Outlet /> {/* Aquí se cargará el contenido de las rutas hijas */}
    </Layout>
  );
};

export default Dashboard;
