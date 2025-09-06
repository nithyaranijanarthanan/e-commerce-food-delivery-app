import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../components/context/StoreContext";
import FoodItem from "../components/FoodItem/FoodItem";

const Search = () => {
  const { food_list } = useContext(StoreContext);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("query")?.toLowerCase() || "";

  const filteredFood = food_list.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  return (
    <div className="mt-8">
      <h2 className="text-[max(2vw,24px)] font-semibold mb-[30px]">
        Search results for “{query}”
      </h2>

      {/* ✅ Exactly 3 items per row */}
      <div className="grid grid-cols-3 gap-[20px] mt-8">
        {filteredFood.length > 0 ? (
          filteredFood.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              top_dish={item.top_dish}
            />
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
