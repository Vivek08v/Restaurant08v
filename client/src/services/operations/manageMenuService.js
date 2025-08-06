import { apiConnector } from "../apiConnector";
import { manageMenuEndPoints } from "../api";

const { getAllMenuItemDetailsAPI, editMenuItemDetailsAPI } = manageMenuEndPoints;

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


export const editMenuItemDetails = async(formData, token) => {
    let result = [];
    try{
        const response = await apiConnector("PATCH", editMenuItemDetailsAPI,
            {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            formData
        )

        if(!response.data.success){
            throw Error("error in editMenuItemDetails");
        }

        result = response.data.menuItem;
        console.log(result)
        console.log("API: editMenuItemDetails executed Successfully...");
    }
    catch(e){
        console.log("API: error in editMenuItemDetails...");
    }
    return result;
}