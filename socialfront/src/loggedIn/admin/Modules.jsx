import React, { useContext, useEffect, useState } from "react";
import Navs from "./Navs";
import SideBar from "./SideBar";
import RightBar from "./RightBar";
import Fab from "./Fab";
import CreateModules from "./pages/createModules";
import CreateGroups from "./pages/createGroups";
import CreateEvents from "./pages/createEvents";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import EventCard from "./components/EventCard";
import ModuleCard from "./components/ModuleCard";

export default function Modules() {
  const { authToken } = useContext(AuthContext);
  const [createModule, setCreateModule] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [moduleData, setEventData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setEventData(response.data.modules);
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
          {createModule && (
            <CreateModules
              createModule={createModule}
              setCreateModule={setCreateModule}
            />
          )}
          {createEvent && (
            <CreateEvents
              createEvent={createEvent}
              setCreateEvent={setCreateEvent}
            />
          )}
          {createGroup && (
            <CreateGroups
              createGroup={createGroup}
              setCreateGroup={setCreateGroup}
            />
          )}
          <div className="grid lg:grid-cols-2 gap-8">
            {moduleData &&
              !createEvent &&
              !createGroup &&
              !createModule &&
              moduleData.map((item) => {
                return <ModuleCard key={item.id} data={item} />;
              })}
          </div>
        </div>
        <div className="hidden lg:block px-5">
          <RightBar />
        </div>
      </div>
      <Fab
        createModule={createModule}
        setCreateModule={setCreateModule}
        createEvent={createEvent}
        setCreateEvent={setCreateEvent}
        createGroup={createGroup}
        setCreateGroup={setCreateGroup}
        isBlurred={isBlurred}
        setIsBlurred={setIsBlurred}
      />
    </div>
  );
}
