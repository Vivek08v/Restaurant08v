import React from 'react'
import Navbar from '../component/Navbar'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {

    const {user, token} = useSelector((state)=>(state.userSlice))
    // const {booking} = useSelector((state)=>(state.bookingSlice))
    // console.log(booking)
  return (
    <div className='h-screen w-screen bg-red-400 px-4 py-3'>
        <div className='h-full w-full flex flex-col bg-green-100'>
            <Navbar/>
            <div className='h-full bg-amber-800 flex justify-center items-center gap-4'>
                {(!user || user.role==="CUST") && <NavLink to={user? "/booking" : "/login"}>
                    <button className='p-5 bg-green-300'>Book Table</button>
                </NavLink>}

                {(!user || user.role==="CUST") && <NavLink to={user? "/order" : "/login"}>
                    <button className='p-5 bg-green-300'>Order Home</button>
                </NavLink>}

                {user && user.role==="ADMIN" && <NavLink to={user? "/manage-booking" : "/login"}>
                    <button className='p-5 bg-green-300'>Update Book Table</button>
                </NavLink>}

                {user && user.role==="ADMIN" && <NavLink to={user? "/manage-order" : "/login"}>
                    <button className='p-5 bg-green-300'>Update Order Items</button>
                </NavLink>}
                

                {/* {props.isBooked && <NavLink to={"/book:id"}>
                    <button className='p-5 bg-green-300'>See Booked Table</button>
                </NavLink>} */}
            </div>
        </div>
    </div>
  )
}

export default Home