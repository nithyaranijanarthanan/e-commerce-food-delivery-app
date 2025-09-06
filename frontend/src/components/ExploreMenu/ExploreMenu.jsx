import React from 'react';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory, hideTitle }) => {
  return (
    <div className="flex flex-col gap-7" id="explore-menu">
      {!hideTitle && (
        <>
          <h1 className="text-gray-800 font-medium">Explore Our Menu</h1>
          <p className="max-w-[100%] text-gray-500 md:max-w-full md:text-sm">
            Choose from a diverse menu featuring a delectable array of dishes crafted
            with the finest ingredients and culinary expertise. Our mission is to satisfy
            your cravings and elevate your dining experience, one delicious meal at a time.
          </p>
        </>
      )}

      <div className="flex justify-around items-center gap-8 text-center my-5 overflow-x-auto scrollbar-hide">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory(prev => (prev === item.menu_name ? 'All' : item.menu_name))
            }
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
                className={`w-[7.5vw] min-w-[80px] h-[7.5vw] min-h-[80px] rounded-full object-cover transition duration-200
    ${category === item.menu_name ? 'border-4 border-[#FF6347] p-[2px]' : ''}`}
            />
            <p className="mt-2 text-gray-500 text-[max(1.4vw,16px)]">{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr className="my-2 h-[2px] bg-gray-200 border-none" />
    </div>
  );
};

export default ExploreMenu;
