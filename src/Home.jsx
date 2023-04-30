import React from "react";
import { FaSearch } from "react-icons/fa";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="text-center bg-[#393646] text-[#F4EEE0] h-full ">
      <h2 className="text-3xl font-bold pt-8 text-start ml-5 md:text-5xl md:ml-10 lg:text-center lg:text-7xl xl:pt-12">
        Recipe Box
      </h2>
      <p className="mt-16 text-xl md:text-2xl xl:text-3xl">
        Search your favorite recipe
      </p>
      <div className="flex items-center justify-center border h-10 mx-7 md:mx-20 lg:mx-40 xl:mx-96 mt-3 md:mt-5  rounded-full md:h-14">
        <input
          type="text"
          className="bg-transparent outline-none pl-4 w-full"
        />
        <FaSearch className="mr-5 md:text-2xl" />
      </div>
      <div className="text-start lg:text-center lg:mt-20">
        <h2 className="ml-5 mt-8 text-3xl font-bold md:text-4xl md:ml-10 ">
          Categories
        </h2>
        <div>
          <Categories />
        </div>
      </div>
      <p className="mt-8 pb-3">Thank you for Visiting ❤️</p>
    </div>
  );
};

export default Home;