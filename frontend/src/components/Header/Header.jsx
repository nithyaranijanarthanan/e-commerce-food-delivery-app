import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
 <div
  className="min-h-[400px] md:min-h-[450px] lg:min-h-[450px] 
             my-[30px] mx-auto 
             rounded-[16px] md:rounded-[12px] 
             relative overflow-hidden shadow-lg 
             bg-cover bg-center flex items-center z-0"
  style={{
    backgroundImage: `linear-gradient(rgba(19,153,102,0.85), rgba(10,25,47,0.85)), url('/header_img.png')`,
  }}
>

      <div
        className="flex flex-col items-start gap-4
                   w-[90%] md:max-w-[75%] lg:max-w-[60%]
                   mx-[6vw] animate-slideUpFade z-[10]"
      >
        <h2 className="font-semibold text-white 
                       text-[clamp(1.8rem,4.5vw,3.5rem)] leading-tight">
          Order your favourite food here
        </h2>

        <p className="text-[#d3dce6] text-sm md:text-base lg:text-lg 
                      leading-relaxed break-words flex-1">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>

        <Link to="/menu">
          <button
            className="bg-[#ffb400] text-black font-semibold 
                       px-8 py-3 md:px-6 md:py-2 w-[150px]  
                       rounded-[8px] text-[clamp(0.9rem,1vw,1rem)] 
                       cursor-pointer transition-all duration-300 
                       hover:bg-[#e09b00] hover:text-white 
                       hover:-translate-y-0.5 hover:shadow-lg border-none"
          >
            View Menu
          </button>
        </Link>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUpFade {
            animation: slideUpFade 1.2s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Header;
