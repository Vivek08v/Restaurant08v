import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllMenuItemDetails } from '../services/operations/manageMenuService';

const FoodItemPage = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.userSlice);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const allItems = await getAllMenuItemDetails(token);
      const foundItem = allItems.find((i) => i.id === parseInt(id));
      setItem(foundItem);
    };
    fetchItem();
  }, [id]);

  if (!item) return <div className="text-center mt-10 text-gray-500">Loading item...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow mt-6">
      <img
        src={item.imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
        alt={item.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
      <p className="text-gray-600 mb-1">Category: {item.category}</p>
      <p className="text-gray-600 mb-1">Available Quantity: {item.quantity}</p>
      <p className="text-gray-600 mb-1">Type: {item.isVeg ? 'Veg' : 'Non-Veg'}</p>
      <p className="text-xl font-bold text-gray-800 mt-2">₹{item.price}</p>
    </div>
  );
};

export default FoodItemPage;
