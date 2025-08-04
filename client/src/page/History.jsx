// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getMybookingsService } from '../services/operations/bookingService';
// import { setBooking } from '../Redux/slices/bookingSlice';

// const History = () => {
//     const dispatch = useDispatch();
//     const {booking} = useSelector((state)=> (state.bookingSlice));
//     const {token} = useSelector((state)=> (state.userSlice));
//     const [myBookings, setMyBookings] = useState([]);

//     const getMyBookings = async () => {
//         const response = await getMybookingsService(token);
//         setMyBookings(response.allTableList);
//         dispatch(setBooking(response.allTableList));
//     }
//     console.log(typeof(myBookings))
//     console.log(myBookings)
//     useEffect(()=>{
//         getMyBookings();
//     }, [])

//     return (
//         <div>{console.log("hi")}
//             <div>
//                 {myBookings.map((item, i)=>(
//                     <div key={i} className='flex gap-2'>
//                         <div>{item.id}</div>
//                         <div>{item.time}</div>
//                         <div>{item.noOfSeats}</div>
//                         <div>{item.date}</div>
//                         <div>{item.status}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//     )
// }

// export default History









import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMybookingsService } from '../services/operations/bookingService';
import { setBooking } from '../Redux/slices/bookingSlice';

const History = () => {
    const dispatch = useDispatch();
    const { booking } = useSelector((state) => state.bookingSlice);
    const { token } = useSelector((state) => state.userSlice);
    const [myBookings, setMyBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("table"); // "table" | "food"

    const getMyBookings = async () => {
        const response = await getMybookingsService(token);
        setMyBookings(response.allTableList || []);
        dispatch(setBooking(response.allTableList || []));
    };

    useEffect(() => {
        getMyBookings();
    }, []);

    const groupedBookings = {
        Booked: [],
        onGoing: [],
        Completed: [],
    };

    myBookings.forEach((booking) => {
        groupedBookings[booking.status]?.push(booking);
    });

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">My History</h2>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
                <button
                    className={`px-4 py-2 rounded-md font-medium ${
                        activeTab === "table"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setActiveTab("table")}
                >
                    Table Bookings
                </button>
                <button
                    className={`px-4 py-2 rounded-md font-medium ${
                        activeTab === "food"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => setActiveTab("food")}
                >
                    Food Orders
                </button>
            </div>

            {/* Table Bookings */}
            {activeTab === "table" && (
                <>
                    {["Booked", "onGoing", "Completed"].map((status) => (
                        <div key={status} className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">{status} Bookings</h3>
                            {groupedBookings[status].length === 0 ? (
                                <p className="text-gray-500">No bookings in this category.</p>
                            ) : (
                                <div className="space-y-4">
                                    {groupedBookings[status].map((item) => (
                                        <div
                                            key={item.id}
                                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Booking ID: {item.id}
                                                    </p>
                                                    <p className="text-lg font-medium">
                                                        Seats: {item.noOfSeats}
                                                    </p>
                                                    <p>Date: {item.date}</p>
                                                    <p>Time: {item.time}</p>
                                                </div>
                                                <div>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                            status === "Booked"
                                                                ? "bg-yellow-200 text-yellow-800"
                                                                : status === "onGoing"
                                                                ? "bg-blue-200 text-blue-800"
                                                                : "bg-green-200 text-green-800"
                                                        }`}
                                                    >
                                                        {status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}

            {/* Food Orders (placeholder) */}
            {activeTab === "food" && (
                <div className="text-gray-500">
                    <p>Food orders feature coming soon...</p>
                </div>
            )}
        </div>
    );
};

export default History;