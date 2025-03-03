import React from "react";
import DashboardImg from "../../../src/assets/biblioteca.png";
import { useStyles } from "./DashboardStyles"; // Asegúrate de que la importación sea correcta

const HomeDashboard = () => {
  const classes = useStyles(); // Aquí obtienes las clases

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <img
        src={DashboardImg}
        // alt="Dashboard"
        // className="w-2/3 max-w-lg rounded-lg shadow-lg"
        className={classes.dashboardImg}
      />
    </div>
  );
};

export default HomeDashboard;
