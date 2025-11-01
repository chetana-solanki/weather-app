import './App.css';
import { useState, useEffect } from 'react';
import WeatherDetails from './WeatherDetails';

function App() {
  // api key generated on https://openweathermap.org/api, used in url to fetch city details
  const apiKey = "982ef80792a645bde56543772ee0fb23"

  // hooks used to assign values to city and wether variable
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null);
 
  // used to store value in city variable on typing value in input bar
  function handleOnChange(event) {
    setCity(event.target.value);
  }

  // get called when search icon is clicked
  // asynchronous will wait until data is fetched with await
  async function handleOnClick() {
    await fetchWeatherData(city);
  }

  // useEffect(() => {
  //   const lastCity = localStorage.getItem("lastCity");
  //   if (lastCity) {
  //     setCity(lastCity);
  //     fetchWeatherData(lastCity);
  //   }
  // }, []);

  // hit api and fetch weather details
  async function fetchWeatherData(cityName) {
    // user enter white space 
    if (!cityName || cityName.trim().length === 0) {
      alert("Enter a city name");
      return;
    }
    // generate api link with city name and api key
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    // api hit and wait for response 
    const response = await fetch(api);
    // rate-limit
    if (response.status === 429) {
      alert("You’ve made too many requests. Please wait a minute and try again.");
      return;
    }
    // invalid city name
    if (!response.ok) {
      alert("Enter a valid city name");
      return;
    }
    // json parsing
    const weatherData = await response.json();
    // hook used to change weather value
    setWeather(weatherData);
    // add city name to local storage
    localStorage.setItem("lastCity", cityName);
  }

  return (
    <>
      <div className='container app'>
        <div className="input-group mb-3 search-box">
          <input type="text" className="form-control" placeholder="Enter City" aria-label="city" aria-describedby="basic-addon1" value={city} onChange={handleOnChange} />
          <button onClick={handleOnClick}>🔍</button>
        </div>
      </div>
      {/* passing null as wether 
      <WeatherDetails data={weather} /> */}
      {/* if weather contains some data then only go to WeatherDetails */}
      {weather ? <WeatherDetails data={weather} /> : null}
    </>
  );
}

export default App;
