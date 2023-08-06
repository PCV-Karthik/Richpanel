import React, { useEffect } from "react";
import { SelectedDetailsState } from "../Context/SelectedDetails";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardInput from "../components/CardInput";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { user, selectedPlan,active,setActive,setStartTime } = SelectedDetailsState();

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  useEffect(() => {
    if(active){
      navigate('/plan');
    }
  }, [])
  
  const submitHandler = async (event) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: user.email
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.post("/payment", {
        payment_method: result.paymentMethod.id,
        period: selectedPlan.period,
        plan: selectedPlan.name
      },config);
        
      const { client_secret, status, time } = res.data;
      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log("There was an issue!");
            console.log(result.error);
          } else {
            console.log("Subscription Activated");
            setActive(1);
            setStartTime(time)
            navigate('/plan');
          }
        });
      } else {
        console.log("Subscription Activated");
        setActive(1);
        setStartTime(time)
        navigate('/plan');
      }
    }
  };

  return (
    <div className="container paymentPage flex flexCenter">
      <div className="flex">
        <div className="cardDetails flexCol">
          <div className="x-large bold">Complete Payment</div>
          <div className="opac">Enter your credit or debit card details</div>
          <div className="cardInput">
          <CardInput />
          </div>
          <button className="submit large blueButton" onClick={submitHandler}>
            Confirm Payment
          </button>
        </div>
        <div className="orderSummary flexCol">
          <div className="heading larger bold">Order Summary</div>
          <div className="flex underline">
            <div className="tableData">Plan Name</div>
            <div className="tableData medium">{selectedPlan.name}</div>
          </div>
          <div className="flex underline">
            <div className="tableData">Billing Cycle</div>
            <div className="tableData medium">{selectedPlan.period}</div>
          </div>
          <div className="flex">
            <div className="tableData ">Plan price</div>
            <div className="tableData medium">
              &#8377;{selectedPlan.price}
              {selectedPlan.period == "Montly" ? "/mo" : '/yr'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
