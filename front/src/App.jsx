// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesApp from "./routes/routes";  // Importamos las rutas

const App = () => {
  return (
    <Router>
      <RoutesApp />  {/* Incluimos las rutas aquí */}
    </Router>
  );
};

export default App;
