import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SinglePage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        setData(res.data.meals);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      setUser(res);
    });
  }, []);

  const addToFav = async (item) => {
    if (user?.email) {
      await setDoc(doc(database, "recipies", `${id}`), {
        item,
      });
      toast.success("Added successfully");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex bg-[#393646] text-[#faeee0] h-screen items-center justify-center text-5xl">
          Loading...
        </div>
      ) : (
        <div className="bg-[#393646] text-[#faeee0]">
          {data?.map((item) => {
            return (
              <div key={item.idMeal}>
                <p className="text-4xl text-center pt-10 md:text-6xl md:pt-16">
                  {item.strMeal}
                </p>
                <div className="xl:flex items-center justify-center gap-16">
                  <div>
                    <img
                      src={item.strMealThumb}
                      className="w-full mt-10 px-5 md:mt-16 md:w-[700px] xl:w-[500px] xl:rounded-3xl md:m-auto"
                    />
                  </div>
                  <div>
                    <p className="mt-5 text-2xl text-center md:text-3xl md:mt-8">
                      {" "}
                      Origin: {item.strArea}
                    </p>
                    <p className="mt-2 text-2xl text-center md:text-3xl md:mt-4">
                      Type: {item.strCategory}
                    </p>

                    <table className="border m-auto mt-7 md:mt-10">
                      <tr>
                        <th className="pt-3 pb-3 text-xl md:text-4xl pr-5 pl-3 md:pl-6 md:pr-12 border-b">
                          Ingredients
                        </th>
                        <th className="pt-3 pb-3 text-xl md:text-4xl pr-5 border-b">
                          Measurements
                        </th>
                      </tr>
                      <tr>
                        <td className="p-1 md:text-2xl md:p-2 pl-3 md:pl-6">
                          {item.strIngredient1}:
                        </td>
                        <td className="p-1 md:text-2xl md:p-2">
                          {item.strMeasure1}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1 md:text-2xl md:p-2 pl-3 md:pl-6">
                          {item.strIngredient2}:
                        </td>
                        <td className="p-1 md:text-2xl md:p-2">
                          {item.strMeasure2}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1 md:text-2xl md:p-2 pl-3 md:pl-6">
                          {item.strIngredient3}:
                        </td>
                        <td className="p-1 md:text-2xl md:p-2">
                          {item.strMeasure3}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1 md:text-2xl md:p-2 pl-3 md:pl-6">
                          {item.strIngredient4}:
                        </td>
                        <td className="p-1 md:text-2xl md:p-2">
                          {item.strMeasure4}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-1 md:text-2xl md:p-2 pl-3 md:pl-6">
                          {item.strIngredient5}:
                        </td>
                        <td className="p-1 md:text-2xl md:p-2">
                          {item.strMeasure5}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="bg-[#faeee0] md:text-3xl lg:text-4xl lg:mt-20 text-[#393646] py-1 my-8 rounded-md m-5 px-5"
                    onClick={() => addToFav(item)}
                  >
                    Add to Favorite
                  </button>
                </div>
                <p className="text-3xl mb-3 mt-5 text-center md:text-5xl md:mt-16 md:mb-8">
                  Instructions
                </p>
                <p className="text-xl text-red-500 text-center pb-4 md:pb-6 md:text-2xl md:mx-7">
                  Tip: If you don't want to read 'Instructions' you can check
                  Youtube Video below.
                </p>
                <p className="mx-3  mb-5 md:text-lg md:mx-5 md:mb-8 xl:mx-40">
                  {item.strInstructions.split("\n").map((line, index) => (
                    <p key={index}>
                      {line} <br />
                    </p>
                  ))}
                </p>
                <div className="mx-5 md:mx-20 lg:mx-48 xl:mx-[450px] xl:mt-20">
                  <ReactPlayer url={item.strYoutube} width={"100%"} />
                </div>
              </div>
            );
          })}
          <p className="text-center mt-10 pb-5 text-xl">
            Thank you for visiting ❤️
          </p>
        </div>
      )}
    </>
  );
};

export default SinglePage;
