import React from "react";
import DashboardImg from "../../../src/assets/biblioteca.png";

const HomeDashboard = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <img src={DashboardImg} alt="Dashboard" className="w-2/3 max-w-lg rounded-lg shadow-lg" />
      </div>
  );
};

export default HomeDashboard;
