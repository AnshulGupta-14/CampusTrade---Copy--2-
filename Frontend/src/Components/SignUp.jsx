import React, { useState } from "react";
import axios from "../Utils/Axios";
import { NavLink, useNavigate } from "react-router-dom";
import { errorHandler } from "../Utils/HandleError";
import { useMediaQuery } from "react-responsive";

const SignUp = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [reg, setreg] = useState(null);
  const [mobile, setmobile] = useState("");
  const [avatar, setavatar] = useState("");
  const [Loading, setloading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const submithandler = () => {
    if (!isFormValid()) return;
    setloading(true);
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("mobno", mobile);
    formData.append("regno", reg);
    formData.append("fullname", name);
    formData.append("avatar", avatar);
    const url = "/users/register";
    axios
      .post(url, formData, { withCredentials: true })
      .then((res) => {
        // console.log("hello");
        navigate("/otp");
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => setloading(false));
  };

  return (
    <div>
      {isDesktop && (
        <div className="w-full h-screen pt-[6%] flex items-center justify-center text-[13px] font-semibold">
          <div className="w-[30%] flex flex-col px-10 py-5 bg-white rounded-xl">
            <h1 className="text-2xl font-bold ">Create Account</h1>
            <h2 className="mt-3">Your Name</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <h2 className="mt-3">Registration Number</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="number"
              value={reg}
              onChange={(e) => {
                setreg(e.target.value);
              }}
            />
            <h2 className="mt-3">Email Id</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
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
                onChange={(e) => {
                  setmobile(e.target.value);
                }}
              />
            </div>
            <h2 className="mt-3">Username</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            <h2 className="mt-3">Create Password</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <h2 className="mt-3">Avatar</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="file"
              onChange={(e) => {
                setavatar(e.target.files[0]);
              }}
              accept="image/*"
            />
            <input
              className="rounded-full mt-7 mx-auto w-1/3 px-5 py-2 bg-[#fcd12d]"
              type="submit"
              value={Loading ? "Registering..." : "Register"}
              onClick={submithandler}
              disabled={Loading}
            />
          </div>
        </div>
      )}

      {!isDesktop && (
        <div className="w-full h-[93vh] pt-[25%] flex items-center justify-center text-[13px] font-semibold">
          <div className="w-[80%] flex flex-col px-10 py-5 bg-white rounded-xl">
            <h1 className="text-2xl font-bold ">Create Account</h1>
            <h2 className="mt-3">Your Name</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <h2 className="mt-3">Registration Number</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="number"
              value={reg}
              onChange={(e) => {
                setreg(e.target.value);
              }}
            />
            <h2 className="mt-3">Email Id</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
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
                onChange={(e) => {
                  setmobile(e.target.value);
                }}
              />
            </div>
            <h2 className="mt-3">Username</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            <h2 className="mt-3">Create Password</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="text"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <h2 className="mt-3">Avatar</h2>
            <input
              className="border border-black p-2 py-1 text-md rounded-md"
              type="file"
              onChange={(e) => {
                setavatar(e.target.files[0]);
              }}
              accept="image/*"
            />
            <input
              className="rounded-full mt-7 mx-auto w-1/2 px-5 py-2 bg-[#fcd12d]"
              type="submit"
              value={Loading ? "Registering..." : "Register"}
              onClick={submithandler}
              disabled={Loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
