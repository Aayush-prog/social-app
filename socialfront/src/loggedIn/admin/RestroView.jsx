import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useParams } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoMdPerson } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import Navs from "./Navs";
import SideBar from "./SideBar";

export default function EventView() {
  const { authToken } = useContext(AuthContext);
  const { restroId } = useParams();
  const [restroData, setRestroData] = useState([]);
  const [organizer, setOrganizer] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/std/restro/${restroId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setRestroData(response.data.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navs />
      <div className="grid grid-cols-2 gap-5">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div>
          <img
            src={`http://localhost:8000/images/${
              restroData ? restroData.image : null
            }`}
          />
          <div>
            <h1 className="font-bold text-xl">{restroData.name}</h1>
            <h2 className="font-semibold text-lg">{restroData.cuisine}</h2>
          </div>
          <div className="grid gridcols-2">
            <div>
              <div>
                <h2 className="font-semibold text-lg">Restro Description</h2>
                <p className="justify-center">{restroData.description}</p>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Restro Menu</h2>
                <p>{restroData.menu}</p>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <IoFastFoodOutline />
                <span>{restroData.cuisine}</span>
              </div>
              <div className="flex gap-2">
                <GrLocation />
                <span>{restroData.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
