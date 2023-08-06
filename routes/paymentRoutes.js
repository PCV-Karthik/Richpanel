const express = require("express")
const router = express.Router();
const {payment,deletePayment} = require("../controllers/paymentController");
const protect = require("../middleware/authMiddleware")

router.route('/').post(protect,payment).get(protect,deletePayment);

module.exports = router;