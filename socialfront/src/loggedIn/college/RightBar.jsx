import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import RBCard from "./components/RBCard.jsx";
import { AuthContext } from "../../AuthContext.jsx";
import { LuCalendar } from "react-icons/lu";
import { MdOutlineGroups } from "react-icons/md";

export default function RightBar() {
  const { authToken } = useContext(AuthContext);
  const [eventData, setEventData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [restroData, setRestroData] = useState([]);
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
        setEventData(response.data.events);

        setGroupData(response.data.groups);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div className="h-90 grid grid-rows-2 gap-5 fixed">
      <div className="grid gap-3">
        <div className="flex gap-3 place-items-center">
          <LuCalendar />
          <h1 className="font-semibold">Events</h1>
        </div>

        <div className="grid gap-5">
          {eventData.length > 0 ? (
            eventData
              .slice(0, 2)
              .map((data, index) => <RBCard key={index} data={data} />)
          ) : (
            <p>No event data available</p>
          )}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="flex gap-3 place-items-center">
          <MdOutlineGroups />
          <h1 className="font-semibold">Groups</h1>
        </div>

        <div className="grid gap-5">
          {groupData.length > 0 ? (
            groupData
              .slice(0, 2)
              .map((data, index) => <RBCard key={index} data={data} />)
          ) : (
            <p>No group data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
