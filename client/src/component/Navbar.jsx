import { useState } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <div className="bg-amber-200 h-auto w-auto flex justify-around">
            <div className="flex gap-5">
                <div>Icon</div>
                <div>Foods</div>
                <div>Services</div>
                <div>Delivery</div>
            </div>
            <div className="flex gap-5">
                {isLoggedIn && <div>Notif</div>}
                {isLoggedIn && <div>History</div>}
                {isLoggedIn && <div>User</div>}

                {!isLoggedIn && <div>SignIn</div>}
                {!isLoggedIn && <div>LogIn</div>}

            </div>
            
        </div>
    )
}

export default Navbar;