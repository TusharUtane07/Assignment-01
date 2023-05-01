import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";

const SinglePage = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        setData(res.data.meals);
      });
  }, []);

  return (
    <div>
      {data?.map((item) => {
        return (
          <div key={item.idMeal}>
            <p>{item.strArea}</p>
            <p>{item.strCategory}</p>
            <img src={item.strMealThumb} />
            <p>{item.strMeal}</p>
            <div className="flex gap-5">
              <ul>
                <p className="font-bold">Ingredients</p>
                <li>{item.strIngredient1}</li>
                <li>{item.strIngredient2}</li>
                <li>{item.strIngredient3}</li>
                <li>{item.strIngredient4}</li>
                <li>{item.strIngredient5}</li>
              </ul>
              <ul>
                <p className="font-bold">Measurements</p>
                <li>{item.strMeasure1}</li>
                <li>{item.strMeasure2}</li>
                <li>{item.strMeasure3}</li>
                <li>{item.strMeasure4}</li>
                <li>{item.strMeasure5}</li>
              </ul>
            </div>
            <p>{item.strTags}</p>
            <ReactPlayer url={item.strYoutube} />
          </div>
        );
      })}
    </div>
  );
};

export default SinglePage;
