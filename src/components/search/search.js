import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

// Se define un objeto llamado styles que contiene diferentes propiedades con estilos para diferentes partes del componente. Estos estilos se utilizan luego para personalizar el select.
const styles = {
  container: (provided) => ({
    ...provided,
    width: "70%",
    margin: "100px auto",
    backgroundColor: " rgba(23, 23, 23, 0.5)",
    borderRadius: "15px",
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: "rgba(23, 23, 23, 0.5)",
    borderRadius: "15px",
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: "15px",
  }),

  singleValue: (provided) => ({
    ...provided,
    fontSize: "18px",
    color: "white",
  }),

  input: (provided) => ({
    ...provided,
    color: "white",
    fontSize: "18px",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "white",
    fontSize: "18px",
  }),
};

// Se define la función Search como un componente funcional que recibe como prop una función llamada onSearchChange. Dentro de la función se utiliza el hook useState para definir una variable search que inicia como null.
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  // Esta función es la que se utiliza para cargar las opciones del select de manera asíncrona. Recibe un parámetro llamado inputValue que se utiliza para buscar ciudades que coincidan con el texto ingresado en el input del select.La funcion hace una peticion a la API para obtener las ciudades que coincidan con el texto ingresado. Luego se transforman los datos obtenidos para que coincidan con el formato que espera el select de React.
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode} `,
            };
          }),
        };
      });
  };

  // Esta función se llama cuando se selecciona una opción en el select. Recibe como parámetro searchData, que es el objeto que representa la opción seleccionada. Dentro de la función se actualiza la variable search utilizando el hook useState y se llama a la función onSearchChange que se recibió como prop.
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    // El componente AsycnPaginate  es el que se utiliza para mostrar el select en la pantalla. Se le pasa como prop el placeholder que se muestra en el input cuando no se ha seleccionado ninguna opción, el valor actual de la variable search, la función handleOnChange para manejar los cambios en el select, la función loadOptions para cargar las opciones de manera asíncrona y los estilos definidos en el objeto styles.
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={styles} //aqui se agregan los estilos del select
    />
  );
};

export default Search;
