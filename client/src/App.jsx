import './App.css'

import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setToken, setUser } from './Redux/slices/userSlice';

import Home from './page/Home'
import Booking from './page/Booking'
import BookedInfo from './page/BookedInfo'
import Login from './page/Login'
import Signup from './page/SignUp'
import History from './page/History'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedToken) {
      dispatch(setToken(storedToken));
      dispatch(setUser(storedUser));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/book:id' element={<BookedInfo/>}/>
        <Route path='/history' element={<History/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App;
