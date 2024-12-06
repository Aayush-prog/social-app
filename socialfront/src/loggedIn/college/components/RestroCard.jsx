import React, { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";

export default function RestroCard(props) {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const { restroId } = props;
  const [restroData, setRestroData] = useState([]);
  const handleClick = () => {
    navigate(`/event/${eventId}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/std/module/${restroId}`,
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
    <div className="p-5" onClick={handleClick}>
      <img
        src={`http://localhost:8000/images/${
          restroData ? restroData.image : null
        }`}
      />
      <div>
        <span>{restroData.cuisine}</span>
        <h2>{restroData.name}</h2>
        <p>{restroData.address}</p>
      </div>
    </div>
  );
}
