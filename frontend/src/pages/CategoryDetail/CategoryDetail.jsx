import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import FoodItem from '../../components/FoodItem/FoodItem';
import { StoreContext } from "../../components/context/StoreContext";


const CategoryDetail = () => {
  const { categoryName } = useParams();
  const { food_list } = useContext(StoreContext);

  const filteredFood = food_list.filter(item => item.category === categoryName);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredFood.map(item => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
