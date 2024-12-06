import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav.jsx";
import Footer from "../Footer.jsx";
import { useNavigate } from "react-router-dom";
export default function BusinessSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    image: null,
  });

  const [selectedOption, setSelectedOption] = useState("");

  // Handler for select change
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

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
    formDataToSend.append("address", formData.address);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("confirmpass", formData.confirmpass);
    formDataToSend.append("image", formData.image); // Append the image file
    let api;
    if (selectedOption === "clg") {
      api = "http://localhost:8000/clg/register";
    } else if (selectedOption === "restro") {
      api = "http://localhost:8000/restro/register";
    } else {
      alert("please select business type");
    }
    try {
      // Make API request (using fetch in this case)
      const response = await axios.post(api, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.data;
      navigate("/login");
      console.log("Signup successful:", result);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  return (
    <div>
      <Nav />
      <div className="grid place-items-center ">
        <section className="bg-white ">
          <div className="py-8 pb-0 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
              Sign Up
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 ">
              At UniSphere, we focus on creating a vibrant student community
              where academics, social experiences, and local culture come
              together to inspire growth, foster innovation, and build lifelong
              connections.
            </p>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="my-10 w-2/3">
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              for="file_input"
            >
              Upload Profile Picture
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
              id="file_input"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                for="address"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Sydney"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              for="business"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Select an option
            </label>
            <select
              id="business"
              onChange={handleSelectChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Choose business type</option>
              <option value="clg">College/University</option>
              <option value="restro">Restaurant</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="confirmpass"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmpass"
              name="confirmpass"
              onChange={handleChange}
              value={formData.confirmpass}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                required
              />
            </div>
            <label
              for="remember"
              className="ms-2 text-sm font-medium text-gray-900 "
            >
              I agree with the{" "}
              <a href="#" className="text-blue-600 hover:underline ">
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
