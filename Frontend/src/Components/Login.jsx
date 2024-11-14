import axios from "../Utils/Axios";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { errorHandler } from "../Utils/HandleError";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Cookies from 'js-cookie'
import { AuthContext } from "../Context/AuthContext";
import { useMediaQuery } from "react-responsive";

const Login = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();
  const { updateAccessToken } = useContext(AuthContext);

  const [regno, setregno] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submithandler = () => {
    setLoading(true);
    const url = "/users/login";
    const data = { regno, password };

    axios
      .post(url, data, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        alert(res.data.message);
        updateAccessToken(res.data.data.accessToken);
        navigate("/home");
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {isDesktop && (
        <div className="w-full h-screen pt-[6%] flex items-center justify-center">
          <div className="w-[30%] flex flex-col px-10 py-5 bg-white rounded-xl">
            <h1 className="text-2xl font-bold ">Sign in</h1>
            <h2 className="mt-5">Registration no.</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={regno}
              onChange={(e) => {
                setregno(e.target.value);
              }}
            />
            <h2 className="mt-5">Password</h2>
            <div className="relative w-full flex items-center">
              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(false)}
                  className="absolute right-2"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="absolute right-2"
                />
              )}
              <input
                className="w-full border border-black p-2 py-1 text-md rounded-md"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <input
              className="rounded-full mt-7 mx-auto w-1/3 px-5 py-2 bg-[#fcd12d]"
              type="submit"
              value={loading ? "Wait..." : "Login"}
              disabled={loading}
              onClick={submithandler}
            />

            <h1 className="mx-auto mt-10 text-xs font-bold text-zinc-700">
              New to CampusTrade?
            </h1>
            <NavLink
              to={"/signup"}
              className="rounded-full mt-2 mx-auto px-5 py-2 bg-[#fcd12d]"
            >
              Create Account
            </NavLink>
          </div>
        </div>
      )}

      {!isDesktop && (
        <div className="w-full h-[93vh] pt-[6%] flex items-center justify-center">
          <div className="w-[80%] flex flex-col px-10 py-5 bg-white rounded-xl">
            <h1 className="text-2xl font-bold ">Sign in</h1>
            <h2 className="mt-5">Registration no.</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={regno}
              onChange={(e) => {
                setregno(e.target.value);
              }}
            />
            <h2 className="mt-5">Password</h2>
            <div className="relative w-full flex items-center">
              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(false)}
                  className="absolute right-2"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="absolute right-2"
                />
              )}
              <input
                className="w-full border border-black p-2 py-1 text-md rounded-md"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <input
              className="rounded-full mt-7 mx-auto w-1/3 px-5 py-2 bg-[#fcd12d]"
              type="submit"
              value={loading ? "Wait..." : "Login"}
              disabled={loading}
              onClick={submithandler}
            />

            <h1 className="mx-auto mt-10 text-xs font-bold text-zinc-700">
              New to CampusTrade?
            </h1>
            <NavLink
              to={"/signup"}
              className="rounded-full mt-2 mx-auto px-5 py-2 bg-[#fcd12d]"
            >
              Create Account
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
