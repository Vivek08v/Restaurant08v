import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { IoEyeSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import AddNewMenuItemPopUp from '../component/AddNewMenuItemPopUp';
import AddMoreMenuItemPopUp from '../component/AddMoreMenuItemPopUp';
import { editMenuItemDetails, getAllMenuItemDetails, addNewMenuItemDetails } from '../services/operations/manageMenuService';

const foodItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 199,
    quantity: 0,
    isVeg: true,
  },
  {
    id: 2,
    name: "Veg Biryani",
    category: "Rice",
    price: 249,
    quantity: 5,
    isVeg: true,
  },
  {
    id: 3,
    name: "Chicken Biryani",
    category: "Rice",
    price: 249,
    quantity: 5,
    isVeg: false,
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 299,
    quantity: 5,
    isVeg: true,
  },
  {
    id: 5,
    name: "Cold Coffee",
    category: "Beverages",
    price: 99,
    quantity: 5,
    isVeg: true,
  },
];

const ManageOrder = () => {
    const [alldata, setAlldata] = useState();
    const {token} = useSelector((state)=> (state.userSlice))

    const [openAddNewMenuItemPopUp, setOpenAddNewMenuItemPopUp] = useState(false);
    const [openAddMoreMenuItemPopUp, setOpenAddMoreMenuItemPopUp] = useState(false);

    const [menuItemToEdit, setMenuItemToEdit] = useState({});
    const [menuItemToAdd, setMenuItemToAdd] = useState({});

    const addMenuItem = async(formData)=>{
      console.log("hii")
      const jsonBlob = new Blob([JSON.stringify(formData)], {
        type: 'application/json',
      });
      const form = new FormData();
      form.append("data", jsonBlob); // object
      form.append("image", formData.image); // file

      const response = await addNewMenuItemDetails(form, token);
      console.log(response);
      setAlldata((prev)=> response ? [...prev, response] : prev);
    }

    const editMenuItem = async(formData)=>{
      console.log("hii")
      const response = await editMenuItemDetails(formData, token);
      console.log(response);
      setAlldata((prev)=> prev.map((item)=>(
        item.id === response.id ? {...item, quantity: response.quantity, price: response.price} : item
      )))
    }

    const getAllMenuDetails = async()=>{
      const response = await getAllMenuItemDetails(token);
      setAlldata(response);
      console.log("printing all MenuDetails: ", response);
    }

    useEffect(()=>{
      getAllMenuDetails();
    }, [])

    return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">🍽️ Food Menu</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={()=>setOpenAddNewMenuItemPopUp(true)}>
          + Add New Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price (₹)</th>
              <th className="px-4 py-2">Available Quantity</th>
              <th className="px-4 py-2">Veg/ Non Veg</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {alldata && alldata.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">₹{item.price}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                        item.quantity !==0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.quantity}
                  </span>
                </td>
                <td className="px-4 py-2">
                    <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                        item.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isVeg ? "Veg" : "Non-Veg"}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center gap-3 text-gray-600">
                  <IoEyeSharp className="h-5 w-5 hover:text-blue-500 cursor-pointer" />
                  <MdEdit onClick={()=>{setOpenAddMoreMenuItemPopUp(true); setMenuItemToEdit(item)}} className="h-5 w-5 hover:text-yellow-500 cursor-pointer" />
                  <FaTrashAlt className="h-5 w-5 hover:text-red-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openAddNewMenuItemPopUp &&<AddNewMenuItemPopUp addMenuItem={addMenuItem} close={setOpenAddNewMenuItemPopUp}/>}
      {openAddMoreMenuItemPopUp &&<AddMoreMenuItemPopUp item={menuItemToEdit} editMenuItem={editMenuItem} close={setOpenAddMoreMenuItemPopUp}/>}
    </div>
  );
}

export default ManageOrder
