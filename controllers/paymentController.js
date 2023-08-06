const expressAsyncHandler = require("express-async-handler");
const Plan = require("../models/planModel");
const userPlanModel = require("../models/userPlanModel")



const payment = expressAsyncHandler(async (req,res) =>{
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
    const { payment_method, period, plan} = req.body;

    const api = await Plan.find({period : period,name : plan}).select("api");

    const customer = await stripe.customers.create({
        email: req.user.email,
        payment_method: payment_method,
        invoice_settings: {
          default_payment_method: payment_method,
        },
      });

    const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: api[0].api }],
    expand: ['latest_invoice.payment_intent']
    });

    await userPlanModel.create({user:req.user._id,subscriptionId:subscription.id});

    const status = subscription['latest_invoice']['payment_intent']['status'];
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret'];
    res.json({'client_secret':client_secret,'status':status,'time':subscription.start_date})
  
})

const deletePayment = expressAsyncHandler(async (req,res)=>{
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const subscriptionId = await userPlanModel.find({user:req.user._id});
  await stripe.subscriptions.del(subscriptionId[0].subscriptionId);
  await userPlanModel.deleteOne({subscriptionId:subscriptionId[0].subscriptionId})
  res.send("Cancelled");
})
module.exports = {payment,deletePayment}