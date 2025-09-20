import React, { useState, useEffect } from "react";

const api = {
  key: "c683319ffab6b7bbbc9e62d6d02bae76",
  base: "https://api.openweathermap.org/data/2.5/"

}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search  = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "July", "August", "September", "Oktober", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"]

    let day= days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  const getLocalTime = (timezone) => {
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utc + 1000 * timezone);
    return localTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
         <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress = {search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather && weather.name}, {weather && weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather">{weather.weather[0].main}</div>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                <div className="local-time">
                  Local Time: {getLocalTime(weather.timezone)}
                </div>
            </div>
          </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
