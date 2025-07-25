import React from 'react'
import Navbar from '../component/Navbar'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-screen w-screen bg-red-400 px-4 py-3'>
        <div className='h-full w-full flex flex-col bg-green-100'>
            <Navbar/>
            <div className='h-full bg-amber-800 flex justify-center items-center gap-4'>
                <NavLink to={"/book"}>
                    <button className='p-5 bg-green-300'>Book Table</button>
                </NavLink>
                <NavLink to={"/order"}>
                    <button className='p-5 bg-green-300'>Order Home</button>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Home