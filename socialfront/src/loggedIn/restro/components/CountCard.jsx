import React from "react";
import Group from "../../../assets/group.png";

export default function CountCard({ type, count }) {
  return (
    <div className="flex justify-between rounded shadow-lg p-5">
      <div>
        <h2>Total {type} </h2>
        <h1 className="text-2xl font-bold ">{count}</h1>
      </div>
      <div className="w-1/3 p-3 rounded-2xl shadow-lg bg-lurple">
        <img src={Group} />
      </div>
    </div>
  );
}
