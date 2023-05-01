import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./Firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`)
      .then((res) => {
        setData(res.data.meals);
        setLoading(false);
      });
  }, []);

  const navigateToDetails = (item) => {
    navigate(`/details/${item?.idMeal}`);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      setUser(res);
    });
  }, []);

  const addToFav = async (item) => {
    if (user?.email) {
      await addDoc(collection(database, `${user?.email}`), {
        id: item.idMeal,
        name: item.strMeal,
        image: item.strMealThumb,
      });
    } else {
      toast.info("Please sign in to save a coin to your watch list.");
    }
  };

  // setDoc(doc(database, "users", email), {
  //   watchList: [],
  // });

  return (
    <>
      <div className="bg-[#393646] text-[#faeee0]">
        <div className="text-3xl font-bold pt-8  text-center md:text-5xl md:pt-10 lg:text-7xl lg:pt-20">
          {id} Recipies
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-[80vh] text-4xl">
            Loading...
          </div>
        ) : (
          <div className="mt-10 md:mt-14 text-center lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:mt-20">
            {data?.map((item) => {
              return (
                <div
                  key={item?.idMeal}
                  className="border-2 mb-10 p-5 mx-3 rounded-md sm:mx-10 md:mx-[140px] lg:mx-10 cursor-pointer"
                >
                  <img
                    src={item?.strMealThumb}
                    alt=""
                    className="w-60 m-auto rounded-md md:w-72"
                    onClick={() => navigateToDetails(item)}
                  />
                  <p
                    className="font-bold mt-5 text-2xl"
                    onClick={() => navigateToDetails(item)}
                  >
                    {item?.strMeal}
                  </p>
                  <button
                    className="text-xl mt-5 bg-[#faeee0] text-[#343646] px-4 py-2 rounded"
                    onClick={() => addToFav(item)}
                  >
                    Add to Favorite
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryDetail;
// AiTwotoneHeart
