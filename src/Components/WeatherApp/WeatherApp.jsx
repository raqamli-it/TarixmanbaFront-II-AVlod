import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./weatherApp.module.scss";

const regions = [
  "Tashkent",
  "Andijan",
  "Namangan",
  "Fergana",
  "Sirdarya",
  "Jizzakh",
  "Samarkand",
  "Bukhara",
  "Navoi",
  "Khorezm",
  "Nukus",
  "Surkhandarya",
  "Kashkadarya",
];

const apiKey = "f00c38e0279b7bc85480c3fe775d518c";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          regions.map((region) =>
            axios.get("https://api.openweathermap.org/data/2.5/weather", {
              params: {
                q: region,
                units: "metric",
                appid: apiKey,
              },
            })
          )
        );

        const data = responses.map((res) => res.data);
        setWeatherData(data);
      } catch (error) {
        console.error("API xatosi:", error);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 30000); // har 1 daqiqada yangilash
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return "/icons/sun.png";
      case "Clouds":
        return "/icons/cloud.png";
      case "Rain":
      case "Drizzle":
        return "/icons/rain.png";
      default:
        return "/icons/default.png";
    }
  };

  return (
    <div className={style["weather-container"]}>
      {weatherData.map((weather) => (
        <div key={weather.id} className={style["weather-card"]}>
          <h3>{weather.name}</h3>
          <img
            src={getWeatherIcon(weather.weather[0].main)}
            alt={weather.weather[0].description}
            className={style["weather-icon"]}
          />
          <p>{Math.round(weather.main.temp)}°C</p>
          <small>{weather.weather[0].description}</small>
        </div>
      ))}
    </div>
  );
}

export default WeatherApp;
