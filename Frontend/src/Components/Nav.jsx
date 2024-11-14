import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";
import axios from "../Utils/Axios";
import { jwtDecode } from "jwt-decode";
import { errorHandler } from "../Utils/HandleError";
import { AuthContext } from "../Context/AuthContext";
import { useMediaQuery } from "react-responsive";

const Nav = ({ data }) => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();
  const { accessToken, updateAccessToken } = useContext(AuthContext);
  const user = accessToken ? jwtDecode(accessToken) : null;
  const [showOver, setshowOver] = useState(false);
  const [search, setsearch] = useState("");

  const handleLogout = useCallback(() => {
    axios
      .post(
        "/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        alert("You have been logged out");
        updateAccessToken(null);
        navigate("/");
      })
      .catch((error) => {
        errorHandler(error);
      });
    setshowOver(false);
    navigate("/");
  }, []);

  const products = data.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
    // product.author.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <div className="fixed left-0 top-0 w-full z-50">
      {isDesktop && (
        <>
          <div className="w-full h-[12vh] p-2 bg-zinc-300 px-10 flex items-center">
            <div className="w-[10%] h-full flex items-center">
              <img src="MainLogo.png" alt="" className="w-[80%] h-full cursor-pointer" onClick={()=>navigate("/home")}/>
            </div>
            <div className="relative p-1 h-[80%] w-[60%] mx-auto flex justify-between">
              <button className="p-3 mr-2 flex items-center bg-[#003034] text-white text-2xl rounded-lg">
                <IoSearchOutline />
              </button>
              <input
                type="text"
                placeholder="Find Books"
                className="p-2 border-[2px] border-black w-[91%] h-full rounded-lg"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              {search.length > 0 && (
                <button
                  onClick={() => setsearch("")}
                  className="p-3 ml-2 flex items-center hover:bg-red-500 text-2xl rounded-lg"
                >
                  <IoCloseSharp />
                </button>
              )}
              <div className="absolute w-[80%] max-h-[50vh] bg-zinc-200 text-black text-xl top-[100%] left-[10%] overflow-auto">
                {products && products.length > 0 && search
                  ? products.map((s, i) => {
                      return (
                        <Link
                          onClick={() => setsearch("")}
                          to={`/productdetails/${s._id}`}
                          key={i}
                          className="p-5 w-full bg-zinc-400 p-8 hover:bg-zinc-300 hover:font-semibold border-b-2 border-white duration-300 flex items-center justify-start"
                        >
                          <img
                            className="w-[5vw] h-[10vh] object-cover object-center rounded-full mr-10 shadow-xl bg-black"
                            src={s.image[0]}
                            alt=""
                          />
                          <div>
                            <h1>{s.title}</h1>
                            <h3 className="text-sm">By {s.author}</h3>
                            <h3 className="text-sm">Price</h3>
                          </div>
                        </Link>
                      );
                    })
                  : search && (
                      <h1 className="p-5 w-full bg-zinc-300 p-8 hover:bg-zinc-400 hover:font-semibold border-b-2 border-white duration-300 flex items-center justify-start">
                        No Book is available with this name
                      </h1>
                    )}
              </div>
            </div>

            {!accessToken ? (
              <div className="w-[10%]">
                <NavLink
                  className={
                    "p-2 px-7 bg-[#fcd12d] rounded-xl text-lg font-semibold"
                  }
                  to={"/login"}
                >
                  Login
                </NavLink>
              </div>
            ) : (
              <div
                className="w-[15%] flex items-center justify-center relative"
                onMouseLeave={() => {
                  setshowOver(false);
                }}
                onClick={() => {
                  setshowOver(!showOver);
                }}
              >
                <div
                  onMouseEnter={() => {
                    setshowOver(true);
                  }}
                  className="flex items-center justify-center shadow-inner bg-[#002f34] h-12 w-12 rounded-full text-white"
                >
                  {user ? (
                    <h1 className="text-2xl font-bold">
                      {user.fullname[0].toUpperCase()}
                    </h1>
                  ) : (
                    <BiSolidUser className="text-2xl"></BiSolidUser>
                  )}
                </div>

                {showOver && (
                  <div className="absolute top-12 bg-white p-3 z-20 rounded-lg">
                    <div className="p-2 flex flex-col gap-2">
                      <Link
                        className="p-2 rounded-lg bg-zinc-400"
                        to={`/profile/${jwtDecode(accessToken)._id}`}
                      >
                        MY PROFILE{" "}
                      </Link>
                      <Link
                        className="p-2 rounded-lg bg-zinc-400"
                        to="/addproduct"
                      >
                        ADD PRODUCT{" "}
                      </Link>
                      <Link
                        className="p-2 rounded-lg bg-zinc-400"
                        to="/favourites"
                      >
                        FAVOURITES{" "}
                      </Link>
                      <Link className="p-2 rounded-lg bg-zinc-400" to="/my-ads">
                        MY ADS{" "}
                      </Link>
                      <Link
                        className="p-2 rounded-lg bg-zinc-400"
                        onClick={handleLogout}
                      >
                        LOGOUT
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-full bg-white p-1"></div>
        </>
      )}

      {!isDesktop && (
        <>
          <div className="w-screen h-[7vh] p-2 px-5 bg-zinc-300 flex items-center justify-between">
            {!accessToken ? (
              <div className="w-[15%]">
                <NavLink
                  className={"p-2 px-3 bg-[#fcd12d] rounded-xl text-xs"}
                  to={"/login"}
                >
                  Login
                </NavLink>
              </div>
            ) : (
              <div
                className="w-[10%] flex items-center justify-center relative"
                onMouseLeave={() => {
                  setshowOver(false);
                }}
                onClick={() => {
                  setshowOver(!showOver);
                }}
              >
                <div
                  onMouseEnter={() => {
                    setshowOver(true);
                  }}
                  className="flex items-center justify-center shadow-inner bg-[#002f34] h-9 w-10 rounded-full text-white"
                >
                  {user ? (
                    <h1 className="text-2xl font-bold">
                      {user.fullname[0].toUpperCase()}
                    </h1>
                  ) : (
                    <BiSolidUser className="text-xl"></BiSolidUser>
                  )}
                </div>

                {showOver && (
                  <div className="absolute w-[35vw] top-10 left-0 bg-white z-20">
                    <div className="p-2 flex flex-col gap-2 text-xs">
                      <Link
                        className="p-2 rounded-lg bg-blue-500"
                        to={`/profile/${jwtDecode(accessToken)._id}`}
                      >
                        MY PROFILE{" "}
                      </Link>
                      <Link
                        className="p-2 rounded-lg bg-blue-500"
                        to="/addproduct"
                      >
                        ADD PRODUCT{" "}
                      </Link>
                      <Link
                        className="p-2 rounded-lg bg-blue-500"
                        to="/favourites"
                      >
                        FAVOURITES{" "}
                      </Link>
                      <Link className="p-2 rounded-lg bg-blue-500" to="/my-ads">
                        MY ADS{" "}
                      </Link>
                      <Link
                        className="p-2 rounded-lg bg-blue-500"
                        onClick={handleLogout}
                      >
                        LOGOUT
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="w-[15%] h-full flex items-center">
              <img src="MainLogo.png" alt="" className="w-full h-full" />
            </div>
          </div>
          <div className="p-2 px-5 mt-1 h-[5vh] w-full flex justify-between bg-zinc-300">
            <input
              type="text"
              placeholder="Find Books"
              className="p-2 border-[2px] border-black w-full h-full rounded text-xs"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
            {search.length > 0 && (
              <button
                onClick={() => setsearch("")}
                className="p-1 ml-2 flex items-center text-white bg-red-500 text-xl rounded-full"
              >
                <IoCloseSharp />
              </button>
            )}
            <div className="absolute w-[80%] max-h-[50vh] bg-zinc-200 text-black top-[104%] left-[5%] overflow-auto">
              {products && products.length > 0 && search
                ? products.map((s, i) => {
                    return (
                      <Link
                        onClick={() => setsearch("")}
                        to={`/productdetails/${s._id}`}
                        key={i}
                        className="p-5 w-full bg-zinc-400 p-2 hover:bg-zinc-300 hover:font-semibold border-b-2 border-white duration-300 flex items-center gap-5 overflow-hidden"
                      >
                        <img
                          className="w-[10vw] h-[5vh] object-cover object-center rounded-full shadow-xl bg-black"
                          src={s.image[0]}
                          alt=""
                        />
                        <div>
                          <h1 className="line-clamp-1">{s.title}</h1>
                          <h3 className="text">{s.price}</h3>
                        </div>
                      </Link>
                    );
                  })
                : search && (
                    <h1 className="p-5 w-full bg-zinc-300 hover:bg-zinc-400 hover:font-semibold border-b-2 border-white duration-300 flex items-center justify-start">
                      No Book is available with this name
                    </h1>
                  )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
