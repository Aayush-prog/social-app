import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import Navs from "./Navs.jsx";
import SideBar from "./SideBar.jsx";
import ChatsPage from "./Chats.jsx";
export default function Chat() {
  const { authToken } = useContext(AuthContext);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/clg/dashboard",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setData(response.data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
        <div className=" col-span-5 lg:col-span-4">
          {data && (
            <ChatsPage
              username={data && data.email}
              secret={data && data.password}
            />
          )}
        </div>
      </div>
    </div>
  );
}
