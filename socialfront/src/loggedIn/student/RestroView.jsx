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
  const { id } = useParams();
  const [restroData, setRestroData] = useState([]);
  const [organizer, setOrganizer] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/std/restro/${id}`,
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
      <div className="grid grid-cols-5 mt-[70px]">
        <div className="hidden lg:block col-span-1">
          <SideBar />
        </div>
        <div className="col-span-5 lg:col-span-4 p-5">
          <img
            src={`http://localhost:8000/images/${
              restroData ? restroData.image : null
            }`}
            className="h-[300px] w-full object-cover mb-5"
          />
          <div className="mb-5">
            <h1 className="font-bold text-xl">{restroData.name}</h1>
            <h2 className="font-semibold text-lg">{restroData.cuisine}</h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-10 ">
            <div className="col-span-4 order-2 lg:order-1 grid gap-5">
              <div>
                <h2 className="font-semibold text-lg">Restro Description</h2>
                <p className="justify-center">{restroData.description}</p>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Restro Menu</h2>
                <p>{restroData.menu}</p>
              </div>
            </div>
            <div className="text-xl order-1 lg:order-2">
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
