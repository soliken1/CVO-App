import React from "react";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  return (
    <div className="min-h-screen w-screen h-auto overflow-y-auto relative px-6 py-8">
      <label className="text-3xl font-semibold">Dashboard</label>

      <Navbar />
    </div>
  );
};

export default UserDashboard;
