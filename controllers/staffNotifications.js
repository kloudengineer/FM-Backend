const Staff = require("../models/Staff");
const {
  calculateDateDifference,
  checkCardExpiration,
} = require("../services/staffNotifications");

exports.checkStaffCards = async (req, res) => {
  const staffExpCardDates = await Staff.find().select(
    "firstName lastName email phoneNumber license medicalCard status"
  );

  let reusltOfCards = [];
  for (let i = 0; i < staffExpCardDates.length; i++) {
    const licenseCardResult = calculateDateDifference(
      staffExpCardDates[i].license.expiryDate,
      "month"
    );
    const medicalCardResult = calculateDateDifference(
      staffExpCardDates[i].medicalCard.expiryDate,
      "month"
    );

    let license_Result = await checkCardExpiration(
      licenseCardResult,
      staffExpCardDates[i]._id,
      staffExpCardDates[i].firstName,
      staffExpCardDates[i].email,
      staffExpCardDates[i].status,
      "licenseCard"
    );
    console.log("License_Card_Result :", license_Result);
    let medical_Result = await checkCardExpiration(
      medicalCardResult,
      staffExpCardDates[i]._id,
      staffExpCardDates[i].firstName,
      staffExpCardDates[i].email,
      staffExpCardDates[i].status,
      "medicalCard"
    );
    console.log("Medical_Card_Result :", medical_Result);
    reusltOfCards.push({ license_Result, medical_Result });
  }
  res.json(reusltOfCards);
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
