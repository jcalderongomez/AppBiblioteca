// src/components/Layout/Layout.js
import React from "react";
import Sidebar from "./Sidebar"; // Importa el Sidebar
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>
        {/* Aquí se cargará el contenido principal */}
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default Layout;
