import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useParams } from "react-router-dom";
import { GrLocation, GrUserAdmin } from "react-icons/gr";
import { MdDateRange, MdGroups2 } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoMdPerson } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import Navs from "./Navs";
import SideBar from "./SideBar";
import EditGroups from "./pages/editGroups";
import GroupFAB from "./components/GroupFAB";
import PostCard from "./components/PostCard";
import AddPost from "./components/AddPost";

export default function GroupView() {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  console.log(id);
  const [groupData, setGroupData] = useState();
  const [editGroup, setEditGroup] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchign dada");
      const response = await axios.get(
        `http://localhost:8000/clg/group/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
      setGroupData(response.data);
      console.log(groupData);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navs />
      <div className="grid grid-cols-5 mt-[70px]">
        <div className="hidden lg:block col-span-1">
          <SideBar />
        </div>

        <div className=" col-span-5 lg:col-span-4 p-5 ">
          {editGroup && (
            <EditGroups
              groupData={groupData}
              setEditGroup={setEditGroup}
              setGroupData={setGroupData}
            />
          )}
          {groupData && !editGroup && (
            <div>
              <img
                src={`http://localhost:8000/images/${groupData.image}`}
                alt={groupData.name}
                className="h-[300px] w-full object-cover mb-5"
              />
              <div>
                <div className="mb-5">
                  <h1 className="font-bold text-xl">{groupData.name}</h1>
                  <h2 className="font-semibold text-lg">{groupData.type}</h2>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-5">
                <div className="col-span-4">
                  <AddPost groupId={id} />
                  {groupData.posts &&
                    groupData.posts.map((item) => <PostCard post={item} />)}
                </div>
                <div>
                  {/* <div className="flex gap-2">
                    <MdGroups2 />
                    <span>{groupData.members}</span>
                  </div>
                  <div className="flex gap-2">
                    <GrUserAdmin />
                    <span>{groupData.moderator}</span>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <GroupFAB editGroup={editGroup} setEditGroup={setEditGroup} />
    </div>
  );
}
