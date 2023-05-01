import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, database } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      setUser(res);
    });
  }, []);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(database, `${user?.email}`));
    const dataArray = querySnapshot.docs.map((doc) => doc.data());
    setData(dataArray);
  };

  getData();

  const doNavigate = (item) => {
    navigate(`/details/${item.id}`);
  };

  return (
    <div className="text-[#faeee0] bg-[#393646] min-h-screen">
      <h1 className="text-6xl text-center pt-5">Account</h1>

      {data?.length > 1 ? (
        <>
          <h4 className="text-center text-3xl mt-7">Your Favorite Recipes</h4>
          <div className="mt-10 md:mt-14 text-center lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:mt-20">
            {data?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="border-2 mb-10 p-5 mx-3 rounded-md sm:mx-10 md:mx-[140px] lg:mx-10 cursor-pointer"
                  onClick={() => doNavigate(item)}
                >
                  <img
                    src={item?.image}
                    alt=""
                    className="w-60 m-auto rounded-md md:w-72"
                  />
                  <p className="font-bold mt-5 text-2xl text-center">
                    {item?.name}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-center pb-5 pt-1">Thank you for Visiting ❤️</p>
        </>
      ) : (
        <p className="text-center mt-20 text-3xl lg:text-7xl">No data found</p>
      )}
    </div>
  );
};

export default Account;
