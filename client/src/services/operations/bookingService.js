import { apiConnector } from "../apiConnector";
import { bookingEndPoints } from "../api";
import { setBooking, setLoading } from "../../Redux/slices/bookingSlice";
import { useSelector } from "react-redux";

const {getAllbookingsAPI, setBookingAPI} = bookingEndPoints;

export const getAllbookingsService = () => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        // console.log(getAllbookingsAPI)
        try{
            const response = await apiConnector('GET', getAllbookingsAPI);
            console.log("response: ", response.data);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setBooking(response.data));
            console.log("api: getAllbookings successfully...");
        }
        catch(error){
            console.log("error: getAllbookings failed...", error);
        }
        dispatch(setLoading(false));
    }
}

export const bookTicketsService = (payload, token) => {
    return async(dispatch) => {
        console.log("path :",setBookingAPI)
        console.log(payload, token)
        dispatch(setLoading(true));
        try{
            const response = await apiConnector('POST', setBookingAPI, 
                {
                    Authorization: `Bearer ${token}`,
                },
                payload
            );
            console.log("response: ", response.data);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setBooking(response.data));
            console.log("api: setBookingAPI successfully...");
        }
        catch(error){
            console.log("error: setBookingAPI failed...");
        }
        dispatch(setLoading(false));
    }
}