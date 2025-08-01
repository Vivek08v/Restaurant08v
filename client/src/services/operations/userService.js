import { apiConnector } from "../apiConnector";
import { userEndPoints } from "../api";
import { setUserAndToken, setLoading } from "../../Redux/slices/userSlice";

const { userSignUpAPI, userLogInAPI} = userEndPoints;

export const signUpService = (formData, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector('POST', userSignUpAPI, null, formData, null);

            if(!response.status.success){
                throw new Error(response.data.message);
            }

            dispatch(setUserAndToken.data);
            console.log("api: signUp service successfully...");
            dispatch(setLoading(false));
            navigate("/");
        }
        catch(error){
            console.log("error: signUp service failed...", error);
            dispatch(setLoading(false));
        }
    }
}

export const logInService = (formData, navigate) => {

    console.log("carrying: ", formData);
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector('POST', userLogInAPI, null, formData, null);
            console.log(response.data)
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setUserAndToken(response.data));
            dispatch(setLoading(false));
            console.log("api: logIn service successfully...");
            navigate("/");
        }
        catch(error){
            console.log("error: logIn service failed...", error);
            dispatch(setLoading(false));
            if (error.response) {
              console.log("error message from server:", error.response.data); // <-- This will log "Invalid credentials"
            } else {
              console.log("network or unexpected error:", error.message);
            }
        }
    }
}