import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, typeFilter }) => {
  const { food_list } = useContext(StoreContext);

  // Step 1: Filter by type (Veg / Non-Veg / All)
  let filteredFood =
    typeFilter === "All"
      ? food_list
      : food_list.filter(
          (item) =>
            item.type &&
            item.type.toLowerCase() === typeFilter.toLowerCase()
        );

  // Step 2: Filter by category (All / Salad / Pizza etc.)
  if (category !== "All") {
    filteredFood = filteredFood.filter(
      (item) => item.category === category
    );
  }

  return (
    <div className="mt-8" id="food-display">
      {filteredFood.length > 0 ? (
        <>
          <h2 className="text-[max(2vw,24px)] font-semibold mb-4">
            {category === "All" ? "All Food Items" : category}{" "}
            {typeFilter !== "All" ? ` - ${typeFilter}` : ""}
          </h2>

          <div className="menu-grid mt-8 grid grid-cols-2 md:grid-cols-3 gap-[50px]">
            {filteredFood.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                top_dish={item.top_dish}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 mt-10 ml-6 text-lg font-medium">
          No items found
        </p>
      )}
    </div>
  );
};

export default FoodDisplay;
