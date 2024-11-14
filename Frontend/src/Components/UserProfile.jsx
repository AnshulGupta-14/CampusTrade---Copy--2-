import React, { useEffect, useRef, useState } from "react";
import axios from "../Utils/Axios";
import Cards from "./Partials/Cards";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { errorHandler } from "../Utils/HandleError";
import { useMediaQuery } from "react-responsive";

const UserProfile = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const location = useLocation();
  const id = useParams()?.id;
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [user, setuser] = useState({});
  const [userId, setUserId] = useState("");

  const getProducts = () => {
    axios
      .get(`/products/get-products/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setproducts(res.data.data);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  const getUser = () => {
    axios
      .get(`/users/get-current-user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setuser(res.data.data);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    // console.log(accessToken);

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUserId(decodedToken._id);
    }
    getProducts();
    getUser();
  }, [location]);

  const handleProductUpdate = () => {
    getProducts();
  };

  const handleUserUpdate = () => {
    getUser();
  };
  const arr = user.createdAt?.split("T")[0].split("-");

  const editProfile = () => {
    navigate(`/update-profile`, { state: user });
  };

  const changePassword = () => {
    navigate(`/password`, { state: user });
  };

  return (
    <>
      {isDesktop && (
        <div className="pt-[6%] flex relative">
          <div className="w-[20%] p-5">
            <img
              src={user.avatar}
              alt=""
              className="h-24 w-24 rounded-full mx-auto"
            />

            <div className="pt-5 text-xl font-bold flex flex-col items-center">
              <h2>{user.username}</h2>
              <h2>{user.fullname}</h2>
              <h2>{user.regno}</h2>
              <h6 className="text-xs font-medium text-zinc-600 mt-1">
                Member Since: {arr && arr[2]}-{arr && arr[1]}-{arr && arr[0]}
              </h6>
              {id === userId && (
                <>
                  <button
                    className="text-sm font-medium mt-7 p-3 bg-[#002f34] text-white rounded-xl"
                    onClick={editProfile}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="text-sm font-medium mt-3 p-3 bg-[#002f34] text-white rounded-xl"
                    onClick={changePassword}
                  >
                    Change Password
                  </button>
                </>
              )}
            </div>
          </div>
          {products.length > 0 ? (
            <div className="w-[75%] px-[.77%] p-5">
              <h1 className="text-2xl font-bold">Your Products</h1>
              <Cards
                data={products}
                close={userId === id && true}
                onUpdate={handleProductUpdate}
              ></Cards>
            </div>
          ) : (
            <div className="w-[75%] h-[87vh] p-5 flex flex-col items-center justify-center">
              <img src="/Empty.png" alt="" className="w-1/4" />
              <h1 className="text-xl font-bold mt-7">
                You haven't listed anything yet
              </h1>
              <h1 className="text-zinc-500 mt-2">
                Let go of what you don't use anymore
              </h1>
              <NavLink
                to={"/addproduct"}
                className={"mt-7 p-3 bg-[#002f34] text-white rounded-xl"}
              >
                Start selling
              </NavLink>
            </div>
          )}
        </div>
      )}

      {!isDesktop && (
        <div className="pt-[22%] h-[100vh] flex flex-col relative">
          <div className="w-full p-5 h-[25%] flex gap-10 items-center justify-center">
            <img
              src={user.avatar}
              alt=""
              className="h-28 w-28 rounded-full"
            />

            <div className="text-lg font-bold flex flex-col">
              <h2>{user.username}</h2>
              <h2>{user.fullname}</h2>
              <h2>{user.regno}</h2>
              <h6 className="text-xs font-medium text-zinc-600 mt-1">
                Member Since: {arr && arr[2]}-{arr && arr[1]}-{arr && arr[0]}
              </h6>
            </div>
          </div>
          {id === userId && (
            <div className="mx-auto">
              <button
                className="text-sm font-medium p-3 bg-[#002f34] text-white rounded-xl"
                onClick={editProfile}
              >
                Edit Profile
              </button>
              <button
                className="text-sm font-medium ml-3 p-3 bg-[#002f34] text-white rounded-xl"
                onClick={changePassword}
              >
                Change Password
              </button>
            </div>
          )}
          {products.length > 0 ? (
            <div className="w-full py-5 px-[1.8%]">
              <h1 className="text-2xl -mb-3 font-bold px-[2%]">
                Your Products
              </h1>
              <Cards
                data={products}
                close={userId === id && true}
                onUpdate={handleProductUpdate}
              ></Cards>
            </div>
          ) : (
            <div className="w-full h-[65%] p-5 flex flex-col items-center justify-center">
              <img src="/Empty.png" alt="" className="w-1/2" />
              <h1 className="text-xl font-bold mt-7">
                You haven't listed anything yet
              </h1>
              <h1 className="text-zinc-500 mt-2">
                Let go of what you don't use anymore
              </h1>
              <NavLink
                to={"/addproduct"}
                className={"mt-7 p-3 bg-[#002f34] text-white rounded-xl"}
              >
                Start selling
              </NavLink>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
