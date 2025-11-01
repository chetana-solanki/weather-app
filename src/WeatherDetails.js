import React from 'react';
import { 
  WiThermometer, 
  WiStrongWind, 
  WiHumidity, 
  WiCloud, 
  WiTime10 
} from "react-icons/wi";

export default function WeatherDetails(props) {
  const data = props.data;

  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>

      <p><WiThermometer size={24} /> Temp: {data.main.temp} °C</p>
      <p><WiThermometer size={24} /> Min Temp: {data.main.temp_min} °C</p>
      <p><WiThermometer size={24} /> Max Temp: {data.main.temp_max} °C</p>

      <p><WiHumidity size={24} /> Humidity: {data.main.humidity}%</p>

      <p><WiStrongWind size={24} /> Wind: {data.wind.speed} m/s, Direction: {data.wind.deg}°</p>
      <p><WiCloud size={24} /> Weather: {data.weather[0].main} ({data.weather[0].description})</p>

      <p><WiTime10 size={24} /> Timezone Offset: {data.timezone / 3600} hrs</p>
      <hr />
      <p>Coordinates: Lat {data.coord.lat}, Lon {data.coord.lon}</p>
    </div>
  );
}
