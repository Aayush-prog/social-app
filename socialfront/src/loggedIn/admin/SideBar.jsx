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
import { GrUserAdmin } from "react-icons/gr";

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
      const response = await axios.get(
        "http://localhost:8000/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProfileData(response.data.data);
      console.log(response.data);
    };
    fetchProfile();
  }, []);

  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="h-[90vh] fixed "
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Using Sidebar.Item with icon prop */}
          <Sidebar.Item as={NavLink} to="/admin/home" icon={FiHome}>
            Home
          </Sidebar.Item>

          <Sidebar.Item as={NavLink} to="/admin/event" icon={LuCalendar}>
            Events
          </Sidebar.Item>

          <Sidebar.Item
            as={NavLink}
            to="/admin/module"
            icon={MdOutlineLibraryBooks}
          >
            Modules
          </Sidebar.Item>

          <Sidebar.Item as={NavLink} to="/admin/grp" icon={MdOutlineGroups}>
            Groups
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Sidebar.Item as={NavLink} to="/admin/chat" icon={BsChatSquareText}>
            Chats
          </Sidebar.Item>

          <Sidebar.Item
            as={NavLink}
            to="/std/settings"
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

          {/* Profile Avatar and Name */}
          <Sidebar.Item>
            <div className="flex gap-2 place-items-center">
              <GrUserAdmin />
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
