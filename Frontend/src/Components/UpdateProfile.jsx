import axios from "../Utils/Axios";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { errorHandler } from "../Utils/HandleError";
import { useMediaQuery } from "react-responsive";

const UpdateProfile = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();

  const location = useLocation();
  const user = location.state || {};

  const [username, setusername] = useState(user.username);
  const [name, setname] = useState(user.fullname);
  const [email, setemail] = useState(user.email);
  const [mobile, setmobile] = useState(user.mobno);

  const handleClick = () => {
    axios
      .put(
        `/users/update-account-details`,
        {
          username,
          fullname: name,
          email,
          mobno: mobile,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        alert("Profile updated successfully!");
        navigate(`/profile/${user._id}`);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  return (
    <div className="pt-[6%] flex justify-between min-h-[100vh]">
      {isDesktop && (
        <div className="w-[40%] flex flex-col px-10 py-5 bg-white rounded-xl m-auto">
          <h1 className="text-2xl font-bold mb-10">Update Profile</h1>
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="mt-3">Username</h2>
              <input
                className="border border-black p-2 py-1 text-md rounded-md w-full"
                type="text"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <h2 className="mt-3">Name</h2>
              <input
                className="border border-black p-2 py-1 text-md rounded-md w-full"
                type="text"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <h2 className="mt-3">Email Id</h2>
              <input
                className="border border-black p-2 py-1 text-md rounded-md w-full"
                type="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>

            <div className="w-full">
              <h2 className="mt-3">Phone Number</h2>
              <div className="flex gap-2">
                <button className="border border-black p-2 py-1 text-md rounded-md">
                  +91
                </button>
                <input
                  className="w-full border border-black p-2 py-1 text-md rounded-md"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={mobile}
                  onClick={() => navigate("mobile", { state: mobile })}
                  onChange={(e) => {
                    setmobile(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="p-2 bg-[#002f34] w-fit mx-auto rounded-xl text-white mt-10"
          >
            Save Changes
          </button>
        </div>
      )}

      {!isDesktop && (
        <div className="w-[80%] flex flex-col px-10 py-5 bg-white rounded-xl m-auto">
          <h1 className="text-2xl font-bold mb-10">Update Profile</h1>
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="mt-3">Username</h2>
              <input
                className="border border-black p-2 py-1 text-md rounded-md w-full"
                type="text"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <h2 className="mt-3">Name</h2>
              <input
                className="border border-black p-2 py-1 text-md rounded-md w-full"
                type="text"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <h2 className="mt-3">Email Id</h2>
              <input
                className="border border-black p-2 py-1 text-md rounded-md w-full"
                type="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>

            <div className="w-full">
              <h2 className="mt-3">Phone Number</h2>
              <div className="flex gap-2">
                <button className="border border-black p-2 py-1 text-md rounded-md">
                  +91
                </button>
                <input
                  className="w-full border border-black p-2 py-1 text-md rounded-md"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={mobile}
                  onClick={() => navigate("mobile", { state: mobile })}
                  onChange={(e) => {
                    setmobile(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="p-2 bg-[#002f34] w-fit mx-auto rounded-xl text-white mt-10"
          >
            Save Changes
          </button>
        </div>
      )}
      <Outlet></Outlet>
    </div>
  );
};

export default UpdateProfile;
