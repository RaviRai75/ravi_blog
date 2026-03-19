import React from "react";
import Navbar from "../Components/Navbar";
import DateTimeWeather from "../Components/DateTimeWeather";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div>
      <DateTimeWeather />
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
