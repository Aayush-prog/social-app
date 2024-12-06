import React, { useContext, useEffect, useState } from "react";
import Navs from "./Navs.jsx";
import SideBar from "./SideBar.jsx";
import RightBar from "./RightBar.jsx";
import axios from "axios";
import { AuthContext } from "../../AuthContext.jsx";
import PostCard from "./components/PostCard.jsx";

export default function Home() {
  const [groupData, setGroupData] = useState([]);
  const { authToken } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/std/dashboard", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data.data.groups);
      // Fetch each group by their ID and append to groupData array
      const groupPromises = response.data.data.groups.map(async (item) => {
        const groupResponse = await axios.get(
          `http://localhost:8000/std/group/${item}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(groupResponse.data.group);
        return groupResponse.data.group;
      });

      // Wait for all the group data to be fetched
      const allGroups = await Promise.all(groupPromises);
      console.log(allGroups);
      // Set all fetched group data to state
      setGroupData(allGroups);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navs />
      <div className="grid grid-cols-5 gap-5 mt-[70px]">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div className="col-span-5 lg:col-span-3 p-5">
          {groupData.map((group, index) => (
            <div key={index}>
              <h3>{group.name}</h3>{" "}
              {/* Adjust according to your group object structure */}
              {group.posts.map((post, postIndex) => (
                <PostCard key={postIndex} post={post} />
              ))}
            </div>
          ))}
        </div>
        <div className="hidden lg:block">
          <RightBar />
        </div>
      </div>
    </div>
  );
}
