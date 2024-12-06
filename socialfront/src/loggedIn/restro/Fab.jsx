import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Fab = ({ createEvent, setCreateEvent, isBlurred, setIsBlurred }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };
  const toggleEvent = () => {
    setCreateEvent(!createEvent);
    setIsBlurred(!isBlurred);
  };
  return (
    <div className="fixed bottom-5 right-5">
      {/* Option 1 */}

      {/* Main FAB button */}
      <button
        className="w-14 h-14 rounded-full bg-purple-500 text-white shadow-lg flex place-items-center justify-center text-3xl transition-transform duration-300"
        onClick={toggleEvent}
      >
        <MdAdd />
      </button>
    </div>
  );
};

export default Fab;
