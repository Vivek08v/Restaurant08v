import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import Booking from './page/Booking'
import BookedInfo from './page/BookedInfo'
import Login from './page/Login'
import Signup from './page/SignUp'

function App() {
  const [isBooked, setIsBooked] = useState(false);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home isBooked={isBooked} setIsBooked={setIsBooked}/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/book:id' element={<BookedInfo/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
