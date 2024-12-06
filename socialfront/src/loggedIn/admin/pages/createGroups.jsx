import React, { useState, useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateGroups = ({ createGroup, setCreateGroup }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  // Handle input change for form data
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a form data object for API submission
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("image", formData.image);

    // API call (replace with actual API endpoint)
    const response = await axios.post(
      "http://localhost:8000/admin/createGroup",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data.data);
    setCreateGroup(false);
    navigate("/admin/home");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg z-1">
      <h1 className="text-2xl font-bold mb-4">Add New Group</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Group Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        {/* Description */}
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

        {/* Image */}
        <div>
          <label className=" text-sm font-medium text-gray-700">
            Course Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1  w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroups;
