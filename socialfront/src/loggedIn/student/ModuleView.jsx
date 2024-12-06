import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useParams } from "react-router-dom";
import { GrOrganization } from "react-icons/gr";
import { FaBookOpenReader } from "react-icons/fa6";
import Navs from "./Navs";
import SideBar from "./SideBar";
import Book from "../../assets/open-book.png";

export default function ModuleView() {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [moduleData, setModuleData] = useState([]);
  const [college, setCollege] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/std/module/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setModuleData(response.data.data);
    };
    fetchData();

    const fetchCollege = async () => {
      const response = await axios.get(
        `http://localhost:8000/clg/${moduleData.clg}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCollege(response.data.data.name);
    };
    fetchCollege();
  }, []);
  return (
    <div>
      <Navs />
      <div className="grid grid-cols-5 mt-[70px]">
        <div className="hidden lg:block col-span-1">
          <SideBar />
        </div>
        <div className="col-span-5 lg:col-span-4 p-5">
          {moduleData && (
            <>
              <img
                src={`http://localhost:8000/images/${
                  moduleData ? moduleData.image : null
                }`}
                className="h-[300px] w-full object-cover mb-5"
              />
              <div className="mb-5">
                <h1 className="text-xl font-bold">{moduleData.name}</h1>
                <h2 className="text-lg font-semibold">
                  {moduleData.department}
                </h2>
              </div>
              <div className="grid lg:grid-cols-5 gap-10 ">
                <div className="col-span-4 order-2 lg:order-1 grid gap-5">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Module Description
                    </h2>
                    <p className="text-justify">{moduleData.description}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Module Syllabus</h2>
                    <div className="grid">
                      {moduleData.syllabus &&
                        moduleData.syllabus.map((item) => {
                          console.log(item);
                          return (
                            <div className="flex gap-3 place-items-center">
                              <img src={Book} className="w-[50px]" />
                              <h2 className="text-lg font-semibold">{item}</h2>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="text-xl order-1 lg:order-2">
                  <div className="grid gap-3">
                    <div className="flex gap-2">
                      <GrOrganization />
                      <span>{college}</span>
                    </div>
                    <div className="flex gap-2">
                      <FaBookOpenReader />
                      <span>{moduleData.credits}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>{moduleData.level}</span>
                    </div>
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
