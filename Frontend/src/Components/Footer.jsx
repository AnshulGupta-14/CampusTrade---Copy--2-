import React from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Footer = () => {
  return (
    <footer className="footer p-5 px-12 mt-20 bg-[#333333] text-white">
      <div className="footer-content flex flex-col gap-5">
        <div className="footer-section">
          <h3 className="text-xl font-semibold">About CampusTrade</h3>
          <p>
            CampusTrade is a platform for students and book lovers to buy and
            sell used books easily on campus.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="flex items-center gap-5 text-blue-500">
            <li className="hover:underline">
              <NavLink href="">Home</NavLink>
            </li>
            <li className="hover:underline">
              <NavLink href="">Browse Books</NavLink>
            </li>
            <li className="hover:underline">
              <NavLink href="">Categories</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p>
            Email:{" "}
            <span className="hover:text-blue-500 cursor-pointer">
              support@campustrade.com
            </span>
          </p>
          <p>
            Phone:{" "}
            <span className="hover:text-blue-500 cursor-pointer">
              +1 (555) 123-4567
            </span>
          </p>
          <div className="flex gap-5 text-xl items-center">
            <a target="_blank" href="">
              <i class="ri-facebook-circle-fill"></i>
            </a>
            <a target="_blank" href="">
              <i class="ri-instagram-fill"></i>
            </a>
            <a target="_blank" href="">
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>
        </div>
      </div>
      <hr className="border-white border-[1.5px] my-5" />
      <div className="footer-bottom text-center font-semibold">
        &copy; 2024 CampusTrade. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
