import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import { Avatar } from "flowbite-react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";

export default function PostCard(props) {
  const { postId } = props;
  const [postData, setPostData] = useState();
  const [userData, setUserData] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext); // Assuming user context for current logged-in user

  // Fetch comments (if any) when the component loads
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/std/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setPostData(response.data.data);
    };
    fetchData();

    var api;
    switch (postData.authorType) {
      case "std":
        api = `http://localhost:8000/std/${postData.author}`;
        break;
      case "clg":
        api = `http://localhost:8000/clg/${postData.author}`;
        break;
    }

    const fetchUser = async () => {
      const response = await axios.get(api);
      setUserData(response.data.data);
    };
    fetchUser();
    // axios.get(`http://localhost:8000/posts/${data.id}/comments`).then((res) => {
    //   setComments(res.data);
    // });
  }, []);

  const handleCommentSubmit = () => {
    // Post the new comment to the API
    axios
      .post(`http://localhost:8000/posts/${postId}/comments`, {
        user: user.name,
        text: newComment,
      })
      .then((res) => {
        setComments([...comments, res.data]);
        setNewComment(""); // Clear the input
      });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-w-2xl mx-auto my-4">
      {/* Post Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Avatar
            alt="User avatar"
            img={`http://localhost:8000/images/${
              userData ? userData.img : null
            }`}
            square
          />
          <div>
            <span className="block font-semibold text-sm">{userData.name}</span>
            <span className="block text-gray-500 text-xs">{`${postData.createdAt} `}</span>
          </div>
        </div>
        <HiDotsHorizontal className="text-gray-600 cursor-pointer" />
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-700">{postData.content}</p>

      {/* Comments Section */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <FaRegCommentDots className="text-gray-600" />
          <span className="text-sm text-gray-600">Comment</span>
        </div>

        {/* Comments Display */}
        <div className="mt-3">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold text-sm">{comment.user}</span>
                <p className="text-gray-700 text-sm">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No comments yet. Be the first!
            </p>
          )}
        </div>

        {/* New Comment Input */}
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={handleCommentSubmit}
            disabled={!newComment.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
