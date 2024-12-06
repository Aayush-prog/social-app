import React, { useState, useEffect, useContext } from "react";
import Navs from "./Navs";
import SideBar from "./SideBar";
import RightBar from "./RightBar";
import Fab from "./Fab";
import CreateModules from "./pages/createModules";
import CreateGroups from "./pages/createGroups";
import CreateEvents from "./pages/createEvents";
import CountCard from "./components/CountCard";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import ModuleCard from "./components/ModuleCard";

export default function Dashboard() {
  const [createModule, setCreateModule] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const { authToken } = useContext(AuthContext);
  const [eventData, setEventData] = useState();
  const [moduleData, setModuleData] = useState();
  const [groupData, setGroupData] = useState();
  const [stdData, setStdData] = useState();
  const [collegeData, setCollegeData] = useState();
  const [restroData, setRestroData] = useState();
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
      setStdData(response.data.std);
      setCollegeData(response.data.clg);
      setRestroData(response.data.restro);
      setEventData(response.data.events);
      setModuleData(response.data.modules);
      setGroupData(response.data.groups);
      console.log(eventData);
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen">
      <Navs />
      <div className="grid grid-cols-5 gap-5 mt-[60px]">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div className={`col-span-5 lg:col-span-3 `}>
          {createModule ? (
            <CreateModules
              createModule={createModule}
              setCreateModule={setCreateModule}
            />
          ) : null}
          {createEvent ? (
            <CreateEvents
              createEvent={createEvent}
              setCreateEvent={setCreateEvent}
            />
          ) : null}
          {createGroup ? (
            <CreateGroups
              createGroup={createGroup}
              setCreateGroup={setCreateGroup}
            />
          ) : null}
          {!createEvent && !createGroup && !createModule && (
            <div className="grid gap-5 p-5">
              <div className="grid gap-3">
                <h1>Insights</h1>
                <div className="lg:grid grid-cols-3 gap-5">
                  <CountCard
                    type="Students"
                    count={stdData && stdData.length}
                  />
                  <CountCard
                    type="Colleges"
                    count={collegeData && collegeData.length}
                  />
                  <CountCard
                    type="Restaurants"
                    count={restroData && restroData.length}
                  />
                  <CountCard
                    type="Events"
                    count={eventData && eventData.length}
                  />
                  <CountCard
                    type="Modules"
                    count={moduleData && moduleData.length}
                  />
                  <CountCard
                    type="Groups"
                    count={groupData && groupData.length}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <h1>Modules</h1>
                <div className="grid lg:grid-cols-2 gap-3">
                  {moduleData &&
                    moduleData.map((item) => {
                      return <ModuleCard data={item} />;
                    })}
                </div>
              </div>
            </div>
          )}
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
