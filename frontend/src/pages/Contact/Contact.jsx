import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    setName("");
    setEmail("");
    setMessage("");
    alert("Message sent!");
  };

  return (
    <div className="flex justify-center items-center mt-[-60px] py-20 px-5 mb-[60px] font-[Segoe_UI] h-[800px]">
      <div className="flex max-w-[1000px] w-full shadow-lg rounded-[12px] overflow-hidden">
        {/* Left Panel */}
        <div className=" text-white w-[350px] p-8 flex flex-col justify-between"
        style={{ backgroundColor: '#dd4c13ff' }}
        >
          <div className="w-[500px] h-[300px] flex flex-col text-left p-[30px] mt-[20px]">
            <h2 className="text-[30px] font-bold mb-6  ">Contact Us</h2>
            <p className="mb-2 mt-[20px]">23, Avenue india</p>
            <p className="mb-2">620001 India</p>
            <p className="mb-2"></p>
            <p className="mb-2">+91 987654321 </p>
            <p>abcde@gmail.com</p>
                      

          </div>
          <div className="flex items-center flex-wrap gap-4 mb-[30px] ml-[30px]">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl transition-transform transform hover:scale-125 hover:text-[#ffcc00]">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xl transition-transform transform hover:scale-125 hover:text-[#ffcc00]">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl transition-transform transform hover:scale-125 hover:text-[#ffcc00]">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-xl transition-transform transform hover:scale-125 hover:text-[#ffcc00]">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white border border-[#e5e7eb] w-full p-[50px] text-left text-[#111827]">
          <h2 className="text-[28px] font-semibold mb-[12px] text-[#1f2937]">
            Get in Touch
          </h2>
          <p className="text-[15px] mb-[30px] text-[#4b5563]">
            We'd love to hear from you. Send us a message below!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="px-4 py-[14px] text-[15px] rounded-[8px] border border-[#d1d5db] bg-white text-[#111827] transition-all duration-200 focus:border-[#2563eb] focus:ring-[3px] focus:ring-[#2563eb]/20 outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="px-4 py-[14px] text-[15px] rounded-[8px] border border-[#d1d5db] bg-white text-[#111827] transition-all duration-200 focus:border-[#2563eb] focus:ring-[3px] focus:ring-[#2563eb]/20 outline-none"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              rows="5"
              required
              className="px-4 py-[14px] text-[15px] rounded-[8px] border border-[#d1d5db] bg-white text-[#111827] min-h-[120px] resize-y transition-all duration-200 focus:border-[#2563eb] focus:ring-[3px] focus:ring-[#2563eb]/20 outline-none"
            />
            <button
              type="submit"
              className="py-[14px] text-[15px] font-semibold bg-[#042670ff] text-white rounded-[8px] transition-all duration-300 hover:bg-[#1e40af] border-0 outline-none focus:ring-2 focus:ring-[#2563eb]/40"
                    style={{ backgroundColor: '#dd4c13ff' }}

            >
              
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
