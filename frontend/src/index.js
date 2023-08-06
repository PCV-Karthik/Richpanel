import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import SelectedDetails from "./Context/SelectedDetails";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NblONSEM9MEwjjjSn5dDn55rUea67l3RYr1vl51Uc1X6yA5DRwG4b3sTV8dbDq3s08Y6biwlBfvzLjp1yQWgP9q0005ZscrJq"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SelectedDetails>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </SelectedDetails>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
