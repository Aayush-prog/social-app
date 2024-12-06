import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import Navs from "./Navs.jsx";
import SideBar from "./SideBar.jsx";
import RightBar from "./RightBar.jsx";
import RestroCard from "./components/RestroCard.jsx";

export default function Food() {
  const { authToken } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/std/restro", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setData(response.data.data);
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
        <div className="col-span-5 lg:col-span-3 p-5">
          <div className="lg:grid grid-cols-2 gap-8">
            {data.map((item) => (
              <RestroCard key={item} data={item} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <RightBar />
        </div>
      </div>
    </div>
  );
}
