import React from "react";
import axios from "axios";
import { SelectedDetailsState } from "../Context/SelectedDetails";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SelectionPage = () => {
  const [plans, setPlans] = useState([]);
  const { user, period, setPeriod, selectedPlan, setSelectedPlan } =
  SelectedDetailsState();
  
  const navigate = useNavigate();
  const fetchPlans = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios
        .get(`user/plans?period=${period}`, config)
        .then(({ data }) => {
          setPlans(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlans(period);
  },[period,user]);


  return (
    <div className="container flex flexCenter">
      <div className="box flexCol selectionPage flexCenter">
        <div className="heading bold larger">Choose the right plan for you</div>
        <div className="flex">
          <div className="flexCol">
            <div className="tabs flex">
              <div className="flex tabList flexCenter">
                <button
                  className={period === "Montly" ? "tab selected" : "tab"}
                  onClick={() => {
                    setPeriod("Montly");
                  }}
                >
                  Montly
                </button>
                <button
                  className={period === "Yearly" ? "tab selected" : "tab"}
                  onClick={() => {
                    setPeriod("Yearly");
                  }}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div className="tableData fill underline">Montly price</div>
            <div className="tableData fill underline">Video Quality</div>
            <div className="tableData fill underline">Resolution</div>
            <div className="tableData fill">Devices you can use to watch</div>
          </div>
          {plans.map((plan, id) => {
            return (
              <div
                className={
                  selectedPlan
                    ? selectedPlan.name === plan.name
                      ? "flexCol textCenter fill"
                      : "flexCol textCenter opac"
                    : ""
                }
                key={id}
              >
                <div className="tableHeading flexCol flexCenter">
                  <button
                    className="tableHeadingData flex flexCenter blueButton"
                    onClick={() => {
                      setSelectedPlan(plan);
                    }}
                  >
                    {plan.name}
                  </button>
                  <div className="down-arrow"></div>
                </div>
                <div className="tableData underline">{plan.price}</div>
                <div className="tableData underline">{plan.quality}</div>
                <div className="tableData underline">{plan.resolution}</div>
                <div>
                  {plan.devices.map((device, id) => {
                    return (
                      <div className="tableData textCenter" key={id}>
                        {device}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="submit blueButton textCenter"
          onClick={() => {
            navigate("/payment");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectionPage;
