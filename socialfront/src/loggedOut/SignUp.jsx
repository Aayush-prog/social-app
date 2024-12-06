import React, { useState } from "react";
import Nav from "./Nav.jsx";
import Footer from "../Footer.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    image: null,
  });
  const navigate = useNavigate();
  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file input
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Get the selected image file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmpass", formData.confirmpass);
    formDataToSend.append("image", formData.image); // Append the image file
    try {
      // Make API request (using fetch in this case)
      const response = await axios.post(
        "http://localhost:8000/std/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await response.data;
      console.log("Signup successful:", result);
      if (result.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Nav />
      <div className="grid place-items-center ">
        <section className="bg-white ">
          <div className="py-8 pb-0 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
              Join the Sphere: Your Journey Starts Here!
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 ">
              At UniSphere, we focus on creating a vibrant student community
              where academics, social experiences, and local culture come
              together to inspire growth, foster innovation, and build lifelong
              connections.
            </p>
          </div>
        </section>
        <form onSubmit={handleSubmit} className="w-2/3 my-10 mx-auto">
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload Profile Picture
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
              id="file_input"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label
              for="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label
              for="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label
              for="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="confirmpass"
              id="confirmpass"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.confirmpass}
              onChange={handleChange}
              required
            />
            <label
              for="confirmpass"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>

        <span className="px-4 text-center mb-10">
          <p className="text-gray-500 dark:text-gray-400">
            Wanna set up an business account?
            <br></br>
            <Link
              to="/businesssignup"
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Sign Up Here
              <svg
                className="w-4 h-4 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </p>
        </span>
      </div>
      <Footer />
    </div>
  );
}
