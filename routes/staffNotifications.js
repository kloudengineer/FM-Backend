const express = require("express");
const router = express.Router();
const {
  checkStaffCards,
  updateStaffNotification,
  updateStaffNotifAsReaded,
  getStaffNotificationList,
  getStaffNotification,
  setIsUnReadFalse,
  deleteStaffNotification,
} = require("../controllers/staffNotifications");

router.get("/notifications/staff-check", checkStaffCards);
router.put("/notifications/staff/:id", updateStaffNotification);
router.get("/notifications/read", updateStaffNotifAsReaded);
router.get("/notifications/staff", getStaffNotificationList);
router.get("/notifications/staff/:id", getStaffNotification);
router.get("/notifications/read/:id", setIsUnReadFalse);
router.delete("/notifications/staff/:id", deleteStaffNotification);

module.exports = router;
