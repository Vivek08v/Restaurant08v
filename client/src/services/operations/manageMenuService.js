import { apiConnector } from "../apiConnector";
import { manageMenuEndPoints } from "../api";

const {getAllMenuItemDetailsAPI} = manageMenuEndPoints;

export const getAllMenuItemDetails = async(token) => {
    let result = [];
    try{
        const response = await apiConnector("GET", getAllMenuItemDetailsAPI, 
            {
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.success){
            throw Error("Error in getAllMenuItemDetails");
        }

        result = response.data;  //check here
        console.log("API: getAllMenuItemDetails executed successfully...", response);
    }
    catch(e){
        console.log("Error in getAllMenuItemDetails: ", e);
    }
    return result;
}