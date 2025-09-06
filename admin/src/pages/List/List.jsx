import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const formattedData = response.data.data.map((item) => ({
          ...item,
          topDish: !!item.topDish,
          type: item.type || "veg", // Default veg if not present
        }));
        setList(formattedData);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching food list");
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message || "Food removed successfully!");
        setList((prev) => prev.filter((item) => item._id !== foodId));
      } else {
        throw new Error(response.data.message || "Error deleting food");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || "Error deleting food"
      );
    }
  };

  const editFood = (foodId) => {
    navigate(`/edit-food/${foodId}`);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full max-w-[1000px] mx-auto my-8 p-20 bg-[#ffffff] rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <h2 className="text-[1.75rem] font-bold mb-6 text-[#111827] mr-40 px-100 pl-[40px] pt-[20px]">
        Food Items
      </h2>

      {loading ? (
        <p className="text-center text-[#6b7280] py-10 text-[1rem]">Loading...</p>
      ) : (
        <div className="w-full overflow-x-auto pl-[40px] pt-[20px] pr-[20px] text-center align-middle">
          <table className="table-auto w-full border-separate border-spacing-y-3 ">
            <thead>
              <tr>
                {["Image", "Name", "Category", "Type", "Price", "Top Dish", "Action"].map(
                  (head, index) => (
                    <th
                      key={head}
                      className={`bg-[#f3f4f6] font-semibold px-6 py-4 ml-[100px] h-[40px] text-center text-[#374151] whitespace-nowrap ${
                        index === 0 ? "rounded-tl-[12px] " : ""
                      } ${index === 6 ? "rounded-tr-[12px]" : ""}`}
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-[#6b7280] text-[0.95rem]"
                  >
                    No food items available.
                  </td>
                </tr>
              ) : (
                list.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-[#f9fafb] border-b border-[#e5e7eb] last:border-none"
                  >
                    <td className="px-6 py-4 pt-[10px] pb-4">
                      <img
                        src={`${url}/images/${item.image}`}
                        alt={item.name}
                        className="w-[50px] h-[50px] rounded-[8px] object-cover"
                      />
                    </td>
                    <td className="px-4 py-4 w-[150px] text-[#4b5563]">{item.name}</td>
                    <td className="px-4 py-4 text-[#4b5563]">{item.category}</td>
                    <td className="px-4 py-4 text-[#4b5563]">
                      {item.type === "veg" ? "Veg" : "Non-Veg"}
                    </td>
                    <td className="px-4 py-4 text-[#4b5563]">${item.price}</td>
                    <td className="px-4 py-4 text-[#4b5563]">
                      {item.topDish ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3 ">
                      <div className="flex items-center gap-3 pr-[20px] text-center justify-center">
                        <PencilIcon
                          onClick={() => editFood(item._id)}
                          className="w-[18px] h-[18px] text-[#2563eb] cursor-pointer transition-transform duration-150 ease-in hover:scale-[1.12]"
                        />
                        <TrashIcon
                          onClick={() => removeFood(item._id)}
                          className="w-[18px] h-[18px] text-[#dc2626] cursor-pointer transition-transform duration-150 ease-in hover:scale-[1.12]"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
