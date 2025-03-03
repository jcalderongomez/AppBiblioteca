import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar con ancho 100% y padding */}
        <div style={{ width: "100%", position: "fixed", top: 0, zIndex: 1000 }}>
          <Navbar />
        </div>

        {/* Contenido con margen superior para evitar que el Navbar lo tape */}
        <div style={{ flex: 1, marginTop: "64px", padding: "16px", overflowY: "auto" }}>
          <Container maxWidth="xl">{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default Layout;
