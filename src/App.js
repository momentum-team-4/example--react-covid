/* globals fetch */

import React, { useState, useEffect } from 'react'
import './App.css'

function App () {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('https://api.covid19api.com/countries')
      .then(response => response.json())
      .then(data => {
        console.log(data)
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

  return (
    <div className='App'>
      <ul>
        {countries.map(country => (
          <li key={country.ISO2}>{country.Country}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
