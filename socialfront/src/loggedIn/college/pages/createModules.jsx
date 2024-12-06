import React, { useState, useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateModules = ({ createModule, setCreateModule }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    credits: "",
    level: "",
    department: "",
    image: null,
    syllabus: [""], // Initially, one empty syllabus item
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

  // Handle individual syllabus item change
  const handleSyllabusChange = (index, value) => {
    const newSyllabus = [...formData.syllabus];
    newSyllabus[index] = value;
    setFormData({ ...formData, syllabus: newSyllabus });
  };

  // Add a new syllabus item
  const addSyllabusItem = () => {
    setFormData({ ...formData, syllabus: [...formData.syllabus, ""] });
  };

  // Remove a syllabus item
  const removeSyllabusItem = (index) => {
    const newSyllabus = formData.syllabus.filter((_, i) => i !== index);
    setFormData({ ...formData, syllabus: newSyllabus });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a form data object for API submission
    const data = new FormData();
    data.append("code", formData.code);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("credits", formData.credits);
    data.append("level", formData.level);
    data.append("department", formData.department);
    data.append("image", formData.image);
    formData.syllabus.forEach((item, index) => {
      data.append(`syllabus[${index}]`, item);
    });
    console.log("calling");
    console.log(authToken);
    // API call (replace with actual API endpoint)
    const response = await axios.post(
      "http://localhost:8000/clg/createModule",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data.data);
    setCreateModule(false);
    navigate("/clg/home");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg z-1">
      <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="md:grid grid-cols-2 gap-5">
          {/* COurse Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Course Name
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

        <div className="md:grid grid-cols-2 gap-5">
          {/* Credits */}
          <div>
            <label className="text-sm font-medium text-gray-700">Credits</label>
            <input
              type="number"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          {/* Level */}
          <div>
            <label className="text-sm font-medium text-gray-700">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div className="md:grid grid-cols-2 gap-5">
          {/* Department */}
          <div>
            <label className=" text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1  w-full border-gray-300 rounded-md shadow-sm"
              required
            />
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
        </div>
        {/* Syllabus */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Syllabus
          </label>
          {formData.syllabus.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleSyllabusChange(index, e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder={`Syllabus item ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeSyllabusItem(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSyllabusItem}
            className="mt-2 inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
          >
            Add Syllabus Item
          </button>
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

export default CreateModules;
