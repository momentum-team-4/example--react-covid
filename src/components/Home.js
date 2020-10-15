/* globals fetch */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home () {
  const [countries, setCountries] = useState([])

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

  return (
    <div className='Home'>
      <ul className='list pa0'>
        {countries.map(country => (
          <li key={country.ISO2}>
            <Link to={'/country/' + country.Slug}>
              {country.Country}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
