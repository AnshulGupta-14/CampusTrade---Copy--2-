import axios from "../Utils/Axios";
import React, { useEffect, useState } from "react";
import { errorHandler } from "../Utils/HandleError";
import { Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const MyAds = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();
  const [ads, setads] = useState([]);
  const getAds = () => {
    axios
      .get("/products/ads", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setads(res.data.data);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };
  useEffect(() => {
    getAds();
  }, []);

  const onChange = () => {
    getAds();
  };

  const day = (i) => {
    return ads[i]?.createdAt && ads[i]?.createdAt.split("T")[0].split("-")[2];
  };
  const month = (i) => {
    return ads[i]?.createdAt && ads[i]?.createdAt.split("T")[0].split("-")[1];
  };
  const year = (i) => {
    return ads[i]?.createdAt && ads[i]?.createdAt.split("T")[0].split("-")[0];
  };

  const clickHandler = (id) => {
    navigate("confirmation", { state: id });
  };

  return (
    <>
      {isDesktop && (
        <div className="pt-[6%] w-full p-5">
          <h1 className="my-10 text-3xl font-black text-center">My Ads</h1>
          {ads &&
            ads.map((ad, i) => (
              <div
                key={i}
                className="bg-white rounded-xl w-[80%] h-[20vh] rounded-xl flex items-center px-5 py-3 justify-between mx-auto text-sm font-semibold"
              >
                <h1>
                  {day(i)}-{month(i)}-{year(i)}
                </h1>
                <div className="w-[18%] h-full flex items-center justify-between p-2">
                  <img src={ad.image[0]} alt="" className="h-[80%] w-20" />
                  <h1>{ad.title}</h1>
                </div>
                <div className="w-[15%] h-full flex items-center justify-between p-2">
                  <h1>{ad.price}</h1>
                </div>
                <div className="h-full flex items-center justify-between p-2">
                  <button
                    onClick={() => clickHandler(ad._id)}
                    className="p-2 px-5 bg-red-400 rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          <Outlet context={{ onChange }}></Outlet>
        </div>
      )}

      {!isDesktop && (
        <div className="pt-[20%] w-full p-5">
          <h1 className="my-10 text-3xl font-black text-center">My Ads</h1>
          {ads &&
            ads.map((ad, i) => (
              <div
                key={i}
                className="bg-white rounded-xl w-full h-[20vh] rounded-xl flex items-center py-3 gap-[10%] px-5 mx-auto text-sm font-semibold"
              >
                <div className="w-[40%] h-full">
                  <h1>
                    {day(i)}-{month(i)}-{year(i)}
                  </h1>
                  <img
                    src={ad.image[0]}
                    alt=""
                    className="h-[80%] w-full mt-2"
                  />
                </div>
                <div className="flex flex-col gap-1 text-lg mt-4">
                  <h1>{ad.title}</h1>
                  <h1>{ad.price}</h1>
                  <button
                    onClick={() => clickHandler(ad._id)}
                    className="w-fit p-1 px-5 bg-red-400 rounded-xl mt-2 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          <Outlet context={{ onChange }}></Outlet>
        </div>
      )}
    </>
  );
};

export default MyAds;
