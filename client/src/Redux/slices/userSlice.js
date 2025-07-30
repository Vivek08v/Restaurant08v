import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    loading: null 
}
const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setUserAndToken: (state, action) => {
            state.user = action.payload;
            if(state.user != null){
                state.token = state.user.token;
            }
            else{
                state.token = null
            }
        },
        setLoading: (state, action) => {
            const {loading} = action.payload.loading;
            state.loading = loading;
        }
    }
})

export const {setLoading, setUserAndToken} = userSlice.actions;
export default userSlice.reducer;