import React from "react";
import "./favorites.css";
import CurrentWeather from "../current-weather/current-weather";

const Favorites = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="favorites">
      <h2>My Favorites</h2>
     
        <div className="favorites-list">
        {favorites.map((favorite, idx) => (
            <CurrentWeather key={idx} onRemoveFavorite={() => onRemoveFavorite(favorite.city)} isFavorite={true} data={favorite} />
          ))}
         </div>
     
    </div>
  );
};

export default Favorites;
