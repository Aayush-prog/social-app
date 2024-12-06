import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import { Avatar } from "flowbite-react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";

export default function PostCard({ post }) {
  console.log(post);
  const [postData, setPostData] = useState(null);
  const [userData, setUserData] = useState();
  const [comments, setComments] = useState([]);
  const [clickComment, setClickComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { authToken } = useContext(AuthContext);

  // Fetch comments (if any) when the component loads
  useEffect(() => {
    const fetchData = async () => {
      const postResponse = await axios.get(
        `http://localhost:8000/std/post/${post}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Post data from API:", postResponse.data);
      setPostData(postResponse.data);

      if (postResponse.data.comments) {
        const commentPromises = postResponse.data.comments.map(async (item) => {
          const commentResponse = await axios.get(
            `http://localhost:8000/std/comment/${item}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          return commentResponse.data.data;
        });

        const fetchedComments = await Promise.all(commentPromises);
        console.log(fetchedComments);
        setComments(fetchedComments);
      }
    };

    fetchData();
  }, [authToken, post]); // Add dependencies to avoid unnecessary calls

  // Trigger logic when postData is updated
  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!postData) return; // Wait for postData to be set

      let api;
      switch (postData.authorType) {
        case "std":
          api = `http://localhost:8000/std/getStudent/${postData.author}`;
          break;
        case "clg":
          api = `http://localhost:8000/clg/getCollege/${postData.author}`;
          break;
        default:
          console.error("Unknown author type");
          return;
      }

      console.log("API for author:", api);
      const res = await axios.get(api);
      console.log("User data:", res.data.data);
      setUserData(res.data.data); // Set the user data based on author
    };

    fetchAuthorData();
  }, [postData]); // Runs whenever postData is updated

  const handleCommentSubmit = () => {
    // Post the new comment to the API
    axios
      .post(
        `http://localhost:8000/std/${postData.group}/${post}/createComment`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setComments([...comments, res.data]);
        setNewComment(""); // Clear the input
      });
  };
  const handleCommentClick = () => {
    setClickComment(!clickComment);
  };
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white  mx-auto my-4">
      {/* Post Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Avatar
            alt="User avatar"
            img={`http://localhost:8000/images/${
              userData ? userData.image : null
            }`}
            square
          />
          <div>
            <span className="block font-semibold text-sm">
              {userData && userData.name}
            </span>
            <span className="block text-gray-500 text-xs">{`${
              postData && postData.createdAt.split("T")[0]
            } `}</span>
          </div>
        </div>
        <HiDotsHorizontal className="text-gray-600 cursor-pointer" />
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-700">{postData && postData.content}</p>

      {/* Comments Section */}
      <div className="mt-4">
        <button
          onClick={handleCommentClick}
          className="flex items-center gap-2"
        >
          <FaRegCommentDots className="text-gray-600" />
          <span className="text-sm text-gray-600">Comment</span>
        </button>

        {clickComment && (
          <>
            <div className="mt-3">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-700 text-sm">
                      {comment && comment.content}
                    </p>
                    <hr className="border-grey-500"></hr>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No comments yet. Be the first!
                </p>
              )}
            </div>

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
          </>
        )}
      </div>
    </div>
  );
}
