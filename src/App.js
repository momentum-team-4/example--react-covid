import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import CountryData from './components/CountryData'
import 'tachyons'

function App () {
  return (
    <Router>
      <div className='App ph3 mw8 mv4 center sans-serif'>
        <header className='bg-blue white pv2 ph3'>
          <h1>COVID-19 Statistics</h1>
          <ul className='list ph0 pv1'>
            <li className='dib mr2'><Link className='white' to='/'>Home</Link></li>
            <li className='dib mr2'><Link className='white' to='/about'>About</Link></li>
          </ul>
        </header>
        <Switch>
          <Route path='/country/:slug'>
            <CountryData />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
