import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import { ArrowUpIcon,ArrowDownIcon, SearchIcon } from "@heroicons/react/outline";
import axios from "axios";

function Weather() {



  const [main, setMain] = useState(null)
  const [sys, setSys] =useState(null)
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("")
  const [data, setdata] = useState([])
  const [error, setError] = useState(false)
  

  const handleClick = async() => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
      setMain(res.data.main)
      setSys(res.data.sys)
      setWeather(res.data.weather)
      setdata(res.data)
      setError(false)
      
    } catch (err) {
      
      setError(true)
    }
  }





 





  return (
    <main className="relative h-screen select-none w-full bg-gradient-to-r to-pink-600 from-pink-400 flex items-center justify-center ">
      <Head>
        <title>Clima</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!error ? (
        <section className={` h-auto py-10 w-[90%] lg:w-[30%] shadow-xl bg-pink-100 rounded-lg items-center space-y-5 flex-col ${!weather || !sys || !main ? "hidden": "flex"}`}>
        <div className="h-28 w-28 relative">
          <Image
            src={`https://openweathermap.org/img/w/${weather && weather[0].icon}.png`}
            className="object-cover"
            layout="fill"
          ></Image>
        </div>
        <div className="flex flex-col space-y-2 items-center">
          <h4 className="font-semibold text-lg first-letter:uppercase tracking-widest ">{weather && weather[0].description}</h4>
          <p className="font-light text-gray-500">{data && data.name}, {sys && sys.country} </p>
        </div>

        <h1 className="font-bold text-7xl tracking-widest pl-12 ">{main && main.temp}°</h1>

        <main className="flex space-x-3">
          <div className="flex space-x-2 items-center">
            <ArrowUpIcon className="h-8 w-8 text-green-400"/>
            <p className="text-xl text-gray-500">{main && main.temp_max}°</p>
          </div>
          <div className="flex space-x-2 items-center">
            <ArrowDownIcon className="h-8 w-8 text-blue-400"/>
            <p className="text-xl text-gray-500">{main && main.temp_min}°</p>
          </div>
        </main>

        <div className="flex space-x-4  p-4">
          <div className="flex flex-col space-y-2 items-center border-r px-3">
            <h1 className="text-gray-500 text-sm text-light">Humidity</h1>
            <p className="text-gray-800 text-sm font-semibold">{main && main.humidity}%</p>
          </div>
          <div className="flex flex-col space-y-2 items-center border-r px-3">
            <h1 className="text-gray-500 text-sm text-light">Wind Speed</h1>
            <p className="text-gray-800 text-sm font-semibold">{data.wind && data.wind.speed} km/hr</p>
          </div>
          <div className="flex flex-col space-y-2 items-center border-r px-3">
            <h1 className="text-gray-500 text-sm text-light">Pressure</h1>
            <p className="text-gray-800 text-sm font-semibold">{main && main.pressure} mm/Hg</p>
          </div>
        </div>

        <button className="bg-cyan-400 w-[80%] hover:bg-cyan-500 transition-all duration-300 text-white px-10 py-4 rounded-full shadow-xl  shadow-cyan-400/40 ">Today Forecast</button>

      </section>
      ):(
        <h1 className="font-bold text-gray-100 text-4xl font-mono">NO CITY FOUND!</h1>
      )}

      <Link href={"/"}>
        <p className="underline cursor-pointer text-white absolute right-0 top-0 m-6">
          Time
        </p>
      </Link>

    <div className={`${!weather || !sys || !main   ? "inline-block lg:w-[50%] w-[80%] ": "absolute w-[70%] lg:w-[25%]"}  top-3 left-3 flex items-center border px-2 rounded-full  `}>
      <input onKeyPress={e => e.key === 'Enter' && handleClick()} placeholder="Enter city name"  value={city} onChange={e=>setCity(e.target.value)} type="text" className={` w-full ${!weather || !sys || !main ? "py-3": "py-2"} px-2 text-sm placeholder:text-white bg-transparent outline-none text-white`} />
      <SearchIcon onClick={handleClick} className="h-6 w-6 text-gray-100 cursor-pointer"/>
    </div>
      
    </main>
  );
}

export default Weather;