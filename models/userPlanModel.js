const mongoose = require("mongoose");

const userPlanSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    subscriptionId : {type:String}
  },
  { timestamps: true }
);


module.exports = mongoose.model("UserPlan",userPlanSchema)