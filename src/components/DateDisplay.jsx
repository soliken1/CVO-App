import React, { useState, useEffect } from "react";

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    setCurrentDate({
      day,
      month,
      year,
    });
  }, []);

  return (
    <label className="text-gray-300 font-roboto text-xs ">
      {currentDate.day} {currentDate.month} {currentDate.year}
    </label>
  );
};

export default DateDisplay;
