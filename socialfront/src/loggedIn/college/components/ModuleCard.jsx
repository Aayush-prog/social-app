import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function ModuleCard(props) {
  const { data } = props;
  console.log(data);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/clg/module/${data._id}`);
  };
  return (
    <div className=" p-5 rounded-lg shadow-lg" onClick={handleClick}>
      <img
        src={`http://localhost:8000/images/${data ? data.image : null}`}
        className="rounded-lg mb-3 h-[240px] object-cover"
      />
      <div>
        <span className="text-green">{data.department}</span>
        <h1 className="text-xl font-bold">{data.name}</h1>
        <p className="text-slate-400">{data.description.split(".")[0]}</p>
      </div>
    </div>
  );
}
