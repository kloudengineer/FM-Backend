const staffNotification = require("../models/Notifications");

exports.sendStaffNotification = async (req, res) => {
  res.json({ msg: "create staff notification" });
  //!search expired cards in the db if true->
  //!then call send notification function to the admin if true->
  //!then save that notification info to the db
};
exports.updateStaffNotification = async (req, res) => {
  console.log("update staff notification");
};
exports.getStaffNotificationList = async (req, res) => {
  console.log("get staff notification list");
};
exports.deleteStaffNotification = async (req, res) => {
  console.log("delete staff notification");
};
