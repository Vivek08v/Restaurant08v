import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Navbar = () => {
    const {user} = useSelector((state)=> state.userSlice);
    console.log(user);

    return (
        <div className="bg-amber-200 h-auto w-auto flex justify-around">
            <div className="flex gap-5">
                <div>Icon</div>
                <div>Foods</div>
                <div>Services</div>
                <div>Delivery</div>
            </div>
            <div className="flex gap-5">
                {user && <div>Notif</div>}
                {user && <NavLink to={"/history"}><div>History</div></NavLink>}
                {user && <div>User</div>}

                {!user && <NavLink to={"/signup"}><div>SignIn</div></NavLink>}
                {!user && <NavLink to={"/login"}><div>LogIn</div></NavLink>}

            </div>
            
        </div>
    )
}

export default Navbar;