import axios from "../Utils/Axios";
import React, { useEffect, useRef, useState } from "react";
import Cards from "./Partials/Cards";
import LocomotiveScroll from "locomotive-scroll";
import { errorHandler } from "../Utils/HandleError";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Footer from "./Footer";

const Home = () => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const location = useLocation();
  const locomotiveScroll = new LocomotiveScroll();
  const [products, setproducts] = useState([]);
  const boxRef = useRef(null);
  const { search } = useLocation();
  const categories = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Educational/Academic",
    "Spirituality/Religion",
    "Graphic Novels/Comics",
    "Poetry",
    "Business/Finance",
    "Humor/Satire",
  ];
  const category = decodeURIComponent(search.split("=")[1]);
  const [underline, setUnderline] = useState(0);

  const handleUnderline = (index) => {
    setUnderline(index);
  };

  let filter = products;
  console.log(category);
  if (category !== "undefined") {
    filter = products && products.filter((item) => item.category === category);
  }

  useEffect(() => {
    const url = "/products/get-products";
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        // console.log(res);

        if (res.data) {
          setproducts(res.data.data);
        }
      })
      .catch((err) => {
        errorHandler(err);
      });
  }, [location]);

  console.log(products);

  return (
    <>
      <div ref={boxRef} className="min-h-screen">
        {filter && isDesktop && (
          <div className="pt-[7%]">
            <div className="flex items-center justify-around bg-[#FCD12D] p-2">
              {categories.map((item, index) => {
                if (item === "All") {
                  return (
                    <Link
                      to="/home"
                      key={item}
                      className={`hover:text-blue-600 hover:font-semibold ${
                        underline >= 0 &&
                        underline === index &&
                        "underline underline-offset-8 text-blue-600 font-semibold"
                      }`}
                      onClick={() => handleUnderline(index)}
                    >
                      {item}
                    </Link>
                  );
                }
                return (
                  <Link
                    to={`/home/?category=${item}`}
                    key={item}
                    className={`hover:text-blue-600 hover:font-semibold ${
                      underline &&
                      underline === index &&
                      "underline underline-offset-8 text-blue-600 font-semibold"
                    }`}
                    onClick={() => handleUnderline(index)}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
            <div className="w-full h-full px-[1.4%] -mt-5">
              <Cards data={filter}></Cards>
            </div>
          </div>
        )}
        {filter && !isDesktop && (
          <div className="w-full h-full px-[1.8%] pt-[20%]">
            <Cards data={filter}></Cards>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
