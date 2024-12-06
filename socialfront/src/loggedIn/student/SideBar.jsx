"use client";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { FiHome } from "react-icons/fi";
import {
  MdOutlineLibraryBooks,
  MdOutlineGroups,
  MdOutlineLogout,
  MdOutlineSettings,
} from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { Sidebar, Avatar } from "flowbite-react";
import { LuCalendar } from "react-icons/lu";

import { BsChatSquareText } from "react-icons/bs";

export default function SideBar() {
  const [profileData, setProfileData] = useState();
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get("http://localhost:8000/std/dashboard", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProfileData(response.data.data);
    };
    fetchProfile();
    console.log(profileData);
  }, []);

  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="h-[90vh] fixed"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={NavLink} to="/std/home" icon={FiHome}>
            Home
          </Sidebar.Item>

          <Sidebar.Item as={NavLink} to="/std/event" icon={LuCalendar}>
            Events
          </Sidebar.Item>

          <Sidebar.Item
            as={NavLink}
            to="/std/module"
            icon={MdOutlineLibraryBooks}
          >
            Modules
          </Sidebar.Item>

          <Sidebar.Item as={NavLink} to="/std/grp" icon={MdOutlineGroups}>
            Groups
          </Sidebar.Item>

          <Sidebar.Item as={NavLink} to="/std/food" icon={IoFastFoodOutline}>
            Food & Drinks
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Sidebar.Item as={NavLink} to="/std/chat" icon={BsChatSquareText}>
            Chats
          </Sidebar.Item>

          <Sidebar.Item
            as={NavLink}
            to={`/std/settings/${profileData ? profileData._id : null}`}
            icon={MdOutlineSettings}
          >
            Settings
          </Sidebar.Item>

          {/* Log Out as button */}
          <Sidebar.Item
            onClick={handleSignOut}
            icon={MdOutlineLogout}
            className="cursor-pointer"
          >
            Log Out
          </Sidebar.Item>
          <Sidebar.Item>
            <div className="flex gap-2 place-items-center ">
              <Avatar
                alt="User settings"
                img={`http://localhost:8000/images/${
                  profileData ? profileData.image : null
                }`}
                rounded
              />
              <span className="block text-sm">
                {profileData ? profileData.name : null}
              </span>
            </div>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
