import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "../../Utils/Axios";
import { errorHandler } from "../../Utils/HandleError";

const UpdateAvatar = () => {
  const avatar = useOutletContext().user.avatar;
  const handleChange = useOutletContext().handleUserUpdate;

  const navigate = useNavigate();
  const [image, setImage] = useState("");

  const handleClick = () => {
    navigate(-1);
  };

  const onButtonClick = async () => {
    if (!image) {
      alert("Please select an image before uploading.");
      return;
    }

    const data = new FormData();
    data.append("avatar", image); // Append the image blob to FormData
    axios
      .post("/users/update-avatar", data, {
        withCredentials: true,
      })
      .then((res) => {
        alert("Avatar updated successfully.");
        handleChange();
        navigate(-1);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  return (
    <div className="absolute top-0 pt-[7%] px-9 h-[100vh] w-[100vw] bg-[rgba(0,0,0,.7)]">
      <div className="flex flex-col items-center relative">
        <img
          src={image ? URL.createObjectURL(image) : avatar}
          alt=""
          className="h-[40vh] w-[21vw] rounded-full mx-auto translate-y-[40%]"
        />
        <button
          onClick={onButtonClick}
          className="flex items-center justify-center p-3 bg-blue-500 rounded-full text-white translate-y-[300%]"
        >
          Update Avatar
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          className="hidden h-[40vh] w-[21vw] translate-x-[200%] translate-y-[60%]"
          id="fileInput"
        />
      </div>
      <button>
        <CiEdit
          onClick={() => document.getElementById("fileInput").click()}
          className="absolute top-48 left-[57%] text-3xl bg-white rounded-full"
        />
        <IoMdClose
          onClick={handleClick}
          className="absolute text-3xl bg-red-500 rounded-full p-1 text-white top-48 left-[60%]"
        />
      </button>
    </div>
  );
};

export default UpdateAvatar;
