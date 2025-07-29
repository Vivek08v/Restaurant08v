import { apiConnector } from "../apiConnector";
import { bookingEndPoints } from "../api";
import { setBooking, setLoading } from "../../Redux/slices/bookingSlice";

const {getAllbookingsAPI, setBookingAPI} = bookingEndPoints;

export const getAllbookings = () => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = apiConnector('GET', getAllbookingsAPI);
            console.log("response: ", response.data);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setBooking(response.data));
            console.log("api: getAllbookings successfully...");
        }
        catch(error){
            console.log("error: getAllbookings failed...");
        }
        dispatch(setLoading(false));
    }
}