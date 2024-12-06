import React from "react";
import { useNavigate } from "react-router-dom";

export default function RBCard(props) {
  const { data, type } = props;
  const { name, title, date, time, image, _id } = data;
  const navigate = useNavigate();
  const handleClick = () => {
    switch (type) {
      case "event":
        navigate(`/event/${_id}`);
        break;
      case "group":
        navigate(`/group/${_id}`);
        break;
    }
  };
  return (
    <div
      className="grid grid-cols-2 gap-3 p-5 rounded-xl shadow-lg bg-customgray place-items-center"
      onClick={handleClick}
    >
      <img
        src={`http://localhost:8000/images/${image}`}
        alt="Card Image"
        className=" rounded-xl h-[65px]"
      />

      <div>
        <div className={time && "p-1 rounded bg-black text-white"}>
          <p>{time}</p>
        </div>

        <h5 className="font-semibold">{name ? name : title}</h5>
        <p className="text-slate-400">{date}</p>
      </div>
    </div>
  );
}
