const express = require("express")
const router = express.Router();
const { registerUser, authUser,getPlans} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware")

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/plans').get(protect,getPlans);

module.exports = router;