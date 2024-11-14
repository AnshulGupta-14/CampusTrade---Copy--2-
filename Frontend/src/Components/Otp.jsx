import axios from "../Utils/Axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../Utils/HandleError";
import { useMediaQuery } from "react-responsive";

const Otp = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();
  const OTP_EXPIRY_TIME = 5 * 60 * 1000;

  const [otp, setotp] = useState("");
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);

  useEffect(() => {
    // Only start the timer if timeLeft is greater than 0
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000); // Decrement by 1 second (1000ms)
      }, 1000);

      // Clear interval on component unmount or when timeLeft reaches 0
      return () => clearInterval(timer);
    } else {
      // Handle OTP expiration (e.g., navigate back or show message)
      alert("Your OTP has expired. Please request a new OTP.");
      navigate("/signup"); // Redirect to signup page, or let the user request a new OTP
    }
  }, [timeLeft, navigate]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const submithandler = () => {
    const data = { otp };
    const url = "/users/verify-otp";

    axios
      .post(url, data, { withCredentials: true })
      .then((res) => {
        if (res.data.message) {
          alert("Now you can log in");
          navigate("/login");
        }
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  return (
    <div>
      {isDesktop && (
        <div className="w-full h-screen pt-[6%] flex items-center justify-center">
          <div className="w-[30%] flex flex-col px-10 py-5 bg-white rounded-xl">
            <h1 className="text-2xl font-bold mb-3">Verification</h1>
            <h1 className="mt-5">OTP</h1>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={otp}
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <p>Your otp expires in: {formatTime(timeLeft)}</p>
            <input
              className="rounded-full mt-7 mx-auto w-1/3 px-5 py-2 bg-[#fcd12d]"
              type="submit"
              value={"Verify"}
              onClick={submithandler}
            />
          </div>
        </div>
      )}

      {!isDesktop && (
        <div className="w-full h-[93vh] pt-[6%] flex items-center justify-center">
          <div className="w-[80%] flex flex-col px-10 py-5 bg-white rounded-xl">
            <h1 className="text-2xl font-bold mb-3">Verification</h1>
            <h1 className="mt-5">OTP</h1>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={otp}
              onChange={(e) => {
                setotp(e.target.value);
              }}
            />
            <p>Your otp expires in: {formatTime(timeLeft)}</p>
            <input
              className="rounded-full mt-7 mx-auto w-1/3 px-5 py-2 bg-[#fcd12d]"
              type="submit"
              value={"Verify"}
              onClick={submithandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Otp;
