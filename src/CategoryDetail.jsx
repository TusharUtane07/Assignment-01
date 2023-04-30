import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`)
      .then((res) => {
        setData(res.data.meals);
        console.log(res?.data?.meals);
      });
  }, []);

  return (
    <>
      <div className="bg-[#393646] text-[#faeee0]">
        <div className="text-3xl font-bold pt-8  text-center md:text-5xl md:pt-10 lg:text-7xl lg:pt-20">
          {id} Recipies
        </div>
        <div className="mt-10 md:mt-14 text-center lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:mt-20">
          {data?.map((item) => {
            return (
              <div
                key={item?.idMeal}
                className="border mb-10 p-5 mx-3 rounded-md sm:mx-10 md:mx-[140px] lg:mx-10"
              >
                <img
                  src={item?.strMealThumb}
                  alt=""
                  className="w-60 m-auto rounded-md md:w-72"
                />
                <p className="font-bold mt-5 text-2xl">{item?.strMeal}</p>
                <button className="text-xl mt-5 bg-[#faeee0] text-[#343646] px-4 py-2 rounded">
                  Add to Favorite
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;
// AiTwotoneHeart