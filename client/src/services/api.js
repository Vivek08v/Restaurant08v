// const base_url = process.env.base_url;
// const base_url = import.meta.env.base_url;
const base_url = "http://localhost:8080/api/v1"

export const userEndPoints = {
    userSignUpAPI: base_url+"/auth/signup",
    userLogInAPI: base_url+"/auth/login",
}

export const bookingEndPoints = {
    getAllbookingsAPI: base_url+"/all-bookings",
    getMybookingsAPI: base_url+"/my-bookings",
    setBookingAPI: base_url+"/booking"
}

export const manageMenuEndPoints = {
    getAllMenuItemDetailsAPI: base_url+"/manage-menu/menu-details",
    editMenuItemDetailsAPI: base_url+"/manage-menu/edit-menu-details",
    addNewMenuItemDetailsAPI: base_url+"/manage-menu/add-menu-details"
}