import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [shownCountries, setShownCountries] = useState([])

  const allCountries = () => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data)
      console.log('fetched countries', response.data)
    })
  }

  useEffect(() => {
    console.log('effect')
    allCountries()
  }, [])

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
    console.log('shown countries', shownCountries)
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