import {configureStore} from '@reduxjs/redux';
import userSlice from './slices/userSlice';
import bookingSlice from './slices/bookingSlice';

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        bookingSlice: bookingSlice.reducer
    }
})