import React, { useState, useEffect, useContext } from "react";
import Navs from "./Navs";
import SideBar from "./SideBar";
import RightBar from "./RightBar";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    email: "",
    password: null,
    confirmpass: null,
    image: null,
    menu: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/restro/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const fetchedData = response.data.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: fetchedData.name,
        email: fetchedData.email,
        address: fetchedData.address,
        description: fetchedData.description,
        menu: [...fetchedData.menu],
      }));
      console.log(eventData);
    };
    fetchData();
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
  const handleMenuChange = (index, value) => {
    const newMenu = [...formData.menu];
    newMenu[index] = value;
    setFormData({ ...formData, menu: newMenu });
  };

  // Add a new menu item
  const addMenuItem = () => {
    setFormData({ ...formData, menu: [...formData.menu, ""] });
  };

  // Remove a menu item
  const removeMenuItem = (index) => {
    const newSyllabus = formData.menu.filter((_, i) => i !== index);
    setFormData({ ...formData, menu: newSyllabus });
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
    formDataToSend.append("description", formData.description);
    if (formDataToSend.password != null) {
      formDataToSend.append("password", formData.password);
    }
    if (formData.image != null) {
      formDataToSend.append("image", formData.image);
    }

    if (formData.menu != null) {
      formDataToSend.append("menu", JSON.stringify(formData.menu));
    }
    try {
      // Make API request (using fetch in this case)
      const response = await axios.patch(
        `http://localhost:8000/restro/settings/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const result = await response.data;
      navigate("/clg/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen">
      <Navs />
      <div className="grid grid-cols-5 gap-5 mt-[70px]">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div className={`col-span-5 lg:col-span-3 `}>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                rows="3"
                required
              ></textarea>
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
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">
                Syllabus
              </label>
              {formData.syllabus.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleMenuChange(index, e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder={`Menu item ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeMenuItem(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addMenuItem}
                className="mt-2 inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Add Syllabus Item
              </button>
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
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Submit
            </button>
          </form>
        </div>
        <div className="hidden px-5">
          <RightBar />
        </div>
      </div>
    </div>
  );
}
