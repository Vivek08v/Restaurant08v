import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import Booking from './page/Booking'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book' element={<Booking/>}/>
      </Routes>
    </>
  )
}

export default App
