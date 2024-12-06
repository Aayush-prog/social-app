import React, { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function GroupCard(props) {
  const navigate = useNavigate();
  const { data } = props;

  const handleClick = () => {
    navigate(`/clg/grp/${data._id}`);
  };

  return (
    <div
      className=" rounded-xl shadow-lg grid grid-cols-2 place-items-center gap-3"
      onClick={handleClick}
    >
      <img
        src={`http://localhost:8000/images/${data ? data.image : null}`}
        className=" rounded-l-xl h-[150px] object-cover"
      />
      <div>
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p className="text-slate-400">{data.description}</p>
      </div>
    </div>
  );
}
