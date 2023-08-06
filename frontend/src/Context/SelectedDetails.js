import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SelectedDetailsContext = createContext();
const SelectedDetails = ({ children }) => {
  const [period, setPeriod] = useState("Montly");
  const [selectedPlan, setSelectedPlan] = useState(
    {
    period: "Montly",
    name: "Mobile",
    price: "100",
    quality: "Good",
    resolution: "480p",
    devices: ["Phone", "Tablet"],
  }
  );

  const [user, setUser] = useState("");
  const [active,setActive] = useState(0);
  const [startTime,setStartTime] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, [navigate]);

  return (
    <SelectedDetailsContext.Provider
      value={{
        user,
        setUser,
        period,
        setPeriod,
        selectedPlan,
        setSelectedPlan,
        active,
        setActive,
        startTime,
        setStartTime
      }}
    >
      {children}
    </SelectedDetailsContext.Provider>
  );
};

export const SelectedDetailsState = () => {
  return useContext(SelectedDetailsContext);
};

export default SelectedDetails;
