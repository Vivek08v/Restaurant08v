import { createSlice } from "@reduxjs/toolkit";

const oneBooking = {
    id: null,
    date: null,
    time: null,
    noOfSeats: 0,
    status: null,
    loading: null,
}
const initialState = {
    booking: [],
    loading: false
}

const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState: initialState,
    reducers: {
        setBooking: (state, action) => {
            // const {id, date, time, noOfSeats, status} = action.payload;
            const booking = action.payload;
            state.booking.push(booking);

            console.log(state.booking);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const {setBooking, setLoading} = bookingSlice.actions;
export default bookingSlice.reducer;