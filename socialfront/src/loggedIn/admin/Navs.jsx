"use client";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import axios from "axios";
import { AuthContext } from "../../AuthContext.jsx";
import { FiHome } from "react-icons/fi";
import { MdOutlineLibraryBooks, MdOutlineGroups } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { GrUserAdmin, GrUserExpert } from "react-icons/gr";

export default function Navs() {
  const [profileData, setProfileData] = useState();
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChatClick = async () => {
    navigate("/admin/chat");
  };
  const handleSignOut = async () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admin/dashboard",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setProfileData(response.data.data);
        console.log(profileData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfile();
  }, []);
  return (
    <Navbar
      fluid
      rounded
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg"
    >
      <Navbar.Brand>
        <img
          src="http://localhost:8000/images/logo.png"
          className="h-8"
          alt="UNISPHERE Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          UNISPHERE
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown arrowIcon={false} inline label={<GrUserAdmin />}>
          <Dropdown.Header>
            <span className="block text-sm">
              {profileData ? profileData.name : null}
            </span>
            <span className="block truncate text-sm font-medium">
              {profileData ? profileData.email : null}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={handleChatClick}>Chats</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink to="/admin/home" className="flex gap-2 place-items-center">
          <FiHome />
          <span>Home</span>
        </NavLink>
        <NavLink to="/admin/event" className="flex gap-2 place-items-center">
          <LuCalendar />
          <span>Events</span>
        </NavLink>
        <NavLink to="/admin/module" className="flex gap-2 place-items-center">
          <MdOutlineLibraryBooks />
          <span>Modules</span>
        </NavLink>
        <NavLink to="/admin/grp" className="flex gap-2 place-items-center">
          <MdOutlineGroups />
          <span>Groups</span>
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}
