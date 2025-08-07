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
import ManageOrder from './page/ManageOrder';
import OrderFood from './page/OrderFood';
import FoodItemPage from './component/FoodItemPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("user: ",storedUser);
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
        <Route path='/manage-order' element={<ManageOrder/>}/>
        <Route path='/order-food' element={<OrderFood/>}/>
        <Route path="/order-food/item/:id" element={<FoodItemPage />} />

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App;
