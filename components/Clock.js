import Link from "next/link";
import React, { useState, useEffect } from "react";


function Clock() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setdDay] = useState("");

  const date = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    setdDay(days[date.getDay()]);
  }, [hour]);

  const getSecond = () => {
    setSecond(date.getSeconds());
  };

  setTimeout(() => {
    getSecond();
  }, 1000);

  useEffect(() => {
    const getMinutes = () => {
      setMinute(date.getMinutes());
    };
    const getHours = () => {
      setHour(date.getHours());
    };
    getMinutes();
    getHours();
  }, [second]);

  useEffect(() => {
    const getHours = () => {
      setHour(date.getHours());
    };

    getHours();
  }, [minute]);


  return (
    <div className="w-full h-screen bg-black flex items-center justify-center text-white">
      <div className="lg:text-7xl font-bold text-4xl tracking-widest font-mono relative ">
      {hour < 10 && "0"} {hour} : {minute < 10 && "0"}
        {minute} : {second < 10 && "0"}
        {second}
        <sub className="lg:text-2xl text-xl mt-6 ml-3">{hour>=12? "PM":"AM"}</sub>
        <span className="uppercase text-xl font-mono absolute -top-10 right-6">
          {day}
        </span>
      </div>

      <Link href={'/weather'}><p className="cursor-pointer text-red-600 border-b px-1 border-red-600 absolute top-3 right-3">Weather</p></Link>
    </div>
  );
}

export default Clock;
