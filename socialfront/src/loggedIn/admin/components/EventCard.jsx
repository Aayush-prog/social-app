import React, { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function EventCard(props) {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const { data } = props;
  console.log(data);
  const handleClick = () => {
    navigate(`/admin/event/${data._id}`);
  };

  return (
    <div onClick={handleClick} className=" rounded-xl shadow-lg ">
      <img
        src={`http://localhost:8000/images/${data ? data.image : null}`}
        className="rounded-t-xl h-[200px] w-full object-cover"
      />
      <div className="flex gap-2 p-3">
        <span className="text-lg font-bold">{data ? data.date : null}</span>
        <div>
          <h3 className="font-bold">{data ? data.title : null}</h3>
          <p className="text-slate-400">{data ? data.description : null}</p>
        </div>
      </div>
    </div>
  );
}
