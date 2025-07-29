import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date: null,
    timeSlot: null,
    noOfSeats: 0,
    loading: null
}

const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState: initialState,
    reducers: {
        setBooking: (state, action) => {
            state.date = action.payload.date;
            state.timeSlot = action.payload.timeSlot;
            state.noOfSeats = action.payload.noOfSeats;
        },
        setLoading: (state, action) => {
            const {loading} = action.payload;
            state.loading = loading;
        }
    }
});

export const {setBooking, setLoading} = bookingSlice.actions;
export default bookingSlice.reducer;