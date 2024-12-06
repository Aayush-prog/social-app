import React, { useContext, useEffect, useState } from "react";
import Navs from "./Navs";
import SideBar from "./SideBar";
import RightBar from "./RightBar";
import Fab from "./Fab";
import CreateEvents from "./pages/createEvents";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import EventCard from "./components/EventCard";

export default function Events() {
  const { authToken } = useContext(AuthContext);
  const [createEvent, setCreateEvent] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [eventData, setEventData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/restro/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("eventttttt");
      console.log(response.data.events);
      setEventData(response.data.events);
      console.log(eventData);
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen">
      <Navs />
      <div className="grid grid-cols-5 gap-5 mt-[70px]">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div className={`col-span-5 lg:col-span-3 p-5`}>
          {createEvent && (
            <CreateEvents
              createEvent={createEvent}
              setCreateEvent={setCreateEvent}
            />
          )}
          <div className="grid lg:grid-cols-2 gap-8">
            {eventData &&
              !createEvent &&
              eventData.map((item) => {
                return <EventCard key={item.id} data={item} />;
              })}
          </div>
        </div>
        <div className="hidden lg:block px-5">
          <RightBar />
        </div>
      </div>
      <Fab
        createEvent={createEvent}
        setCreateEvent={setCreateEvent}
        isBlurred={isBlurred}
        setIsBlurred={setIsBlurred}
      />
    </div>
  );
}
