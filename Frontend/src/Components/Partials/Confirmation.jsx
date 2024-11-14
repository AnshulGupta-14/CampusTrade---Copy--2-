import axios from "../../Utils/Axios";
import React from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { errorHandler } from "../../Utils/HandleError";

const Confirmation = () => {
  const { onChange } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;

  const removeHandler = (id) => {
    axios
      .delete(`/products/remove-ad/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        alert("Product removed successfully");
        onChange();
        navigate(-1);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  return (
    <div className="w-[50%] bg-white mx-auto p-10">
      <h1 className="font-bold">
        Are you want to remove this product after removing you can not able to
        undo
      </h1>
      <div className="mt-5 flex items-center gap-5 justify-end">
        <NavLink to="/my-ads" className="p-2 px-4 rounded-xl bg-green-400">
          No
        </NavLink>
        <button
          onClick={() => removeHandler(id)}
          className="p-2 px-4 rounded-xl bg-blue-600 text-white"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
