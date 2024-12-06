import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthContext";
import { FiSend } from "react-icons/fi"; // Using react-icons for the Send icon

export default function AddPost({ groupId }) {
  const [profileData, setProfileData] = useState();
  const { authToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    content: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the content field
    });
  };
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
        setProfileData(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfile();
    console.log(profileData);
  }, []);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/std/createPost/${groupId}`,
        { content: formData.content },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSuccess("Post added successfully!");
      setError("");
      setFormData({ content: "" }); // Reset form after successful submission
    } catch (err) {
      setError("Failed to add post. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="mx-auto p-4 ">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:8000/images/${
                profileData ? profileData.image : null
              }`}
              alt="User Avatar"
              className="rounded-full w-10 h-10"
            />
          </div>

          {/* Text Field */}
          <div className="flex-grow mx-4">
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="w-full px-2 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Send Icon */}
          <div className="flex-shrink-0">
            <button type="submit" className="text-blue-600 hover:text-blue-800">
              <FiSend size={24} />
            </button>
          </div>
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {/* Separator */}
        <hr className="mt-4 border-gray-300" />
      </form>
    </div>
  );
}
