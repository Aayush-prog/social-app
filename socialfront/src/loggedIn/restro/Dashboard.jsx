import React, { useState, useEffect, useContext } from "react";
import Navs from "./Navs";
import SideBar from "./SideBar";
import RightBar from "./RightBar";
import Fab from "./Fab";
import CreateEvents from "./pages/createEvents";
import CountCard from "./components/CountCard";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import EventCard from "./components/EventCard";

export default function Dashboard() {
  const [createEvent, setCreateEvent] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const { authToken } = useContext(AuthContext);
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
      setEventData(response.data.events);
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
        <div className={`col-span-5 lg:col-span-3 `}>
          {createEvent ? (
            <CreateEvents
              createEvent={createEvent}
              setCreateEvent={setCreateEvent}
            />
          ) : null}
          {!createEvent && (
            <div className="grid gap-5 p-5">
              <div className="grid gap-3">
                <h1>Insights</h1>
                <div className="lg:grid grid-cols-3 gap-5">
                  <CountCard
                    type="Events"
                    count={eventData && eventData.length}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <h1>Events</h1>
                <div className="grid lg:grid-cols-2 gap-3">
                  {eventData &&
                    eventData.map((item) => {
                      return <EventCard data={item} />;
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="hidden px-5">
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
