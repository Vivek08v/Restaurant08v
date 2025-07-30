import { apiConnector } from "../apiConnector";
import { bookingEndPoints } from "../api";
import { setBooking, setLoading } from "../../Redux/slices/bookingSlice";

const {getAllbookingsAPI, setBookingAPI} = bookingEndPoints;

export const getAllbookingsService = () => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        console.log(getAllbookingsAPI)
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

export const bookTicketsService = () => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = apiConnector('POST', setBookingAPI);
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