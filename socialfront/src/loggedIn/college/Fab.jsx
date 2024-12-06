import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Fab = ({
  createModule,
  setCreateModule,
  createEvent,
  setCreateEvent,
  createGroup,
  setCreateGroup,
  isBlurred,
  setIsBlurred,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };
  const toggleModule = () => {
    setCreateModule(!createModule);
    setIsBlurred(!isBlurred);
  };
  const toggleEvent = () => {
    setCreateEvent(!createEvent);
    setIsBlurred(!isBlurred);
  };
  const toggleGroup = () => {
    setCreateGroup(!createGroup);
    setIsBlurred(!isBlurred);
  };
  return (
    <div className="fixed bottom-5 right-5">
      {/* Option 1 */}
      <button
        className={`w-12 h-12 rounded px-8 bg-teal-500 text-white shadow-lg flex items-center justify-center transition-transform duration-300 transform ${
          isOpen
            ? "-translate-y-8 opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleModule}
        style={{ marginBottom: "1rem" }}
      >
        Modules
      </button>

      {/* Option 2 */}
      <button
        className={`w-12 h-12 rounded px-8 bg-teal-500 text-white shadow-lg flex items-center justify-center transition-transform duration-300 transform ${
          isOpen
            ? "-translate-y-8 opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleGroup}
        style={{ marginBottom: "1rem" }}
      >
        Groups
      </button>

      <button
        className={`w-12 h-12 rounded px-8 bg-teal-500 text-white shadow-lg flex items-center justify-center transition-transform duration-300 transform ${
          isOpen
            ? "-translate-y-8 opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleEvent}
      >
        Events
      </button>

      {/* Main FAB button */}
      <button
        className="w-14 h-14 rounded-full bg-purple-500 text-white shadow-lg flex place-items-center justify-center text-3xl transition-transform duration-300"
        onClick={toggleOptions}
      >
        <MdAdd />
      </button>
    </div>
  );
};

export default Fab;
