// const base_url = process.env.base_url;
// const base_url = import.meta.env.base_url;
const base_url = "http://localhost:8080/api/v1"

export const userEndPoints = {

}

export const bookingEndPoints = {
    getAllbookingsAPI: base_url+"/all-bookings",
    setBookingAPI: base_url+"/booking"
}