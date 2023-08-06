import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!name || !email || !password) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { message } = await axios.post(
        "/user",
        {
          name,
          email,
          password,
        },
        config
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container flex flexCenter">
      <div className="box flexCol signupPage">
        <div className="heading bold larger textCenter">Create Account</div>
        <div className="input flexCol">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          Sign Up
        </button>
        <div className="link">
          Already have an account?{" "}
          <span>
            {" "}
            <Link to="/login">Login</Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
