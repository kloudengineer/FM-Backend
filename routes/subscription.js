
const express = require("express");
const router = express.Router();

const {prices ,createSubscription,subscriptionStatus,subscriptions} = require('../controllers/subscription');

router.get('/prices', prices);
router.post('/create-subscription',createSubscription);
router.get('/subscription-status',subscriptionStatus);
router.get('/subscriptions',subscriptions);


module.exports = router;