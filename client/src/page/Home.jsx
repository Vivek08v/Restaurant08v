import React from 'react'
import Navbar from '../component/Navbar'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = (props) => {

    const {user } = useSelector((state)=>(state.userSlice))
  return (
    <div className='h-screen w-screen bg-red-400 px-4 py-3'>
        <div className='h-full w-full flex flex-col bg-green-100'>
            <Navbar/>
            <div className='h-full bg-amber-800 flex justify-center items-center gap-4'>
                <NavLink to={user? "/booking" : "/login"}>
                    <button className='p-5 bg-green-300'>Book Table</button>
                </NavLink>

                <NavLink to={user? "/order" : "/login"}>
                    <button className='p-5 bg-green-300'>Order Home</button>
                </NavLink>

                {/* {props.isBooked && <NavLink to={"/book:id"}>
                    <button className='p-5 bg-green-300'>See Booked Table</button>
                </NavLink>} */}
            </div>
        </div>
    </div>
  )
}

export default Home