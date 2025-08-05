import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") || null,
    loading: null 
}
const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const {setLoading, setToken, setUser} = userSlice.actions;
export default userSlice.reducer;