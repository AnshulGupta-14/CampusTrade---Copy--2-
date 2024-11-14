import axios from "../Utils/Axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../Utils/HandleError";
import "remixicon/fonts/remixicon.css";
import { useMediaQuery } from "react-responsive";

const AddProduct = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("select");
  const [image, setimage] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const imageRef = useRef(null);

  const validateFields = () => {
    const newErrors = {
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    };
    let hasError = false;

    if (!title) {
      newErrors.title = "Title is required.";
      hasError = true;
    }
    if (!description) {
      newErrors.description = "Description is required.";
      hasError = true;
    } else {
      const wordCount = description.trim().split(/\s+/).length;
      if (wordCount < 10) {
        newErrors.description = "Description must contain at least 10 words.";
        hasError = true;
      }
    }
    if (!price) {
      newErrors.price = "Price is required.";
      hasError = true;
    }
    if (category === "select") {
      newErrors.category = "Category is required.";
      hasError = true;
    }
    if (image.length === 0) {
      newErrors.image = "At least one image is required.";
      hasError = true;
    }

    setErrors(newErrors);
    return hasError; // Return true if there are errors
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error for this field
    validateFields(); // Validate fields on change
  };

  const handleBlur = (field) => {
    validateFields();
  };

  const handleApi = () => {
    setLoading(true);
    if (validateFields()) {
      // Scroll to the first error field
      const firstErrorKey = Object.keys(errors).find((key) => errors[key]);
      switch (firstErrorKey) {
        case "title":
          titleRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
        case "description":
          descriptionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
        case "price":
          priceRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
        case "category":
          categoryRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
        case "image":
          imageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          break;
        default:
          break;
      }
      return; // Stop execution if there are errors
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    image.forEach((img) => {
      formData.append("image", img);
    });
    // console.log(formData.get("image"));

    const url = "/products/add-products";
    axios
      .post(url, formData, { withCredentials: true })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {isDesktop && (
        <div className="w-1/2 mx-auto pt-[8%] h-full pb-5">
          <h1 className="text-xl font-bold">Product Details</h1>
          <h1 className="mt-5">Add Title</h1>
          <input
            ref={titleRef}
            type="text"
            value={title}
            placeholder="Title"
            required
            className="w-full border border-black text-xl p-2 rounded-md"
            onChange={handleInputChange(settitle, "title")}
            onBlur={() => handleBlur("title")}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          <h1 className="mt-5">Description</h1>
          <textarea
            ref={descriptionRef}
            className="w-full border border-black p-2 rounded-md"
            value={description}
            rows="3"
            cols="50"
            onChange={handleInputChange(setdescription, "description")}
            onBlur={() => handleBlur("description")}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}

          <h1 className="mt-5">Price</h1>
          <input
            ref={priceRef}
            type="number"
            value={price}
            className="border border-black text-l p-2 rounded-md w-full"
            onChange={handleInputChange(setprice, "price")}
            onBlur={() => handleBlur("price")}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}

          <h1 className="mt-5">Images</h1>
          <input
            ref={imageRef}
            type="file"
            className="form-control border border-black p-2 rounded-md w-full"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files); // Convert FileList to array
              setimage((prev) => [...prev, ...selectedFiles]); // Append the new files to the existing state
              setErrors((prev) => ({ ...prev, image: "" }));
              validateFields();
            }}
            multiple
            accept="image/*"
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}

          {image.length > 0 ? (
            <div className="flex items-center gap-1 flex-wrap py-5">
              {image.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.title}
                    className="h-24 w-24 object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                  <div className="h-10 w-10 absolute -top-1 -right-5">
                    <i
                      onClick={() => setimage(image.filter((i) => i != file))}
                      className="ri-close-line h-full w-full p-[1px] text-white rounded-full bg-red-500 text-lg cursor-pointer"
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex items-center mt-7 gap-5">
            <h1>Category: </h1>
            <select
              ref={categoryRef}
              title=""
              id=""
              value={category}
              onChange={handleInputChange(setcategory, "category")}
              onBlur={() => handleBlur("category")}
              className="border border-black"
            >
              <option value="select">Select</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Educational/Academic</option>
              <option>Spirituality/Religion</option>
              <option>Graphic Novels/Comics</option>
              <option>Poetry</option>
              <option>Business/Finance</option>
              <option>Humor/Satire</option>
            </select>
          </div>
          {errors.category && <p className="text-red-500">{errors.category}</p>}

          <input
            type="submit"
            value={loading ? "Adding..." : "Add Product"}
            disabled={loading}
            onClick={handleApi}
            className="ml-[40%] test-center mt-7 rounded-full px-7 py-2 bg-[#fcd12d] cursor-pointer"
          />
        </div>
      )}

      {!isDesktop && (
        <div className="w-1/2 mx-auto pt-[7%] h-full pb-5">
          <h1 className="text-xl font-bold">Product Details</h1>
          <h1 className="mt-5">Add Title</h1>
          <input
            ref={titleRef}
            type="text"
            value={title}
            placeholder="Title"
            required
            className="w-full border border-black text-xl p-2 rounded-md"
            onChange={handleInputChange(settitle, "title")}
            onBlur={() => handleBlur("title")}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          <h1 className="mt-5">Description</h1>
          <textarea
            ref={descriptionRef}
            className="w-full border border-black p-2 rounded-md"
            value={description}
            rows="3"
            cols="50"
            onChange={handleInputChange(setdescription, "description")}
            onBlur={() => handleBlur("description")}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}

          <h1 className="mt-5">Price</h1>
          <input
            ref={priceRef}
            type="number"
            value={price}
            className="border border-black text-l p-2 rounded-md w-full"
            onChange={handleInputChange(setprice, "price")}
            onBlur={() => handleBlur("price")}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}

          <h1 className="mt-5">Images</h1>
          <input
            ref={imageRef}
            type="file"
            className="form-control border border-black p-2 rounded-md w-full"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files); // Convert FileList to array
              setimage((prev) => [...prev, ...selectedFiles]); // Append the new files to the existing state
              setErrors((prev) => ({ ...prev, image: "" }));
              validateFields();
            }}
            multiple
            accept="image/*"
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}

          {image.length > 0 ? (
            <div className="flex items-center gap-1 flex-wrap py-5">
              {image.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.title}
                    className="h-24 w-24 object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                  <div className="h-10 w-10 absolute -top-1 -right-5">
                    <i
                      onClick={() => setimage(image.filter((i) => i != file))}
                      className="ri-close-line h-full w-full p-[1px] text-white rounded-full bg-red-500 text-lg cursor-pointer"
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex items-center mt-7 gap-5">
            <h1>Category: </h1>
            <select
              ref={categoryRef}
              title=""
              id=""
              value={category}
              onChange={handleInputChange(setcategory, "category")}
              onBlur={() => handleBlur("category")}
              className="border border-black"
            >
              <option value="select">Select</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Educational/Academic</option>
              <option>Spirituality/Religion</option>
              <option>Graphic Novels/Comics</option>
              <option>Poetry</option>
              <option>Business/Finance</option>
              <option>Humor/Satire</option>
            </select>
          </div>
          {errors.category && <p className="text-red-500">{errors.category}</p>}

          <input
            type="submit"
            value={loading ? "Adding..." : "Add Product"}
            disabled={loading}
            onClick={handleApi}
            className="ml-[40%] test-center mt-7 rounded-full px-7 py-2 bg-[#fcd12d] cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

export default AddProduct;
