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
            console.log(action.payload)
            const {user, token} = action.payload;
            // state.user = action.payload;
            if(user != null){
                state.user = user;
                state.token = token;
            }
            else{
                state.token = null;
                state.user = null;
            }

            console.log(token, user)
        },
        setLoading: (state, action) => {
            // const {loading} = action.payload.loading;
            // state.loading = loading;
            state.loading = action.payload;
        }
    }
})

export const {setLoading, setUserAndToken} = userSlice.actions;
export default userSlice.reducer;