import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Categories from "./Categories";
import axios from "axios";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      )
      .then((res) => {
        setData(res.data.meals);
      });
  });

  const navigateToDetails = (item) => {
    navigate(`/details/${item.idMeal}`);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      setName(res.displayName);
      setUser(res);
    });
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
      toast.success("Sign out Successfully!!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setUser();
      setName();
    });
  };

  return (
    <div className="text-center bg-[#393646] text-[#F4EEE0] h-full ">
      <div className="flex items-center justify-between lg:justify-center  gap-8 xl:gap-16">
        <h2 className="text-3xl font-bold pt-8 text-start ml-5 md:text-5xl md:ml-10 lg:text-center lg:text-7xl xl:pt-12">
          Recipe Box
        </h2>
        {user ? (
          <div
            className="cursor-pointer text-xl mt-8  mr-5 px-2 py-1 rounded-full xl:px-4 lg:text-3xl xl:mt-12 bg-[#faeee0] text-[#393646]"
            onClick={logout}
          >
            Logout
          </div>
        ) : (
          <div className="text-3xl pt-8 mr-8 lg:text-7xl xl:pt-12">
            <VscAccount
              className="hover:cursor-pointer hover:text-blue-500"
              onClick={() => navigate("/login")}
            />
          </div>
        )}
      </div>
      {name && (
        <div className="mt-5 text-2xl">
          Welcome,{" "}
          <b>
            <u
              className="hover:cursor-pointer"
              onClick={() => navigate("/account")}
            >
              {name}
            </u>
          </b>
        </div>
      )}

      <p className="mt-10 text-xl md:text-2xl xl:text-3xl">
        Search your favorite food recipe
      </p>
      <div className="flex items-center justify-center border h-10 mx-7 md:mx-20 lg:mx-40 xl:mx-96 mt-3 md:mt-5  rounded-full md:h-14">
        <input
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="bg-transparent outline-none pl-4 w-full"
        />
        <FaSearch className="mr-5 md:text-2xl" />
      </div>

      <div className="mt-10 mb-20 md:grid md:grid-cols-2 md:mx-5 xl:grid-cols-3">
        {data?.map((item) => {
          return (
            <div
              key={item.idMeal}
              className="mx-5 border my-5 p-5 cursor-pointer"
              onClick={() => navigateToDetails(item)}
            >
              <img src={item?.strMealThumb} alt="" className="w-full " />
              <p className="mt-3 font-bold text-xl md:text-2xl lg:text-3xl">
                {item.strMeal}
              </p>
              <p className="mt-2 font-bold text-xl md:text-2xl lg:text-3xl">
                Category: {item.strCategory}
              </p>
            </div>
          );
        })}
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
