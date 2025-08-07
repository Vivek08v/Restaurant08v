import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllMenuItemDetails } from '../services/operations/manageMenuService';
import { useNavigate } from 'react-router-dom';

const OrderFood = () => {
  const [allFoodItemsData, setAllFoodItemData] = useState([]);
  const { token } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const getAllFoodItems = async () => {
    const response = await getAllMenuItemDetails(token);
    setAllFoodItemData(response);
  };

  useEffect(() => {
    getAllFoodItems();
  }, []);

  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Food Menu</h1>
      {allFoodItemsData.length === 0 ? (
        <div className="text-center text-gray-500">Loading Menu...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allFoodItemsData.map((item) => (
            <div
              onClick={() => navigate(`/order-food/item/${item.id}`)}
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <img
                src={item.imageUrl || fallbackImage}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <span
                    className={`h-3 w-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}
                    title={item.isVeg ? 'Veg' : 'Non-Veg'}
                  ></span>
                </div>
                <p className="text-sm text-gray-500 mb-1">Category: {item.category}</p>
                <p className="text-sm text-gray-500 mb-1">Available: {item.quantity} plate(s)</p>
                <p className="text-md font-bold text-gray-700 mt-2">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderFood;










// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { getAllMenuItemDetails } from '../services/operations/manageMenuService';

// const OrderFood = () => {
//     const [allFoodItemsData, setAllFoodItemData] = useState([]);
//     const {token} = useSelector((state)=> state.userSlice);

//     const getAllFoodItems = async() => {
//         const response = await getAllMenuItemDetails(token);
//         console.log(response)
//         setAllFoodItemData(response);
//     }

//     useEffect(()=>{
//         getAllFoodItems();
//     },[])

//     return (
//       <div>OrderFood</div>
//     )
// }

// export default OrderFood