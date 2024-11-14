import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import axios from "../../Utils/Axios";
import { errorHandler } from "../../Utils/HandleError";
import "remixicon/fonts/remixicon.css";
// import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../Context/AuthContext";
import { useMediaQuery } from "react-responsive";

const Card = ({ data, close = false, onUpdate }) => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const { accessToken } = useContext(AuthContext);
  const userId = accessToken ? jwtDecode(accessToken)._id : null;
  const [style, setstyle] = useState(data.likedBy.includes(userId));
  const [likedBy, setLikedBy] = useState(data.likedBy);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const removeProduct = prompt(
      "Write 'Yes' if you want to remove this product"
    );
    console.log(removeProduct);

    if (removeProduct !== "Yes") {
      alert("Product did not remove as you did not give correct input");
      return;
    }
    axios
      .post(`/products/upload-ad/${data._id}`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        alert("Product removed successfully");
        onUpdate();
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  const handleLike = (e) => {
    e.preventDefault();
    axios
      .post("/users/liked-product", { id: data._id })
      .then((res) => {
        // console.log(res);
        setLikedBy(res.data.data.product.likedBy);
        alert(res.data.message);
        setstyle(res.data.message === "Product add to favourite");
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  useEffect(() => {
    if (accessToken) {
      try {
        setstyle(likedBy.includes(userId));
      } catch (error) {
        console.error("Failed to decode token:", error);
        setstyle(false); // Reset style if token decoding fails
      }
    }
    if (onUpdate) onUpdate();
  }, [likedBy]);

  // console.log(likedBy);

  return (
    <>
      {isDesktop && (
        <NavLink
          to={`/productdetails/${data._id}`}
          className="w-[22vw] h-[40vh] relative rounded-lg overflow-hidden"
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {close ? (
            <div className="relative group z-10">
              <div className="absolute right-0 text-xl bg-red-500 rounded-full p-1 text-white">
                <IoMdClose onClick={handleClick} />
              </div>
              <h1 className="hidden absolute -right-7 -top-7 group-hover:block bg-red-400 text-xs rounded-xl p-1 text-white">
                Remove Element
              </h1>
            </div>
          ) : (
            accessToken && (
              <i
                onClick={handleLike}
                className={`ri-heart-3-fill ${
                  style ? "text-red-500" : "text-white"
                } absolute z-10 right-0 text-3xl`}
              ></i>
            )
          )}
          <div className="w-full h-[65%] relative">
            <img
              src={data.image[0]}
              alt=""
              className="w-full h-full object-contain"
            />
            <div className="h-full w-full absolute inset-0 bg-black opacity-30" />
          </div>
          <div className="w-full h-[35%] bg-zinc-300 px-5 overflow-hidden py-2 leading-snug">
            <h1 className="text-xl font-bold">&#8377;{data.price}</h1>
            <p className="line-clamp-2 text-gray-600">{data.title}</p>
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isHovered ? "bg-black opacity-40" : "opacity-0"
            }`}
          />
        </NavLink>
      )}

      {!isDesktop && (
        <NavLink
          to={`/productdetails/${data._id}`}
          className="w-[43vw] h-[30vh] relative rounded-lg overflow-hidden"
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {close ? (
            <div className="relative group z-10">
              <div className="absolute right-0 text-xl bg-red-500 rounded-full p-1 text-white">
                <IoMdClose onClick={handleClick} />
              </div>
              <h1 className="hidden absolute -right-7 -top-7 group-hover:block bg-red-400 text-xs rounded-xl p-1 text-white">
                Remove Element
              </h1>
            </div>
          ) : (
            accessToken && (
              <i
                onClick={handleLike}
                className={`ri-heart-3-fill ${
                  style ? "text-red-500" : "text-white"
                } absolute z-10 right-0 text-3xl`}
              ></i>
            )
          )}
          <div className="w-full h-[67%] relative">
            <img
              src={data.image[0]}
              alt=""
              className="w-full h-full object-contain"
            />
            <div className="h-full w-full absolute inset-0 bg-black opacity-30" />
          </div>
          <div className="w-full h-[33%] bg-zinc-300 px-3 overflow-hidden py-2 text-sm leading-snug">
            <h1 className="text-lg font-semibold">&#8377;{data.price}</h1>
            <p className="line-clamp-2 text-gray-600">{data.title}</p>
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isHovered ? "bg-black opacity-40" : "opacity-0"
            }`}
          />
        </NavLink>
      )}
    </>
  );
};

export default Card;
