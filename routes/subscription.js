
const express = require("express");
const router = express.Router();

const {prices ,createSubscription,subscriptionStatus} = require('../controllers/subscription');

router.get('/prices', prices);
router.post('/create-subscription',createSubscription);
router.get('/subscription-status',subscriptionStatus);

module.exports = router;