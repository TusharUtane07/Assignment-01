import React from "react";
import india from "./Assests/india.png";
import usa from "./Assests/usa.png";
import france from "./Assests/france.png";
import mexico from "./Assests/mexico.png";
import china from "./Assests/china.png";
import russia from "./Assests/russia.png";
import spain from "./Assests/spain.png";
import { useNavigate } from "react-router-dom";

const arr = [
  {
    id: 1,
    title: "Indian",
    img: india,
  },
  {
    id: 2,
    title: "Spanish",
    img: spain,
  },
  {
    id: 3,
    title: "Mexican",
    img: mexico,
  },
  {
    id: 4,
    title: "Chinese",
    img: china,
  },
  {
    id: 5,
    title: "American",
    img: usa,
  },
  {
    id: 6,
    title: "Russian",
    img: russia,
  },
  {
    id: 7,
    title: "French",
    img: france,
  },
];
const Categories = () => {
  const navigate = useNavigate();
  const navigateToCategory = (title) => {
    navigate(`/categories/${title}`);
  };

  return (
    <>
      <div className="mt-10 sm:grid md:grid-cols-3 sm:grid-cols-2  xl:mx-40">
        {arr.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => navigateToCategory(item.title)}
              className="flex items-center justify-center hover:cursor-pointer pb-10"
            >
              <p className="text-4xl absolute z-20 font-extrabold ">
                {item.title}
              </p>
              <div className="absolute bg-black/70 z-10 h-[135px] w-[200px]"></div>
              <img
                src={item.img}
                alt="contry-flag"
                className="w-[200px] relative"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
// const data = axios
//     .get("https://www.themealdb.com/api/json/v1/1/filter.php?a=indian")
//     .then((res) => {
//       console.log(res);
//     });
