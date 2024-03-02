import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import "./styles.css";

const GetWeatherData = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [show, setShow] = useState(false);
  const [forecastDaily, setForecastDaily] = useState([]);


  const fetchDataRealTime = async () => {
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU`
      );
      setData(response);
      console.log(response, "res");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU`
      );
      setForecastDaily(response.data.timelines.daily);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showWeather = () => {
    fetchDataRealTime();
    fetchDataForecast();
    setShow(true);
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div>
      <h2>Enter Location to get Weather Updates</h2>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={location}
      />
      <button className="btn" onClick={showWeather}>Show</button>
      {show && (
        <div className="container">
          <div className="location" >{location}</div>
          <div className="temp" >{data?.data?.data?.values.temperature}&deg;C</div>
          <div> Humidity {data?.data?.data?.values.humidity}%</div>
          <div> Wind {data?.data?.data?.values.windSpeed}mph</div>
          <div>
            Chances of rain {data?.data?.data?.values.precipitationProbability}%
          </div>
          <div>
            <h3>Forecast</h3>
            <div className="forecast">{
                forecastDaily.map((e) => {
                    return(
                    <div  >
                        <div className="date" >{moment(e.time).format('DD/MM/YYYY')}</div>
                        <div className="temprature" >{e.values.temperatureAvg}&deg;C</div>
                    </div>)
                })
            }</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetWeatherData;
