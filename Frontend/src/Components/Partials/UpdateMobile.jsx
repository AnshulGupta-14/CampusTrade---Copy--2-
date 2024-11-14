import axios from "../../Utils/Axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { errorHandler } from "../../Utils/HandleError";
import { useMediaQuery } from "react-responsive";

const UpdateMobile = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const location = useLocation();
  const mobile = location.state;
  const [phone, setphone] = useState(mobile);
  const [show, setshow] = useState(false);
  const [otp, setotp] = useState("");

  const handleClick = () => {
    axios
      .put("/users/update-mobile", { mobno: phone }, { withCredentials: true })
      .then((res) => {
        console.log(res);

        setshow(true);
        alert("OTP sent successfully");
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const handleVerify = () => {
    axios
      .post(
        "/users/verify-otp",
        {
          otp,
        },
        { withCredentials: true }
      )
      .then(() => {
        alert("Mobile number updated successfully");
        setshow(false);
        navigate("/profile");
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  useEffect(() => {
    // Focus the input field whenever the component renders
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      {isDesktop && (
        <div className="absolute w-[40%] h-[75vh] rounded-xl bg-white p-5 flex flex-col items-center translate-x-[75%] translate-y-[10%]">
          <h1 className="text-xl font-bold mt-10">
            Enter your new phone number to get verified
          </h1>
          <h1 className="text-sm text-zinc-600 font-semibold mt-3">
            We will send you a verification code on same number
          </h1>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full mt-10 p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-zinc-500"
            value={phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
          {!show ? (
            <button
              onClick={handleClick}
              className="p-2 bg-[#002f34] w-fit mx-auto rounded-xl text-white mt-10"
            >
              Save Changes
            </button>
          ) : (
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter verification code"
                className="w-full mt-10 p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-zinc-500"
                value={otp}
                onChange={(e) => {
                  setotp(e.target.value);
                }}
              />
              <button
                onClick={handleVerify}
                className="px-3 py-1 bg-[#002f34] w-fit translate-x-[300%] rounded-xl text-white mt-10"
              >
                Verify
              </button>
            </div>
          )}
        </div>
      )}

      {!isDesktop && (
        <div className="absolute mt-[26%] mx-[10%] h-[71.5%] w-[80%] flex flex-col px-10 py-5 bg-white rounded-xl">
          <h1 className="text-xl font-bold mt-10">
            Enter your new phone number to get verified
          </h1>
          <h1 className="text-sm text-zinc-600 font-semibold mt-3">
            We will send you a verification code on same number
          </h1>
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter your phone number"
            className="w-full mt-10 p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-zinc-500"
            value={phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
          {!show ? (
            <button
              onClick={handleClick}
              className="p-2 bg-[#002f34] w-fit mx-auto rounded-xl text-white mt-10"
            >
              Save Changes
            </button>
          ) : (
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter verification code"
                className="w-full mt-10 p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-zinc-500"
                value={otp}
                onChange={(e) => {
                  setotp(e.target.value);
                }}
              />
              <button
                onClick={handleVerify}
                className="px-3 py-1 bg-[#002f34] w-fit translate-x-[300%] rounded-xl text-white mt-10"
              >
                Verify
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateMobile;
