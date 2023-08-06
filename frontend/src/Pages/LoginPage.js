import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SelectedDetailsState } from "../Context/SelectedDetails";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = SelectedDetailsState();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, [])
  

  const submitHandler = async () => {
    if (!email || !password) {
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios
        .post(
          "/user/login",
          {
            email,
            password,
          },
          config
        )
        .then(({data}) => {
          localStorage.setItem("userInfo",JSON.stringify(data)
          );
          setUser(data);
          navigate("/selection");
        });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex flexCenter">
      <div className="box flexCol loginPage">
        <div className="heading bold larger textCenter">
          Login into your account
        </div>
        <div className="input flexCol">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input flexCol">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit blueButton" onClick={submitHandler}>
          Login
        </button>
        <div className="link">
          New to MyApp?{" "}
          <span>
            {" "}
            <Link to="/">Sign Up</Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
