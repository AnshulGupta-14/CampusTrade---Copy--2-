import React, { useEffect, useState } from "react";
import axios from "../Utils/Axios";
import { errorHandler } from "../Utils/HandleError";
import Cards from "./Partials/Cards";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Favourites = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const [Favourites, setFavourites] = useState([]);
  const getFavourites = () => {
    axios
      .get("users/favourite-products")
      .then((response) => {
        setFavourites(response.data.data);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };
  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <>
      {isDesktop && (
        <div className="pt-[6%]">
          {Favourites.length > 0 ? (
            <Cards data={Favourites} onUpdate={getFavourites}></Cards>
          ) : (
            <div className="h-[82.7vh] w-full flex flex-col items-center justify-center">
              <img src="./Empty.png" alt="" className="h-60 w-60" />
              <h1 className="mt-7 text-xl font-black">
                Looks like you haven't found your favorites yet.{" "}
              </h1>
              <h1 className="mt-3 text-xl font-semibold">
                Browse through our listings to discover something special!
              </h1>
              <NavLink
                to={"/"}
                className={"mt-7 p-3 bg-[#002f34] text-white rounded-xl"}
              >
                Start Exploring
              </NavLink>
            </div>
          )}
        </div>
      )}

      {!isDesktop && (
        <div className="pt-[20%]">
          {Favourites.length > 0 ? (
            <div className="w-full px-[1.8%]">
              <Cards data={Favourites} onUpdate={getFavourites}></Cards>
            </div>
          ) : (
            <div className="px-[5%] pt-[10%] w-full flex flex-col items-center justify-center">
              <img src="./Empty.png" alt="" className="h-60 w-60" />
              <h1 className="mt-7 text-xl font-bold text-center">
                Looks like you haven't found your favorites yet.{" "}
              </h1>
              <h1 className="mt-5 text-lg font-semibold text-center">
                Browse through our listings to discover something special!
              </h1>
              <NavLink
                to={"/"}
                className={"mt-7 p-3 bg-[#002f34] text-white rounded-xl"}
              >
                Start Exploring
              </NavLink>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Favourites;
