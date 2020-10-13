/* globals fetch */

import React, { useState, useEffect } from 'react'
import './App.css'
import CountryData from './components/CountryData'

function App () {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    fetch('https://api.covid19api.com/countries')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => {
          if (a.Country < b.Country) {
            return -1
          } else if (a.Country > b.Country) {
            return 1
          } else {
            return 0
          }
        })
        setCountries(data)
      })
  }, [])

  if (selectedCountry) {
    return (
      <div className='App'>
        <CountryData country={selectedCountry} />
        <div>
          <button className='link-button' onClick={() => setSelectedCountry(null)}>
          Go back to all countries
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='App'>
      <ul>
        {countries.map(country => (
          <li key={country.ISO2}>
            <button className='link-button' onClick={() => setSelectedCountry(country)}>
              {country.Country}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
