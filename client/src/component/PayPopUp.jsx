import React, { useState } from 'react';
import { bookTicketsService, getAllbookingsService } from '../services/operations/bookingService';
import { useDispatch } from 'react-redux'

const PayPopUp = ({ date, slot, seats, onClose }) => {
  const dispatch = useDispatch();
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const payload = {date: date, slot: slot, seats: seats}

  const handlePay = () => {
    dispatch(getAllbookingsService());
    setIsPaymentDone(true);
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center">
        {/* Pop-up Card */}
        <div className="bg-white rounded-xl shadow-xl p-6 w-80 z-50 text-center animate-fade-in">
          {!isPaymentDone ? (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">💳 Confirm Booking</h2>
              <div className="text-sm text-gray-600 mb-2">Date: <strong>{date}</strong></div>
              <div className="text-sm text-gray-600 mb-2">Time Slot: <strong>{slot}</strong></div>
              <div className="text-sm text-gray-600 mb-4">Seats: <strong>{seats}</strong></div>
              <button
                onClick={() => handlePay()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
              >
                Pay Now
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-green-600 mb-2">🎉 Booking Confirmed!</h2>
              <p className="text-gray-700 mb-4">Your seat has been successfully booked.</p>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PayPopUp;