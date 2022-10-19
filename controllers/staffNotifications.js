const {
  checkStaffCardsService,
  getNotificationsList,
} = require("../services/staffNotifService");
const Staff = require("../models/Staff");

exports.checkStaffCards = async (req, res) => {
  try {
    const { uid } = req.user;
    const staff = await Staff.findOne({ uid }).exec();
    const { carrierId } = staff;

    const staffCardResult = await checkStaffCardsService(carrierId);
    res.status(200).json(staffCardResult);
  } catch (err) {
    //status 500
    res.json({ msg: err.message });
  }
};

exports.getStaffNotificationList = async (req, res) => {
  try {
    const { uid } = req.user;
    const staff = await Staff.findOne({ uid }).exec();
    const { carrierId } = staff;

    const page = 1;
    const limit = 5;

    const result = await getNotificationsList(page, limit, carrierId);
    res.json(result);
  } catch (e) {
    console.log("e =", e.message);
  }
};

exports.getStaffNotification = async (req, res) => {
  res.json("staff notification profile ");
};

exports.updateStaffNotification = async (req, res) => {
  res.json("update staff notification");
};

exports.deleteStaffNotification = async (req, res) => {
  res.json("delete staff notification");
};
