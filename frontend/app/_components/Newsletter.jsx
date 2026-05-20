import React from "react";

const Newsletter = () => {
  return (
    <section className="bg-[#333333] w-full py-10 md:py-8 px-8 flex justify-center border-b-8 border-[#16568D]">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-center md:gap-6 text-center md:text-left">
        <h3 className="text-white text-[16px] md:text-[15px] font-bold italic mb-6 md:mb-0 leading-snug md:whitespace-nowrap">
          Stay up to date with promotions by signing up for our newsletter
        </h3>
        
        <div className="w-full max-w-[350px] md:max-w-none md:w-auto flex flex-col md:flex-row gap-4 md:items-center">
          <input 
            type="email" 
            placeholder="name@email.com" 
            className="w-full md:w-[320px] px-4 py-3 md:py-2.5 rounded-md text-[#333] placeholder:text-[#ccc] placeholder:font-medium outline-none bg-white text-[15px] md:text-[14px]"
          />
          <button className="bg-[#16568D] text-white py-3 md:py-2.5 px-12 md:px-8 mx-auto md:mx-0 rounded-md font-bold text-[18px] md:text-[14px] hover:bg-[#124570] transition-colors shadow-sm">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
