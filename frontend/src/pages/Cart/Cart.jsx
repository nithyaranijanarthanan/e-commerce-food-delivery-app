import React, { useContext } from 'react'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline'; 

const Cart = ({ setShowLogin }) => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!token) {
      alert("You must be signed in to proceed to checkout.");
      setShowLogin(true);
    } else {
      navigate("/order");
    }
  };

  return (
    <div className="mt-24 px-4">
      {/* Table Header */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.2fr] text-gray-500 text-[max(1vw,12px)]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className="h-px bg-[#e2e2e2] border-none my-4" />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="min-w-[700px] grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.2fr] items-center my-2.5 text-black">
                  <img src={url + '/images/' + item.image} alt="" className="w-[50px]" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <div
                    onClick={() => removeFromCart(item._id)}
                    className="cursor-pointer flex justify-center"
                  >
                    <TrashIcon 
                      className="w-[20px] h-[20px] text-red-500 hover:text-red-700 transition-transform transform hover:scale-110" 
                    />
                  </div>
                </div>
                <hr className="h-px bg-[#e2e2e2] border-none" />
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Cart Summary + Billing */}
      <div className="mt-24 px-4 md:px-10 justify-center flex flex-row flex-wrap gap-4 w-full">
        {/* Left Side: Cart Total */}
        <div className="bg-white shadow rounded p-4 w-[500px] md:w-[500px] h-[300px] mt-[30px] md:ml-[100px] flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Cart Total</h2>
          <div className="flex justify-between text-[#555] text-[18px]">
            <span>Subtotal</span>
            <span>${getTotalCartAmount()}</span>
          </div>
          <div className="h-px bg-[#e2e2e2]" />
          <div className="flex justify-between text-[#555] text-[18px]">
            <span>Delivery Fee</span>
            <span>${getTotalCartAmount() === 0 ? 0 : 10}</span>
          </div>
          <div className="h-px bg-[#e2e2e2] text-[18px]" />
          <div className="flex justify-between text-[#555] font-semibold text-lg">
            <span>Total</span>
            <span>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</span>
          </div>
        </div>

        {/* Right Side: Billing / Checkout */}
        <div className="bg-white shadow rounded mt-[30px] p-4 w-[500px] md:w-[500px] flex flex-col gap-2">
          <h2 className="text-xl font-semibold mb-4">Billing Total</h2>

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
            <span className="text-right">${getTotalCartAmount() === 0 ? 0 : 10}</span>
          </div>

          {/* Total */}
          <div className="grid grid-cols-3 text-[#555] font-semibold text-lg">
            <span>Total</span>
            <span></span>
            <span className="text-right">${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-[tomato] text-white w-full py-3 rounded hover:bg-red-600 transition border-none"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
