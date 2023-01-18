import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [capitalWeather, setCapitalWeather] = useState({});
  const [weatherImg, setWeatherImg] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleShowClick = (countryName) => {
    setSearch(countryName);
  };

  useEffect(() => {
    if (search.length > 0) {
      const countriesSearch = axios.get(
        `https://restcountries.com/v3.1/name/${search}`
      );

      countriesSearch.then((response) => {
        if (response.data.length !== countriesList.length) {
          setCountriesList(response.data);
        }
      });
    }
  }, [search, countriesList]);

  useEffect(() => {


    if (countriesList.length === 1) {
      const weather = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countriesList[0].capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );

      weather.then((response) => {
        if (response.data.name !== capitalWeather.name) {

          if(response.data.weather[0]){

            setWeatherImg({
              icon: response.data.weather[0].icon,
              description: response.data.weather[0].description
            })

          }

          setCapitalWeather(response.data);
        }
      });
    }
  }, [countriesList, capitalWeather]);

  return (
    <div>
      <label>
        find countries
        <input value={search} onChange={handleSearch} />
      </label>
      <div>
        {countriesList.length === 1 ? (
          <>
            <h1>{countriesList[0].name.common}</h1>
            <p>capital {countriesList[0].capital}</p>
            <p>area {countriesList[0].area}</p>

            <p>
              <strong>languages:</strong>
            </p>

            <ul>
              {Object.values(countriesList[0].languages).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>

            <img
              src={countriesList[0].flags.png}
              alt={`${countriesList[0].name.common} flag`}
            />

            <h1>Weather in {countriesList[0].capital}</h1>

            <p>temperature {capitalWeather?.main?.temp} Celsius</p>

    {  weatherImg ? 
    
        <img
              src={`http://openweathermap.org/img/w/${weatherImg.icon}.png`}
              alt={`${weatherImg.description}`}
            />

            :

            <p>No image yet</p>


            }

            <p>wind {capitalWeather?.wind?.speed} m/s</p>
          </>
        ) : (
          ""
        )}

        {countriesList.length < 10 && countriesList.length > 1
          ? countriesList.map((c) => {
              return (
                <div key={c.name.common}>
                  <span>
                    {c.name.common}
                    <button onClick={() => handleShowClick(c.name.common)}>
                      show
                    </button>
                  </span>
                  <br />
                </div>
              );
            })
          : ""}

        {countriesList.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          ""
        )}

        {countriesList.length === 0 ?? ""}
      </div>
    </div>
  );
}

export default App;
