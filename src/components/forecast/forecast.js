// Se importan React, la libreria  "react-accessible-accordion" y un archivo CSS "forecast.css".
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";


// Se define una constante que es un array con los dias de la semana
const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// La función "Forecast" recibe los datos del pronóstico del tiempo como argumento y crea una variable "dayInAWeek" que obtiene el día actual de la semana (0 para Domingo, 1 para Lunes, etc.). Luego, crea una variable "forecastDays" que contiene los días de la semana en orden a partir del día actual, y luego agregando los días restantes hasta completar la semana.
const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <h2 className="title">Daily</h2>
      {/* Se crea un componente "Accordion" que permite expandir/cerrar secciones. Dentro de "Accordion" se muestran varios "AccordionItem" que representan cada uno un día de la semana. */}
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            {/* Cada "AccordionItem" tiene dos partes: una parte visible (que muestra el pronóstico resumido) y una parte oculta (que muestra más detalles del pronóstico). La parte visible tiene un botón que, al hacer clic, abre la parte oculta. */}
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_max)}°C /
                    {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
            {/* Dentro de cada "AccordionItem" visible, se muestra una imagen que representa el pronóstico (usando el ícono del clima correspondiente), el día de la semana, la descripción del clima y la temperatura máxima y mínima. Los detalles del pronóstico se muestran en la parte oculta del "AccordionItem", y consisten en una cuadrícula de etiquetas que muestran la presión, la humedad, el porcentaje de nubes, la velocidad del viento, el nivel del mar y la sensación térmica. */}
          </AccordionItem>
        ))}
      </Accordion>
    </>
    
  );
};

export default Forecast;
// Se exporta el componente "Forecast" para que pueda ser utilizado en otros componentes de React.
