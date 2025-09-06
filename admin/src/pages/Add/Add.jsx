import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    type: "veg", // NEW: default Veg
    topDish: false,
  });

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("type", data.type); // NEW: veg / non-veg
    formData.append("image", image);
    formData.append("topDish", data.topDish);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        toast.success(response.data.message || "Food added successfully!");
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
          type: "veg",
          topDish: false,
        });
        setImage(null);
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto my-6 p-[28px] bg-[#ffffff] rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] text-[#111827]">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-[20px]">
        {/* Image Upload */}
        <div className="flex flex-col items-center gap-[10px]">
          <p>Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
              className="w-[180px] h-[180px] object-cover rounded-[12px] border-2 border-dashed border-[#e5e7eb] p-[6px] bg-[#fafafa] transition-colors duration-200 cursor-pointer hover:border-[#2563eb]"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-[8px]">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={onChangeHandler}
            required
            className="px-[14px] py-[12px] rounded-[10px] border border-[#d1d5db] bg-[#fff] text-[15px] transition focus:outline-none focus:border-[#2563eb] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-[8px]">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            value={data.description}
            onChange={onChangeHandler}
            required
            className="px-[14px] py-[12px] rounded-[10px] border border-[#d1d5db] bg-[#fff] text-[15px] min-h-[220px] resize-y transition focus:outline-none focus:border-[#2563eb] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
          />
        </div>

        {/* Category, Type & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px]">
          {/* Category */}
          <div className="flex flex-col gap-[8px]">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="px-[14px] py-[12px] rounded-[10px] border border-[#d1d5db] bg-[#fff] text-[15px] transition focus:outline-none focus:border-[#2563eb] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Type (Veg / Non-Veg) */}
          <div className="flex flex-col gap-[8px]">
            <p>Food Type</p>
            <select
              name="type"
              value={data.type}
              onChange={onChangeHandler}
              className="px-[14px] py-[12px] rounded-[10px] border border-[#d1d5db] bg-[#fff] text-[15px] transition focus:outline-none focus:border-[#2563eb] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-[8px]">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              value={data.price}
              onChange={onChangeHandler}
              required
              className="px-[14px] py-[12px] rounded-[10px] border border-[#d1d5db] bg-[#fff] text-[15px] transition focus:outline-none focus:border-[#2563eb] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
            />
          </div>
        </div>

        {/* Top Dish Checkbox */}
        <div className="flex items-center gap-[10px] text-[#374151]">
          <input
            type="checkbox"
            name="topDish"
            checked={data.topDish}
            onChange={onChangeHandler}
            className="w-4 h-4 accent-[#2563eb]"
          />
          <label>Top Dish</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="self-end min-w-[180px] px-[18px] py-[12px] bg-[#2563eb] text-[#fff] font-semibold rounded-[10px] border-none cursor-pointer transition duration-200 transform hover:bg-[#1e40af] hover:-translate-y-[1px]"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
