import axios from "../Utils/Axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Cookies from "js-cookie";
import { errorHandler } from "../Utils/HandleError";
import { useMediaQuery } from "react-responsive";

const ProductDetails = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const [curidx, setcuridx] = useState(0);
  const [product, setproduct] = useState({});
  const [user, setUser] = useState({});
  const id = useParams().id;

  useEffect(() => {
    axios
      .get(`/products/product-details/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response);

        setUser(response.data.data.user);
        setproduct(response.data.data.product);
      })
      .catch((error) => {
        errorHandler(error);
      });
  }, [id]);

  // console.log(product);

  const handleNext = () => {
    setcuridx((prevIndex) =>
      prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setcuridx((prevIndex) =>
      prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {isDesktop && (
        <div className="w-full flex ites-center mt-[7%] px-5">
          <div className="z-50">
            <button
              onClick={handlePrev}
              className="absolute left-5 text-3xl p-2 bg-white rounded-full top-[45%]"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-[35.2%] text-3xl p-2 bg-white rounded-full top-[45%]"
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="w-[65%] p-5">
            <div className="relative w-full bg-white h-[85vh] rounded-md overflow-hidden">
              <div className="relative flex items-center justify-center h-[80%] w-full">
                {product.image && (
                  <img
                    src={product.image[curidx]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
                {product.image && (
                  <h1 className="absolute bottom-5 right-5 bg-black text-white text-[10px] rounded-full py-[7px] px-1">
                    {curidx + 1} / {product.image.length}
                  </h1>
                )}
              </div>
              <div className="relative flex flex-wrap items-center h-[20%] w-full p-5 gap-5">
                {product.image &&
                  product.image.map((item, idx) => (
                    <img
                      key={idx}
                      src={item}
                      alt=""
                      className={`h-full w-[10%] rounded-lg ${
                        curidx === idx && "border-2 border-black"
                      }`}
                    />
                  ))}
              </div>
            </div>
            <div className="w-full bg-white p-5 mt-5 rounded-md">
              <h1 className="text-2xl font-bold mb-3">Description</h1>
              <h1>{product.description}</h1>
            </div>
          </div>
          <div className="w-[35%] p-5 flex flex-col gap-5">
            <div className="w-full bg-white px-5 py-3 rounded-md">
              <h1 className="text-3xl font-bold">&#8377; {product.price}</h1>
              <h1>{product.title}</h1>
            </div>
            <div className="w-full bg-white px-5 py-3 rounded-md">
              <NavLink to={`/profile/${product.owner}`}>
                <div className="w-full flex items-center gap-7">
                  <div className="h-[13vh] w-[7vw]">
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <h1 className="text-xl font-bold">{user.fullname}</h1>
                </div>
              </NavLink>
              {Cookies.get("accessToken") ? (
                <div
                  onClick={() => navigate("/chatbox", { state: { product } })}
                  className="w-full py-3 border-2 mt-5 border-black font-bold text-center"
                >
                  <h1>Contact</h1>
                </div>
              ) : (
                <NavLink to="/login">
                  <div className="w-full py-3 border-2 mt-5 border-black font-bold text-center">
                    Contact
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}

      {!isDesktop && (
        <div className="w-full flex flex-col ites-center mt-[26%] px-5 py-5 gap-5">
          <div className="z-50">
            <button
              onClick={handlePrev}
              className="absolute left-1 text-2xl p-2 bg-white rounded-full top-[40%]"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-1 text-2xl p-2 bg-white rounded-full top-[40%]"
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="relative w-full bg-white h-[50vh] rounded-lg overflow-hidden">
            <div className="relative flex items-center justify-center h-[80%] w-full">
              {product.image && (
                <img
                  src={product.image[curidx]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
              {product.image && (
                <h1 className="absolute bottom-5 right-5 bg-black text-white text-[10px] rounded-full py-[7px] px-1">
                  {curidx + 1} / {product.image.length}
                </h1>
              )}
            </div>
            <div className="relative flex flex-wrap items-center h-[20%] w-full p-5 gap-5">
              {product.image &&
                product.image.map((item, idx) => (
                  <img
                    key={idx}
                    src={item}
                    alt=""
                    className={`h-full w-[15%] rounded-md ${
                      curidx === idx && "border-2 border-black"
                    }`}
                  />
                ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="w-full bg-white p-5 rounded-lg">
              <h1 className="text-2xl font-bold mb-3">Description</h1>
              <h1>{product.description}</h1>
            </div>
            <div className="w-full bg-white px-5 py-3 rounded-md">
              <h1 className="text-xl font-bold">&#8377; {product.price}</h1>
              <h1>{product.title}</h1>
            </div>
            <div className="w-full bg-white rounded-md px-5 py-3">
              <NavLink to={`/profile/${product.owner}`}>
                <div className="w-full flex items-center gap-7">
                  <div className="h-[7vh] w-[14vw]">
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <h1 className="text-xl font-bold">{user.fullname}</h1>
                </div>
              </NavLink>
              <div className="w-full py-3 border-2 mt-5 border-black font-bold text-center">
                {Cookies.get("accessToken") ? (
                  <h1>Contact: {user.mobno}</h1>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Contact: ***********</span>
                    <NavLink to="/login" className="ml-3 text-xs text-blue-600">
                      {" "}
                      show
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
