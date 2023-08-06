import React from "react";
import { SelectedDetailsState } from "../Context/SelectedDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlanPage = ( ) => {
  const { user, selectedPlan, active, setActive, startTime } = SelectedDetailsState();
  const devices = selectedPlan.devices.join("+");

  const navigate = useNavigate();

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + " " + date + "th, " + year;
    return time;
  }

  const cancel = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.get("/payment", config).then(() => {
      setActive(0);
    });
  };

  return (
    <div className="container flex flexCenter">
      <div className="box flexCol planPage">
        <div className="flex header">
          <div className="flex flexCenter">
            <div className="heading bold large">Current Plan Details</div>
            {active ? (
              <div className="active">Active</div>
            ) : (
              <div className="cancelled">Cancelled</div>
            )}
          </div>
          {active ? <button className="cancel" onClick={cancel}>Cancel</button> : ""}
        </div>
        <div className="medium">Basic</div>
        <div className="opac">{devices}</div>
        <div className="bold x-large cost">
          &#8377;{selectedPlan.price}{" "}
          <span className="medium large">
            /{selectedPlan.period === "Montly" ? "mo" : "yr"}
          </span>
        </div>

        <button
          className="whiteButton"
          onClick={() => {
            navigate("/selection");
          }}
        >
          {active ? "Change Plan" : "Choose Plan"}
        </button>
        {active ? <div className="message">
          Your subscription as started on {timeConverter(startTime)} and will
          auto renew on{" "}
          {timeConverter(
            startTime + (selectedPlan.period === "Montly" ? 2716143 : 31643326)
          )}
        </div> : <div className="message">
          Your subscription was cancelled and you will loose access to service on  {timeConverter(startTime)}
        </div>}
        
      </div>
    </div>
  );
};

export default PlanPage;
