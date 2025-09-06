import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const TopFoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)
  const [showAll, setShowAll] = useState(false)

  let topDishes = food_list.filter(item => item.topDish === true)

  // 👉 If user selects a category (not "All"), filter by category too
  if (category !== 'All') {
    topDishes = topDishes.filter(item => item.category === category)
  }

  // 👉 Show only 4 unless user clicks "See more"
  const displayedDishes = showAll ? topDishes : topDishes.slice(0, 4)

  return (
    <div className="mt-8">
      <h2 className="text-[max(2vw,24px)] font-semibold">Top dishes near you</h2>
      
      <div className="flex flex-wrap justify-around gap-y-6 mt-[30px] ">
        {displayedDishes.length > 0 ? (
          displayedDishes.map((item) => (
               <div key={item._id} className="w-[23%] max-md:w-[48%] max-sm:w-full">
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              top_dish={item.topDish}
            />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No top dishes available in this category.
          </p>
        )}
      </div>

      {/* 👉 Show "See more" button only if more than 4 dishes exist */}
      {topDishes.length > 4 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#ffb400] text-black font-semibold 
                           px-8 py-3 max-md:px-6 max-md:py-2 w-[150px]  
                           rounded-[8px] text-[clamp(0.9rem,1vw,1rem)] 
                           cursor-pointer transition-all duration-300 
                           hover:bg-[#e09b00] hover:text-white 
                           hover:-translate-y-0.5 hover:shadow-lg border-none"
          >
            {showAll ? 'See less' : 'See more'}
          </button>
        </div>
      )}
    </div>
  )
}

export default TopFoodDisplay
