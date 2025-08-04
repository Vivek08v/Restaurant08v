import { apiConnector } from "../apiConnector";
import { bookingEndPoints } from "../api";
import { setBooking, setLoading } from "../../Redux/slices/bookingSlice";

const {getAllbookingsAPI, setBookingAPI, getMybookingsAPI} = bookingEndPoints;

export const getAllbookingsService = async() => {
    // console.log(getAllbookingsAPI)

    let allDatas = []
    try{
        const response = await apiConnector('GET', getAllbookingsAPI);
        allDatas.push(response.data);
        console.log("response: ", response.data);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("api: getAllbookings successfully...");
    }
    catch(error){
        console.log("error: getAllbookings failed...", error);
    }
    return allDatas;
}

export const getMybookingsService = async (token) => {
    // console.log(getAllbookingsAPI)
    let result = [];
    try{
        const response = await apiConnector('GET', getMybookingsAPI, 
            {
                Authorization: `Bearer ${token}`
            }
        );
        result=response.data;
        console.log("response: ", response.data);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log("api: getMybookings successfully...");
    }
    catch(error){
        console.log("error: getMybookings failed...", error);
    }
    return result;
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

            dispatch(setBooking(response.data.booking));
            console.log("api: setBookingAPI successfully...");
        }
        catch(error){
            console.log("error: setBookingAPI failed...");
        }
        dispatch(setLoading(false));
    }
}