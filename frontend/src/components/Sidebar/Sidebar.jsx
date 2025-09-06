import React, { useRef } from "react";
import { menu_list } from "../../assets/assets";
import "./Sidebar.css";

const Sidebar = ({ category, setCategory, menuItems, typeFilter }) => {
  const sidebarRef = useRef(null);

  // Drag to scroll variables
  let isDown = false;
  let startY;
  let scrollTop;

  const handleMouseDown = (e) => {
    isDown = true;
    startY = e.pageY - sidebarRef.current.offsetTop;
    scrollTop = sidebarRef.current.scrollTop;
    sidebarRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDown = false;
    sidebarRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isDown = false;
    sidebarRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.pageY - sidebarRef.current.offsetTop;
    const walk = y - startY;
    sidebarRef.current.scrollTop = scrollTop - walk;
  };

  // 🔹 Get category count with SAME logic as FoodDisplay
  const getCategoryCount = (catName) => {
    // Step 1: Apply type filter
    let filtered =
      typeFilter === "All"
        ? menuItems
        : menuItems.filter(
            (item) =>
              item.type &&
              item.type.toLowerCase() === typeFilter.toLowerCase()
          );

    // Step 2: Count items per category
    return catName === "All"
      ? filtered.length
      : filtered.filter((item) => item.category === catName).length;
  };

  return (
    <div
      ref={sidebarRef}
      className="w-56 h-screen bg-gray-100 p-3 border-r border-gray-200 sticky top-0 overflow-y-auto scrollbar-hide cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <h2 className="text-lg font-bold mb-3 text-green-600 text-center text-[#042670ff]">Categories</h2>

      {/* 🔹 Category list */}
    <ul className="flex flex-col gap-0 rounded-lg overflow-hidden ">
  {menu_list.map((item, index) => (
    <li
      key={index}
      onClick={() =>
        setCategory((prev) =>
          prev === item.menu_name ? "All" : item.menu_name
        )
      }
      className={`cursor-pointer px-4 py-3 w-[200px] m-[10px] border border-gray-300 flex justify-between items-center text-base font-medium transition-all duration-200 text-center ${
        category === item.menu_name
          ? "bg-[#FF6347] text-white shadow-inner"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="font-semibold text-[18px] p-[1px] flex-1 text-[center]">
        {item.menu_name}
      </span>
      <span className="text-xs opacity-80 ml-2">({getCategoryCount(item.menu_name)})</span>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Sidebar;
