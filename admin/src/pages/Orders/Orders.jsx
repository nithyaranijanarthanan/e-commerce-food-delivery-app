import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../../frontend/src/assets/assets";
import { CookingPot, Truck, CheckCircle, XCircle } from "lucide-react";

// --- Helper for status config ---
const getStatusConfig = (status) => {
  switch (status) {
   case "Food Processing":
  return {
    icon: <CookingPot className="w-4 h-4 text-[#ea580c]" />, // orange-600 hex
    classes: " text-[#c2410c] border border-[#f97316]",
  };
case "Out for delivery":
  return {
    icon: <Truck className="w-4 h-4 text-[#ca8a04]" />, // yellow-600 hex
    classes: " text-[#854d0e] border border-[#eab308]",
  };
case "Delivered":
  return {
    icon: <CheckCircle className="w-4 h-4 text-[#16a34a]" />, // green-600 hex
    classes: " text-[#166534] border border-[#22c55e]",
  };
case "Cancelled":
  return {
    icon: <XCircle className="w-4 h-4 text-[#dc2626]" />, // red-600 hex
    classes: " text-[#991b1b] border border-[#ef4444]",
  };

      return {
        icon: <XCircle className="w-4 h-4 text-[red-600]" />,
        classes: "bg-red-100 text-red-700 border border-red-400",
      };
    default:
      return {
        icon: null,
        classes: "bg-gray-100 text-gray-600 border border-gray-300",
      };
  }
};

// --- Order Card ---
const OrderCard = ({ order, statusHandler }) => {
  const statusConfig = getStatusConfig(order.status);

  return (
    <div
      className="
        grid 
        grid-cols-[0.5fr_1fr_0.5fr_1fr] 
        items-start 
        gap-[30px] 
        border border-[2px] border-[tomato]
        p-[20px] 
        my-[30px] 
        text-[14px] 
        text-[#505050]
        md:grid-cols-[0.5fr_2fr_1fr] 
        md:text-[12px] 
        md:p-[15px_8px]
        bg-[white]
        shadow-[0_2px_8px_rgba(0,0,0,0.5)]
      "
    >
      {/* Image */}
      <img
        src={assets.parcel_icon}
        alt=""
        className="w-[50px] md:w-[40px]"
      />

      {/* Order details */}
      <div>
        <p className="font-semibold text-[15px]">
          {order.items.map((item, i) =>
            i === order.items.length - 1
              ? `${item.name} x ${item.quantity}`
              : `${item.name} x ${item.quantity}, `
          )}
        </p>
        <p className="font-semibold mt-[30px] mb-[5px]">
          {order.address.firstName + " " + order.address.lastName}
        </p>
        <div className="mb-[10px]">
          <p>{order.address.state},</p>
          <p>
            {order.address.city}, {order.address.state},{" "}
            {order.address.country}, {order.address.zipcode}
          </p>
        </div>
        <p>{order.address.phone}</p>
      </div>

      {/* Item count */}
      <p>Items: {order.items.length}</p>

      {/* Price & Status */}
       <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
        <p className="font-semibold text-gray-800 text-lg">${order.amount}</p>
      </div>

      {/* Status */}
      <div
        className={`flex items-center gap-2 border-[0.25em] px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md cursor-pointer ${statusConfig.classes}`}
      >
        {statusConfig.icon}
        <select
          onChange={(event) => statusHandler(event, order._id)}
          value={order.status}
          className="bg-transparent px-[20px] border-none outline-none cursor-pointer appearance-none"
        >
          <option value="Food Processing">Food Processing</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

// --- Orders List ---
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Order Details</h3>
      <div>
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} statusHandler={statusHandler} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
