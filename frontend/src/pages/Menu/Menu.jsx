import React, { useState, useContext } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { Utensils, Leaf, Drumstick } from "lucide-react"; 
import { StoreContext } from "../../components/context/StoreContext"; // 👈 import context
import "./Menu.css";

const Menu = () => {
  const [category, setCategory] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // 👇 get full food list from context
  const { food_list } = useContext(StoreContext);

  const baseBtn =
    "flex items-center justify-center gap-2 font-semibold px-6 py-2 w-[130px] rounded-lg text-sm cursor-pointer transition-all duration-300 border shadow";

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        category={category} 
        setCategory={setCategory} 
        menuItems={food_list}  
         typeFilter={typeFilter}  // 👈 pass food list
      />

      {/* Main Content */}
      <div className="flex-1 p-6" style={{ marginLeft: "16px" }}>
        {/* Veg / Non-Veg Toggle */}
        <div className="flex gap-4 mb-8">
          {/* All Button */}
          <button
            onClick={() => setTypeFilter("All")}
            className={`${baseBtn} border-orange-600`}
            style={
              typeFilter === "All"
                ? { backgroundColor: "#2f2396ff", color: "white" }
                : { backgroundColor: "#f3f4f6", color: "#374151" }
            }
          >
            <Utensils size={18} />
            All
          </button>

          {/* Veg Button */}
          <button
            onClick={() => setTypeFilter("Veg")}
            className={`${baseBtn} border-green-600`}
            style={
              typeFilter === "Veg"
                ? { backgroundColor: "#16a34a", color: "white" }
                : { backgroundColor: "#f3f4f6", color: "#374151" }
            }
          >
            <Leaf size={18} />
            Veg
          </button>

          {/* Non-Veg Button */}
          <button
            onClick={() => setTypeFilter("Non-Veg")}
            className={`${baseBtn} border-red-600`}
            style={
              typeFilter === "Non-Veg"
                ? { backgroundColor: "#dc2626", color: "white" }
                : { backgroundColor: "#f3f4f6", color: "#374151" }
            }
          >
            <Drumstick size={18} />
            Non-Veg
          </button>
        </div>

        {/* Food Display */}
        <div className="mt-[50px] ml-[50px] flex-1">
          <FoodDisplay category={category} typeFilter={typeFilter} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
