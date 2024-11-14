import React, { useState } from "react";
import { errorHandler } from "../../Utils/HandleError";
import axios from "../../Utils/Axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const UpdatePassword = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    axios
      .post(
        `/users/update-password`,
        {
          currentPassword,
          newPassword,
          confPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        alert("Passwod updated successfully!");
        navigate(-1);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };
  return (
    <div className="h-[100vh] w-[100vw] bg-[rgba(0,0,0,.7)] flex items-center justify-centre">
      {isDesktop && (
        <div className="w-[40%] flex flex-col px-10 py-5 bg-white rounded-xl m-auto">
          <h1 className="text-2xl font-bold mb-10">Update Password</h1>
          <div className="flex flex-col gap-5">
            <div className="relative">
              <h2 className="mt-3">Current Password</h2>
              <div className="relative flex items-center">
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
                  className="border border-black p-2 py-1 text-md rounded-md w-full"
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <h2 className="mt-3">New Password</h2>
              <div className="relative flex items-center">
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
                  className="border border-black p-2 py-1 text-md rounded-md w-full"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <h2 className="mt-3">Confirm Password</h2>
              <div className="relative flex items-center">
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
                  className="border border-black p-2 py-1 text-md rounded-md w-full"
                  type={showPassword ? "text" : "password"}
                  value={confPassword}
                  onChange={(e) => {
                    setConfPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="p-2 bg-[#002f34] w-fit mx-auto rounded-xl text-white mt-10"
          >
            Save Password
          </button>
        </div>
      )}

      {!isDesktop && (
        <div className="w-[80%] flex flex-col px-10 py-5 bg-white rounded-xl m-auto">
          <h1 className="text-2xl font-bold mb-10">Update Password</h1>
          <div className="flex flex-col gap-5">
            <div className="relative">
              <h2 className="mt-3">Current Password</h2>
              <div className="relative flex items-center">
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
                  className="border border-black p-2 py-1 text-md rounded-md w-full"
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <h2 className="mt-3">New Password</h2>
              <div className="relative flex items-center">
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
                  className="border border-black p-2 py-1 text-md rounded-md w-full"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <h2 className="mt-3">Confirm Password</h2>
              <div className="relative flex items-center">
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
                  className="border border-black p-2 py-1 text-md rounded-md w-full"
                  type={showPassword ? "text" : "password"}
                  value={confPassword}
                  onChange={(e) => {
                    setConfPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="p-2 bg-[#002f34] w-fit mx-auto rounded-xl text-white mt-10"
          >
            Save Password
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
