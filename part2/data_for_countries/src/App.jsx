import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [shownCountries, setShownCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  const allCountries = () => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data)
      console.log('fetched countries', response.data)
    })
  }

  const api_key = import.meta.env.VITE_SOME_KEY
  
  const getWeatherData = () => {
    if (shownCountries.length === 1) {
      const city_name = shownCountries[0].capital[0]
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data)
        console.log('fetched weather data', response.data)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      })
    }
  }

  useEffect(() => {
    console.log('run the allCountries() function - effect')
    allCountries()
  }, [])

  useEffect(() => {
    console.log('run the getWeatherData() function - effect')
    getWeatherData()
  }, [shownCountries])

  useEffect(() => {
    if (countries) {
      const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setShownCountries(filteredCountries);
    console.log('setting shown countries', filteredCountries)
  }
  }, [value, countries]);

  const handleChange = (event) => {
    setValue(event.target.value)
    console.log('event.target.value', event.target.value)
  }

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <>
      {shownCountries.length === 1 ? (
        <div key={shownCountries[0].cca3}>
          <h1>{shownCountries[0].name.common}</h1>
          <li>Capital: {shownCountries[0].capital ? shownCountries[0].capital[0] : 'N/A'}</li>
          <li>Area: {shownCountries[0].area}</li>
          <h3>Languages</h3>
          <ul>
            {Object.values(shownCountries[0].languages).map((languageName, index) => (
              <li key={index}>{languageName}</li>
            ))}
          </ul>
          <img src={shownCountries[0].flags.png} alt="Country Flag" width="200" />
          <h2>Weather in {shownCountries[0].capital ? shownCountries[0].capital[0] : 'N/A'}</h2>
          <li>Temperature {weatherData && weatherData?.main?.temp ? weatherData.main.temp + ' °C' : 'Loading...'}</li>
          <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} alt="Weather Icon" width="100" />
          <li>Wind speed {weatherData && weatherData?.wind?.speed ? weatherData.wind.speed + ' m/s' : 'Loading...'}</li>
        </div>
        ) : (shownCountries.length <= 10 ? (
          shownCountries.map((country) => (
            <div key={country.cca3}>
              {country.name.common}
              <button onClick={() => setShownCountries([country])}>
                show
              </button>
            </div>
          ))
        ) : 
          <p>Too many matches, specify further</p>
        )}
      </>
    </div>
  )
}

export default App