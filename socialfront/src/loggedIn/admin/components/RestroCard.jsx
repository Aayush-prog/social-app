import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function RestroCard({ data }) {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const handleClick = () => {
    navigate(`/food/${data._id}`);
  };
  return (
    <div className=" p-5 rounded-lg shadow-lg" onClick={handleClick}>
      <img
        src={`http://localhost:8000/images/${data ? data.image : null}`}
        className="rounded-lg mb-3 h-[240px]"
      />
      <div>
        <span className="text-green">{data.cuisine}</span>
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p className="text-slate-400">{data.address}</p>
      </div>
    </div>
  );
}
