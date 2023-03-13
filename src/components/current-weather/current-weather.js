import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data, onAddFavorite, isFavorite=false, onRemoveFavorite }) => {

  // La función "handleAddFavorite" se encarga de manejar el evento de "Add to Favorites" que se desencadena cuando el botón correspondiente es presionado. Esta función llama a la función "onAddFavorite" pasando un objeto que contiene el nombre de la ciudad y la información principal del clima (temperatura, sensación térmica, humedad y presión).
  const handleAddFavorite = () => {
    onAddFavorite({ city: data.name, ...data.main });
  };

  return (
    // Se definen tres secciones para mostrar información relacionada con el clima actual de la ciudad.

    <div className="weather">
    {/* La sección "top" muestra el nombre de la ciudad, la descripción del clima y el ícono correspondiente.  */}
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
    {/* La sección "bottom" muestra la temperatura actual y algunos detalles adicionales como la sensación térmica, velocidad del viento, humedad y presión. */}
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure}hPa</span>
          </div>
        </div>
      </div>
    {/* La sección "Favoritos" muestra el nombre de la ciudad y un botón para agregar la ciudad a la lista de favoritos. */}
      <div className="Favoritos">
        <div>
          {isFavorite?  
          <button className="boton" onClick={onRemoveFavorite}>
            Remove
          </button>
        :
          <button className="boton" onClick={handleAddFavorite}>
          Add Favorite
         </button>
        }
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
