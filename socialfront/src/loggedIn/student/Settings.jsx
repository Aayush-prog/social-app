import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import Navs from "./Navs";
import SideBar from "./SideBar";
import RightBar from "./RightBar";
import axios from "axios";

export default function Settings() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    image: null,
  });
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/std/dashboard",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const fetchedData = response.data.data;
        setProfileData(fetchedData);
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: fetchedData.name,
          email: fetchedData.email,
          password: "",
          image: null,
        }));
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfile();
  }, []);

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
    if (formData.password != formData.confirmpass) {
      alert("password and conrifm password not same");
    }
    // Create FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.image != null) {
      formDataToSend.append("image", formData.image);
    }
    try {
      // Make API request (using fetch in this case)
      const response = await axios.patch(
        `http://localhost:8000/std/settings/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const result = await response.data;
      navigate("/std/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navs />
      <div className="grid grid-cols-5 gap-5 mt-[70px]">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div className="col-span-5 lg:col-span-3 p-5">
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
        </div>
        <div className="hidden ">
          <RightBar />
        </div>
      </div>
    </div>
  );
}
