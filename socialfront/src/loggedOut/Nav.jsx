import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-600 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="http://localhost:8000/images/logo.png"
            className="h-8"
            alt="UNISPHERE Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            UNISPHERE
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={handleClick}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Sign In
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <FaTimes className="text-2xl text-black" />
            ) : (
              <MdOutlineMenu className="text-6xl text-black" />
            )}
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className="block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400"
              >
                Pricing
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
