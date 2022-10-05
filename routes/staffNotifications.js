const express = require("express");
const router = express.Router();
const {
  checkStaffCards,
  updateStaffNotification,
  getStaffNotificationList,
  deleteStaffNotification,
} = require("../controllers/staffNotifications");

router.get("/staff-notification", checkStaffCards);
router.put("/staff-notification/:id", updateStaffNotification);
router.get("/staff-notification-list", getStaffNotificationList);
router.delete("/staff-notification/:id", deleteStaffNotification);

module.exports = router;
