import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar } from "flowbite-react";
const EditGroups = ({ groupData, editGroup, setEditGroup }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: groupData.name,
    description: groupData.description,
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
    if (formData.image != null) {
      data.append("image", formData.image);
    }

    // API call (replace with actual API endpoint)
    const response = await axios.patch(
      `http://localhost:8000/clg/updateGroup/${groupData._id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log(response.data.data);
    setEditGroup(false);
    navigate("/clg/home");
  };

  const handleDelete = async () => {
    console.log("handle del");
    const response = await axios.delete(
      `http://localhost:8000/clg/deleteGroup/${groupData._id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    setEditGroup(false);
    navigate("/clg/home");
  };

  const [members, setMembers] = useState([]);
  const [mods, setMods] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      const members = await Promise.all(
        groupData.members.map(async (id) => {
          try {
            const response = await axios.get(
              `http://localhost:8000/std/getStudent/${id}`
            );
            console.log(response);
            return response.data.data;
          } catch (error) {
            console.error("Error fetching member", error);
            return id; // Return the ID if there's an error
          }
        })
      );
      setMembers(members);
    };

    fetchMembers();
  }, [groupData.members]);

  useEffect(() => {
    const fetchMods = async () => {
      const mods = await Promise.all(
        groupData.mods.map(async (id) => {
          try {
            const response = await axios.get(
              `http://localhost:8000/std/getStudent/${id}`
            );
            console.log(response);
            return response.data.data;
          } catch (error) {
            console.error("Error fetching member", error);
            return id; // Return the ID if there's an error
          }
        })
      );
      setMods(mods);
    };

    fetchMods();
  }, [groupData.mods]);

  const handleAddMod = async (memberId) => {
    // Make API call to add the member as a moderator
    const response = await axios.get(
      `http://localhost:8000/clg/addMod/${groupData._id}/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.ok) {
      alert(`Member with ID ${memberId} added as moderator!`);
      console.log(response);
    } else {
      alert("Failed to add moderator");
    }
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
        <div>
          {members.map((item) => {
            return (
              <div>
                <h1 className="font-bold text-xl">Members</h1>

                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <Avatar
                      alt="student picture"
                      img={`http://localhost:8000/images/${item.image}`}
                      rounded
                    />
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                      onClick={() => handleAddMod(item._id)}
                    >
                      Add Mod
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
                      Kick
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          {mods.map((item) => {
            return (
              <div>
                <h1 className="font-bold text-xl">Moderators</h1>

                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <Avatar
                      alt="student picture"
                      img={`http://localhost:8000/images/${item.image}`}
                      rounded
                    />
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
          >
            Submit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGroups;
