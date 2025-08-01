import {configureStore} from '@reduxjs/toolkit';
import userSliceReducer from './slices/userSlice';
import bookingSliceReducer from './slices/bookingSlice';

export const store = configureStore({
    reducer: {
        userSlice: userSliceReducer,
        bookingSlice: bookingSliceReducer
    }
})