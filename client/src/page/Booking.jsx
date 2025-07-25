import React, { useState } from 'react'

const slots = ["9:00 A.M.", "9:30 A.M.", "10:00 A.M.", "10:30 A.M.", "11:30 A.M.", "12:00 A.M.", "12:30 A.M.",
  "9:00 P.M.", "9:30 P.M.", "10:00 P.M.", "10:30 P.M.", "11:00 P.M.", "11:30 P.M.", "12:00 P.M." ]

const Booking = () => {
    const [sliderIn, setSliderIn] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState("");

    const clickHandler = (time) => {
        console.log(time);
        if(time !== selectedSlot){
            setSelectedSlot(time);
            setSliderIn(true);
        }
        else{
            setSelectedSlot("");
            setSliderIn(false);
        }
    }
    return (
    <div className='h-screen w-screen bg-red-400 px-4 py-3'>
        <div className='h-full w-full flex flex-col bg-green-100'>
            <div className='w-full h-2/5 bg-amber-200'>
                Image Gallery/ Slider
            </div>
            <div className='p-4 flex'>
                <div className='flex flex-col'>
                    <div className='flex justify-center pb-3'>Slots</div>
                    <div className='flex flex-wrap gap-7'>
                        {slots.map((time, i)=>(
                            <button key={i} className={`p-3 ${selectedSlot===time ? 'bg-green-400': 'bg-green-200'}`} onClick={()=> clickHandler(time)}>
                                <div className="">{time}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {sliderIn && (
                    <div className='w-4/5 bg-amber-300'>
                        <div>Slot : {selectedSlot}</div>
                        <div>Seats Empty: 45</div>
                        <div>
                            <div>Enter seats: </div>
                            <input placeholder='No. of seats'></input>
                        </div>
                        
                        <button className='bg-green-400 px-5 py-3 mt-4'> Book </button>
                    </div>
                )}
            </div>
            
        </div>
    </div>
  )
}

export default Booking