import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useParams } from "react-router-dom";
import { GrLocation, GrUserAdmin } from "react-icons/gr";
import { MdDateRange, MdGroups2 } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoIosSettings, IoMdPerson } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import Navs from "./Navs";
import SideBar from "./SideBar";
import AddPost from "./components/AddPost";
import PostCard from "./components/PostCard";
const forceUpdateReducer = (state) => state + 1;
export default function GroupView() {
  const [, forceUpdate] = useReducer(forceUpdateReducer, 0);
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  console.log(id);
  const [groupData, setGroupData] = useState();
  const [status, setStatus] = useState();
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchign dada");
      const response = await axios.get(
        `http://localhost:8000/std/group/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
      setGroupData(response.data.group);
      console.log(groupData);
      setStatus(response.data.type);

      console.log(groupData);
    };
    fetchData();
  }, []);

  const handleJoin = async () => {
    const response = await axios.get(
      `http://localhost:8000/std/joinGroup/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    forceUpdate();
  };

  const handleLeave = async () => {
    const response = await axios.get(
      `http://localhost:8000/std/leaveGroup/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    forceUpdate();
  };

  const renderGroupStatus = () => {
    switch (status) {
      case "mod":
        return (
          <button onClick={handleJoin}>
            <IoIosSettings />
          </button>
        );
      case "member":
        return (
          <button
            className="rounded bg-red-500 px-3 text-xl font-bold "
            onClick={handleLeave}
          >
            Leave
          </button>
        );
      default:
        return (
          <button
            className="rounded bg-green-500 px-3 text-xl font-bold"
            onClick={handleJoin}
          >
            Join
          </button>
        );
    }
  };
  return (
    <div>
      <Navs />
      <div className="grid grid-cols-5 mt-[70px]">
        <div className="hidden lg:block col-span-1">
          <SideBar />
        </div>
        <div className=" col-span-5 lg:col-span-4 p-5 ">
          {groupData && (
            <div>
              <img
                src={`http://localhost:8000/images/${groupData.image}`}
                alt={groupData.name}
                className="h-[300px] w-full object-cover mb-5"
              />
              <div className="flex justify-between">
                <div className="mb-5">
                  <h1 className="font-bold text-xl">{groupData.name}</h1>
                  <h2 className="font-semibold text-lg">{groupData.type}</h2>
                </div>
                {renderGroupStatus()}
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
    </div>
  );
}
