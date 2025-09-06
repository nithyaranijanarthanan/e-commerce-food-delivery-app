import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../components/context/StoreContext";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

const FoodDetail = () => {
  const { id } = useParams();
  const { food_list, cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  const foodItem = food_list.find((item) => item._id === id);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  if (!foodItem)
    return (
      <p className="text-center text-[1rem] text-[#666]">
        Food item not found.
      </p>
    );

  const handleRate = (value) => setRating(value);

  return (
    <div
      className="
        max-w-[1100px] mx-auto my-[2rem] p-[2rem] flex flex-col gap-[2rem] font-[Inter,sans-serif]
        min-[992px]:flex-row min-[992px]:items-start
      "
    >
      {/* Image Section */}
      <div className="flex-1 rounded-[12px] overflow-hidden bg-[#f9f9f9] border border-[#eee]">
        <img
          src={url + "/images/" + foodItem.image}
          alt={foodItem.name}
          className="w-full h-[300px] object-cover rounded-[12px] transition-transform duration-300 ease-in-out hover:scale-[1.02]"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col gap-[1rem] px-[1rem]">
        <h1 className="text-[2rem] font-[600] text-[#222]">{foodItem.name}</h1>
        <p className="text-[1rem] text-[#666] leading-[1.6]">
          {foodItem.description}
        </p>
        <p className="text-[1.6rem] font-[600] text-[#e63946]">
          ${foodItem.price}
        </p>

        {/* Rating */}
        {/* <div className="flex gap-[0.4rem]">
          {[1, 2, 3, 4, 5].map((value) =>
            value <= rating ? (
              <StarSolid
                key={value}
                onClick={() => handleRate(value)}
                className="w-[24px] h-[24px] cursor-pointer text-[#ffb400] transition-transform duration-200 hover:scale-110"
              />
            ) : (
              <StarOutline
                key={value}
                onClick={() => handleRate(value)}
                className="w-[24px] h-[24px] cursor-pointer text-[#ffb400] transition-transform duration-200 hover:scale-110"
              />
            )
          )}
        </div> */}
     
        {/* Cart Section */}
        <div className="mt-[-6px] flex flex-col gap-3">
          {cartItems && cartItems[id] > 0 ? (
            <>
              {/* Counter */}
              <div className="flex items-center gap-[0.6rem]">
                <button
                  onClick={() => removeFromCart(id)}
                  className="px-[1rem] py-[0.5rem] text-[0.95rem] font-[500] border-none rounded-[8px] cursor-pointer text-white bg-[#e63946] transition-colors duration-200 hover:bg-[#d62839]"
                >
                  -
                </button>
                <span className="text-[1.1rem] font-[600] min-w-[35px] text-center">
                  {cartItems[id]}
                </span>
                <button
                  onClick={() => addToCart(id)}
                  className="px-[1rem] py-[0.5rem] text-[0.95rem] border-none font-[500] rounded-[8px] cursor-pointer text-white bg-[#2a9d8f] transition-colors duration-200 hover:bg-[#21867a]"
                >
                  +
                </button>
              </div>

              {/* Redirect button */}
              <button
                onClick={() => navigate("/cart")}
                className="px-[2rem] py-[0.9rem] bg-[#ff6347] border-none text-white font-[600] text-[1rem] rounded-[10px] transition duration-200 ease-in-out hover:bg-[#e5533c] hover:-translate-y-[2px]"
              >
                Go to Cart →
              </button>
            </>
          ) : (
            <button
              onClick={() => addToCart(id)}
              className="px-[2rem] py-[0.9rem] bg-[#ff6347] border-none text-white font-[600] text-[1rem] rounded-[10px] transition duration-200 ease-in-out hover:bg-[#e5533c]  hover:-translate-y-[2px]"
            >
              Add to Cart 
            </button>
          )}
        </div>

        <p className="text-[0.9rem] text-[#888] mt-[0.5rem]">
          Delicious food made with fresh ingredients.
        </p>
      </div>
    </div>
  );
};

export default FoodDetail;
