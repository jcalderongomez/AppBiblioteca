// src/components/Dashboard.js
import React from "react";
import Layout from "../Layout/Layout"; // Aquí se incluye el layout
import { Outlet } from "react-router-dom";

const Dashboard = () => {


  return (
    <Layout>

      {/* Contenido Principal */}
      <Outlet />


    </Layout>
  );
};

export default Dashboard;
