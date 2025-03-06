// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/routes";  // Importamos las rutas

const App = () => {
  return (
    <BrowserRouter>
      <RoutesApp />  {/* Incluimos las rutas aquí */}
    </BrowserRouter>
  );
};

export default App;
