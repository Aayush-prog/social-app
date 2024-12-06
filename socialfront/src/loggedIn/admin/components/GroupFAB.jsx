import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EventFAB = ({ editGroup, setEditGroup }) => {
  const toggleOptions = () => {
    setEditGroup(!editGroup);
  };
  return (
    <div className="fixed bottom-5 right-5">
      {/* Main FAB button */}
      <button
        className="w-14 h-14 rounded-full bg-purple-500 text-white shadow-lg flex place-items-center justify-center text-3xl transition-transform duration-300"
        onClick={toggleOptions}
      >
        <MdEdit />
      </button>
    </div>
  );
};

export default EventFAB;
