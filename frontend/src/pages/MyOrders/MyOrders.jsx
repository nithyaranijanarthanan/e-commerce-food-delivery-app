import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./../../components/context/StoreContext";
import axios from "axios";
import { assets } from "./../../assets/assets";
import { CookingPot, Truck, CheckCircle, XCircle } from "lucide-react";

// --- Helper for status config ---
const getStatusConfig = (status) => {
  switch (status) {
    case "Food Processing":
      return {
        icon: <CookingPot className="w-5 h-5 text-[#ea580c]" />, // orange
        classes: "bg-orange-100 text-[#c2410c] border border-[#f97316]",
      };
    case "Out for delivery":
      return {
        icon: <Truck className="w-5 h-5 text-[#ca8a04]" />, // yellow
        classes: "bg-yellow-100 text-[#854d0e] border border-[#eab308]",
      };
    case "Delivered":
      return {
        icon: <CheckCircle className="w-5 h-5 text-[#16a34a]" />, // green
        classes: "bg-green-100 text-[#166534] border border-[#22c55e]",
      };
    case "Cancelled":
      return {
        icon: <XCircle className="w-5 h-5 text-[#dc2626]" />, // red
        classes: "bg-red-100 text-[#991b1b] border border-[#ef4444]",
      };
    default:
      return {
        icon: null,
        classes: "bg-gray-100 text-gray-600 border border-gray-300",
      };
  }
};

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders mt-10 px-4 md:px-8">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        My Orders
      </h2>

      {/* Orders */}
      <div className="flex flex-col gap-4 mt-6 p-[20px]">
        {data.map((order, index) => {
          const statusConfig = getStatusConfig(order.status); // ✅ call helper here

          return (
            <div
              key={index}
              className="
                grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr] 
                items-center gap-6 text-[14px] text-[#454545]
                px-[20px] py-[10px] border border-[tomato]/60
                rounded-sm bg-white
                md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr]
                max-md:grid-cols-[1fr_2fr_1fr] max-md:gap-2 max-md:text-[12px]
                gap-[3rem]
                
              "
            >
              {/* Icon */}
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-[45px] h-[45px] object-contain"
              />

              {/* Items */}
              <p>
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              {/* Price */}
              <p>${order.amount}.00</p>

              {/* Quantity */}
              <p>Items: {order.items.length}</p>

              {/* Status */}
              <div
                className={`flex items-center   w-[200px]  gap-2 px-3 py-1 rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md cursor-pointer ${statusConfig.classes}`}
              >
                {statusConfig.icon}
                <span>{order.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
