const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Plan = require("../models/planModel")
const generateToken = require("../config/generateToken");


const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      message: "Ok",
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getPlans = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.period;
  try{
    const plans = await Plan.find({period : keyword}).sort({price:1});
    res.send(plans);
  }catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { registerUser, authUser, getPlans };
