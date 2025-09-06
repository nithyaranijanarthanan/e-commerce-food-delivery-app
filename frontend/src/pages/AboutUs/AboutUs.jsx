import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="px-[1rem] py-[4rem] bg-[#fefefe] min-h-screen font-[Inter] text-[#1f2937]">
      {/* Hero Section */}
      <section className="flex flex-col-reverse items-center gap-[2rem] mb-[6rem]">
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-[3rem] font-bold text-[#ff6347] mb-[1rem]">About FoodieExpress</h1>
          <p className="text-[1.125rem] text-[#4b5563] mb-[1.5rem] leading-[1.6]">
            FoodieExpress delivers delicious meals from your favorite local restaurants
            right to your doorstep. Fast, fresh, and convenient – we bring the restaurant
            experience to your home.
          </p>
          <button
            className="px-[2rem] py-[0.75rem] bg-[#ff6347] border-none text-white font-semibold rounded-[0.75rem] cursor-pointer transition-all duration-300 hover:bg-[#e5533c] hover:-translate-y-[3px] shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
            onClick={() => navigate("/menu")}
          >
            Order Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-[2.25rem] text-center mb-[3rem] font-semibold">Why Choose Us</h2>
        <div className="grid grid-cols-3 gap-[2rem] md:grid-cols-3">
          <div className="bg-white p-[2rem] rounded-[1rem] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)]">
            <h3 className="text-[1.375rem] font-semibold mb-[0.75rem]">Fast Delivery</h3>
            <p className="text-[#4b5563] leading-[1.5]">
              Get your favorite meals delivered hot and fresh in under 30 minutes.
            </p>
          </div>
          <div className="bg-white p-[2rem] rounded-[1rem] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)]">
            <h3 className="text-[1.375rem] font-semibold mb-[0.75rem]">Wide Variety</h3>
            <p className="text-[#4b5563] leading-[1.5]">
              Choose from hundreds of restaurants offering all kinds of cuisines.
            </p>
          </div>
          <div className="bg-white p-[2rem] rounded-[1rem] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)]">
            <h3 className="text-[1.375rem] font-semibold mb-[0.75rem]">Easy Ordering</h3>
            <p className="text-[#4b5563] leading-[1.5]">
              Our app makes ordering fast, simple, and hassle-free on any device.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mt-[50px]">
        <h2 className="text-[2.25rem] text-center mb-[3rem]">Meet Our Team</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[2rem]">
          {["Alice", "Bob", "Catherine", "David"].map((member, index) => (
            <div
              className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-[5px]"
              key={index}
            >
              <div className="w-[90px] h-[90px] bg-[#f3f4f6] rounded-full flex items-center justify-center text-[1.75rem] font-bold text-[#9ca3af] mb-[0.75rem]">
                {member[0]}
              </div>
              <h3 className="font-semibold mb-[0.25rem]">{member}</h3>
              <p className="text-[#6b7280] text-[0.875rem]">Team Role</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#fff7ed] mt-[4rem] p-[4rem_2rem] rounded-[1rem] text-center shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
        <h2 className="text-[2.25rem] font-bold mb-[1rem]">Ready to order?</h2>
        <p className="text-[1rem] mb-[1.5rem] text-[#4b5563] leading-[1.5]">
          Join thousands of happy customers and get your favorite meals delivered fast.
        </p>
        <button
          className="px-[2rem] py-[0.75rem] bg-[#ff6347] border-none text-white font-semibold rounded-[0.75rem] cursor-pointer transition-all duration-300 hover:bg-[#e5533c] hover:-translate-y-[3px] shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
          onClick={() => navigate("/menu")}
        >
          Order Now
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
