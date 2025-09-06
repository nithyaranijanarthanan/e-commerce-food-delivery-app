import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    const response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert('Error');
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="mt-24 px-4 md:px-10 flex flex-wrap justify-center gap-4 w-full">
      {/* Left Side: Delivery Information */}
      <div className="bg-white shadow rounded p-4  w-[500px] md:w-[500px] mt-[30px] md:ml-[100px] flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

        <div className="flex gap-2 mb-3">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-orange-500" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-orange-500" />
        </div>

        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" className="w-full p-2 border border-gray-300 rounded mb-3 outline-none focus:outline-orange-500" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" className="w-full p-2 border border-gray-300 rounded mb-3 outline-none focus:outline-orange-500" />

        <div className="flex gap-2 mb-3">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-orange-500" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-orange-500" />
        </div>

        <div className="flex gap-2 mb-3">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-orange-500" />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" className="w-full p-2 border border-gray-300 rounded outline-none focus:outline-orange-500" />
        </div>

        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" className="w-full p-2 border border-gray-300 rounded mb-4 outline-none focus:outline-orange-500" />
      </div>

      {/* Right Side: Cart Summary */}
      <div className="bg-white shadow rounded mt-[30px] h-[400px] p-4 w-[500px] md:w-[500px] flex flex-col gap-2">
        <h2 className="text-xl font-semibold mb-4">Billing Summary</h2>

        {/* Header row */}
        <div className="grid grid-cols-3 text-[#555] font-semibold text-[16px] mb-1">
          <span>Item</span>
          <span className="text-center">Qty x Price</span>
          <span className="text-right">Subtotal</span>
        </div>
        <div className="h-px bg-[#e2e2e2] mb-2" />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            const quantity = cartItems[item._id];
            const subtotal = item.price * quantity;
            return (
              <div key={index} className="grid grid-cols-3 mb-1">
                <span className="text-[#555] font-semibold text-[18px]">{item.name}</span>
                <span className="text-center">{quantity} x ${item.price}</span>
                <span className="text-right">${subtotal}</span>
              </div>
            );
          }
          return null;
        })}

        {/* Delivery Fee */}
        <div className="grid grid-cols-3 text-[#555] text-[14px] mb-1">
          <span>Delivery Fee</span>
          <span></span>
          <span className="text-right">${getTotalCartAmount() === 0 ? 0 : 2}</span>
        </div>

        {/* Total */}
        <div className="grid grid-cols-3 text-[#555] font-semibold text-lg">
          <span>Total</span>
          <span></span>
          <span className="text-right">${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</span>
        </div>

        <button type="submit" className="mt-4 bg-[tomato] text-white w-full py-3 rounded hover:bg-red-600 transition border-none">
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
