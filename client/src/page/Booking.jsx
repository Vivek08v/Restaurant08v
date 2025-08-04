import React, { useState } from 'react';
import PayPopUp from '../component/PayPopUp';

const slots = [
  "9:00 A.M.", "9:30 A.M.", "10:00 A.M.", "10:30 A.M.", "11:30 A.M.", "12:00 A.M.", "12:30 A.M.",
  "9:00 P.M.", "9:30 P.M.", "10:00 P.M.", "10:30 P.M.", "11:00 P.M.", "11:30 P.M.", "12:00 P.M."
];

const Booking = () => {
  const [sliderIn, setSliderIn] = useState(false);
  const [popUpIn, setPopUpIn] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [seats, setSeats] = useState(0);

  const clickHandler = (time) => {
    if (time !== selectedSlot) {
      setSelectedSlot(time);
      setSliderIn(true);
    } else {
      setSelectedSlot('');
      setSliderIn(false);
    }
  };

  return (
    <div className='min-h-screen w-full bg-red-100 px-6 py-4'>
      <div className='flex flex-col gap-6 bg-white rounded-xl shadow-md p-6'>
        <div className='h-80 bg-amber-200 flex items-center justify-center text-xl font-semibold rounded-md'>
          Image Gallery / Slider
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='md:w-1/2 flex flex-col gap-4'>
            <label className='text-lg font-medium'>Select Date:</label>
            <input
              type='date'
              className='p-2 border border-gray-300 rounded-md w-full'
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedSlot('');
                setSliderIn(false);
              }}
            />

            {selectedDate && (
              <>
                <div className='text-lg font-semibold pt-4'>Available Slots</div>
                <div className='flex flex-wrap gap-4'>
                  {slots.map((time, i) => (
                    <button
                      key={i}
                      className={`px-4 py-2 rounded-md transition-all ${
                        selectedSlot === time ? 'bg-green-500 text-white' : 'bg-green-200 hover:bg-green-300'
                      }`}
                      onClick={() => clickHandler(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {sliderIn && (
            <div className='md:w-1/2 bg-yellow-100 p-6 rounded-lg border border-yellow-300'>
              <div className='text-xl font-bold mb-4'>Booking Details</div>
              <div className='mb-2'>
                <span className='font-medium'>Date:</span> {selectedDate}
              </div>
              <div className='mb-2'>
                <span className='font-medium'>Slot:</span> {selectedSlot}
              </div>
              <div className='mb-2'>
                <span className='font-medium'>Seats Available:</span> 45
              </div>
              <div className='flex flex-col gap-2 mt-4'>
                <label className='font-medium'>Enter Seats:</label>
                <input
                  type='number'
                  placeholder='No. of seats'
                  className='p-2 border border-gray-400 rounded-md w-full'
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                />
              </div>
              <button onClick={()=> setPopUpIn(true)} className='bg-green-500 text-white px-6 py-3 rounded-md mt-6 hover:bg-green-600'>
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>

      {popUpIn && <PayPopUp slot={selectedSlot} date={selectedDate} noOfSeats={seats} onClose={setPopUpIn}/>}
    </div>
  );
};

export default Booking;











// import React, { useState } from 'react'

// const slots = ["9:00 A.M.", "9:30 A.M.", "10:00 A.M.", "10:30 A.M.", "11:30 A.M.", "12:00 A.M.", "12:30 A.M.",
//   "9:00 P.M.", "9:30 P.M.", "10:00 P.M.", "10:30 P.M.", "11:00 P.M.", "11:30 P.M.", "12:00 P.M." ]

// const Booking = () => {
//     const [sliderIn, setSliderIn] = useState(false);
//     const [selectedSlot, setSelectedSlot] = useState("");

//     const clickHandler = (time) => {
//         console.log(time);
//         if(time !== selectedSlot){
//             setSelectedSlot(time);
//             setSliderIn(true);
//         }
//         else{
//             setSelectedSlot("");
//             setSliderIn(false);
//         }
//     }
//     return (
//     <div className='h-screen w-screen bg-red-400 px-4 py-3'>
//         <div className='h-full w-full flex flex-col bg-green-100'>
//             <div className='w-full h-2/5 bg-amber-200'>
//                 Image Gallery/ Slider
//             </div>
//             <div className='p-4 flex'>
//                 <div className='flex flex-col'>
//                     <div className='flex justify-center pb-3'>Slots</div>
//                     <div className='flex flex-wrap gap-7'>
//                         {slots.map((time, i)=>(
//                             <button key={i} className={`p-3 ${selectedSlot===time ? 'bg-green-400': 'bg-green-200'}`} onClick={()=> clickHandler(time)}>
//                                 <div className="">{time}</div>
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {sliderIn && (
//                     <div className='w-4/5 bg-amber-300'>
//                         <div>Slot : {selectedSlot}</div>
//                         <div>Seats Empty: 45</div>
//                         <div>
//                             <div>Enter seats: </div>
//                             <input placeholder='No. of seats'></input>
//                         </div>
                        
//                         <button className='bg-green-400 px-5 py-3 mt-4'> Book </button>
//                     </div>
//                 )}
//             </div>
            
//         </div>
//     </div>
//   )
// }

// export default Booking