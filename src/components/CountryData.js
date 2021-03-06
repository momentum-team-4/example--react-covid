/* globals fetch */

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function formatDate (date) {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split('T')[0]
}

export default function CountryData () {
  const [casesByDay, setCasesByDay] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [countryName, setCountryName] = useState(null)
  const { slug } = useParams()

  useEffect(() => {
    setCasesByDay([])

    fetch(`https://api.covid19api.com/dayone/country/${slug}/status/confirmed`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setCountryName(data[0].Country)
        }
        const days = data.map(day => {
          return {
            date: new Date(day.Date),
            cases: day.Cases,
            province: day.Province
          }
        })
        setCasesByDay(days)
      })
  }, [slug])

  let day
  if (casesByDay.length > 0) {
    day = casesByDay[currentIndex]
  }

  return (
    <div className='CountryData'>
      <h1>{countryName}</h1>

      {day && (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <div><strong>Date:</strong> {formatDate(day.date)}</div>
            {day.province && <div><strong>Province:</strong> {day.province}</div>}
            <div><strong>Confirmed cases:</strong> {day.cases}</div>
          </div>

          <div>
            {currentIndex > 0 &&
              <button onClick={() => setCurrentIndex(currentIndex - 1)}>{formatDate(casesByDay[currentIndex - 1].date)}</button>}
            {' '}
            {currentIndex < casesByDay.length - 1 &&
              <button onClick={() => setCurrentIndex(currentIndex + 1)}>{formatDate(casesByDay[currentIndex + 1].date)}</button>}
          </div>
        </div>
      )}
    </div>
  )
}
