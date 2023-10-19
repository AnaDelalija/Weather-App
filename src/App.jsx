import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherBackground from "./WeatherBackground";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "1d47e4af01f8fa40eef46bf20fe8d43d";

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {
          const response = await axios.get(apiUrl);
          setWeather(response.data);

          setBackgroundImageUrl(
            getWeatherImageURL(response.data.weather[0].id)
          );
          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setLoading(false);
        }
      });
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  const getWeatherImageURL = (weatherCondition) => {
    switch (weatherCondition) {
      case 800: // Clear
        return "https://www.sjeverni.info/wp-content/uploads/2018/04/vrijeme-danas-780x470.jpg";
      case 801: // few clouds
        return "https://www.034portal.hr/images/100662.jpg";
      case 802: // Rain
        return "https://www.banjaluka.com/wp-content/uploads/2014/05/kisa-440x314.jpg";
      case 803: // Cloudy
        return "https://ntvic.ba/wp-content/uploads/2022/12/oblacno.jpg";

      default:
        return "https://www.arz.hr/wp-content/uploads/2021/09/vrijeme-sutra.jpg";
    }
  };

  return (
    <div className="App">
      <WeatherBackground
        imageUrl={
          backgroundImageUrl ||
          "https://pixabay.com/photos/sky-clouds-cumulus-outdoors-7218043/"
        }
      />
      <h1>Weather App</h1>
      {loading ? (
        <p className="loading-text">Loading weather data...</p>
      ) : (
        <div className="weather-info">
          <h2>Current Weather</h2>
          <p>
            Location: {weather.name}, {weather.sys.country}
          </p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
