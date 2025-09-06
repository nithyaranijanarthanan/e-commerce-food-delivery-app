import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate(); 

  const handleRate = (value) => {
    setRating(value);
  };

  return (
    <div
      className='food-item cursor-pointer'
      onClick={() => navigate(`/food/${id}`)} 
    >
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + '/images/' + image} alt={name} />
        {cartItems && cartItems[id] > 0 ? (
          <div className="food-item-counter">
            <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_green} alt="" />
          </div>
        ) : (
          <img className='add' onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt="Add" />
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {/* <div className="rating-stars">
            {[1,2,3,4,5].map(value =>
              value <= rating ? (
                <StarSolid key={value} onClick={(e) => { e.stopPropagation(); handleRate(value); }} className="rating-icon" />
              ) : (
                <StarOutline key={value} onClick={(e) => { e.stopPropagation(); handleRate(value); }} className="rating-icon" />
              )
            )}
          </div> */}
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
