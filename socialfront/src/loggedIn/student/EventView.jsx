import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useParams } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoMdPerson } from "react-icons/io";
import Navs from "./Navs";
import SideBar from "./SideBar";

export default function EventView() {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [eventData, setEventData] = useState([]);
  const [organizer, setOrganizer] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/std/event/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setEventData(response.data.data);
    };
    fetchData();

    const fetchOrganizer = async () => {
      var api;
      switch (eventData.organizerType) {
        case "std":
          api = `http://localhost:8000/std/${eventData.organizer}`;
          break;
        case "clg":
          api = `http://localhost:8000/clg/${eventData.organizer}`;
          break;
        case "restro":
          api = `http://localhost:8000/restro/${eventData.organizer}`;
          break;
      }
      const response = await axios.get(api);
      setOrganizer(response.data.data.name);
    };
    fetchOrganizer();
  }, []);
  return (
    <div>
      <Navs />
      <div className="grid grid-cols-5 mt-[70px]">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div className="col-span-5 lg:col-span-4 p-5">
          {eventData && (
            <>
              <img
                src={`http://localhost:8000/images/${
                  eventData ? eventData.image : null
                }`}
                className="h-[300px] w-full object-cover mb-3"
              />
              <div className="mb-3">
                <h1 className="text-xl font-bold">{eventData.title}</h1>
                <h2 className="text-lg font-semibold">{eventData.status}</h2>
              </div>
              <div className="grid lg:grid-cols-5 gap-5 ">
                <div className="col-span-4 order-2 lg:order-1">
                  <div>
                    <h2 className="text-lg font-semibold">Event Description</h2>
                    <p>{eventData.description}</p>
                  </div>
                </div>
                <div className="text-xl order-1 lg:order-2">
                  <div className="flex gap-2 place-items-center">
                    <MdDateRange />
                    <span>{eventData.date}</span>
                  </div>
                  <div className="flex gap-2 place-items-center">
                    <GrLocation />
                    <span>{eventData.location}</span>
                  </div>
                  <div className="flex gap-2 place-items-center">
                    <IoMdPerson />
                    <span>{organizer}</span>
                  </div>
                  <div className="flex gap-2 place-items-center">
                    <BiCategory />
                    <span>{eventData.category}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
