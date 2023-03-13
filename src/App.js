//Se importan los siguientes módulos: React, useState, los componentes Search, CurrentWeather, Forecast y Favorites, y las API (WEATHER_API_URL y WEATHER_API_KEY).

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import Favorites from "./components/favorites/favorites";
// Se define un componente de función llamado App, que se exporta al final del archivo. Este componente es el componente principal de la aplicación y se encarga de renderizar otros componentes según sea necesario.

function App() {
  // Se definen cuatro estados usando el hook useState. Los estados son currentWeather, forecast, favorites, y backgroundClass que son variables de estado que se utilizan para almacenar información sobre el clima actual, la previsión, los lugares favoritos del usuario y el fondo.

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [backgroundClass, setBackgroundClass] = useState("");

  // Esta funcion genera un número aleatorio entre 1 y 6 y lo utiliza para establecer la clase CSS de un contenedor HTML, cambiando así el fondo del contenedor cada vez que se carga la página con el hook useEffect.

  const cambiarFondo = () => {
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    setBackgroundClass(`background-container bg-${randomNumber}`);
  };

  // El arreglo vacío `[]` significa que el efecto solo se ejecutará una vez, cuando se monte el componente.

  useEffect(() => {
    cambiarFondo();
  }, []);

  // handleAddFavorite se utiliza para agregar una ubicación a la lista de favoritos.
  const handleAddFavorite = () => {
    setFavorites([...favorites, currentWeather]);
  };

  // handleRemoveFavorite se utiliza para eliminar una ubicación de la lista de favoritos.
  const handleRemoveFavorite = (city) => {
    setFavorites(favorites.filter((favorite) => favorite.city !== city));
  };

  // handleOnSearchChange se utiliza para buscar información sobre el clima para una ubicación determinada y actualizar los estados de currentWeather y forecast. Esta funcion se ejecuta cada vez que el usuario realiza una busqueda. Se hacen dos llamadas a la API usando la funcion fetch.
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    // En este llamado se obtiene el clima actual
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // Este segundo llamado obtiene la info del pronostico para la ubicacion buscada por el usuario
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // Los dos llamados se envian mediante la funcion Promise.all para que se ejecuten en paralelo, y luego se utiliza la respuesta de ambas para actualizar el estado de la aplicacion con la info del clima actual y del pronostico del tiempo

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    // El método return del componente App renderiza elementos JSX que representan la interfaz de usuario de la aplicación. Se muestra un título, un componente Search y uno o más componentes CurrentWeather, Forecast y Favorites, según los estados actuales de la aplicación.
    <div className="contenedor">
      <div className={backgroundClass}></div>
      <div>
        <button className="btn-bck" onClick={cambiarFondo}>
          Random
        </button>
      </div>
      {/* <h1>WEATHER APP</h1> */}

      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && (
        <CurrentWeather
          data={currentWeather}
          onAddFavorite={handleAddFavorite}
        />
      )}
      {forecast && <Forecast data={forecast} />}
      {favorites.length > 0 && (
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </div>
  );
}

export default App;
// Se exporta el componente App como componente predeterminado del archivo.
