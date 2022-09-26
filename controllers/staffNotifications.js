const Notifications = require("../models/Notifications");
const Staff = require("../models/Staff");

exports.sendStaffNotification = async (req, res) => {
  const staffExpCardDates = await Staff.find().select(
    "carrierId firstName lastName email phoneNumber license medicalCard status"
  );

  const calculateExpireDates = (d2) => {
    let date1 = new Date(Date.now());
    let date2 = new Date(d2);
    let Difference_In_Time = date1.getTime() - date2.getTime();

    return Math.round(Difference_In_Time / (1000 * 3600 * 24 * 30));
  };
  const checkCardExpiration = (expDate, cardName) => {
    if (expDate >= -3 && expDate <= 0) {
      return console.log(
        `their is a notification for ${staffExpCardDates[0].firstName}${staffExpCardDates[0].lastName} because it's ${cardName} will expire after${expDate}-month and it's email : ${staffExpCardDates[0].email}`
      );
    } else if (expDate > 0 && staffExpCardDates[0].status !== "Inactive") {
      return console.log(`we will set ${staffExpCardDates[0].firstName}${staffExpCardDates[0].lastName} status to -In Active- because it's ${cardName} expired before ${expDate}-month ago and it's email : 
        ${staffExpCardDates[0].email}`);
      // staffExpCardDates[0].status = "Inactive";
      //?update the user status to inactive becouse it's card is expired.
      // staffExpCardDates[0]
      //   .save()
      //   .then(() => {})
      //   .catch(() => {});
      //? send and email notification to the Admin.
    }
  };

  for (let i = 0; i < staffExpCardDates.length; i++) {
    const licenseCardResult = calculateExpireDates(
      staffExpCardDates[i].license.expiryDate
    );
    const medicalCardResult = calculateExpireDates(
      staffExpCardDates[i].medicalCard.expiryDate
    );
    checkCardExpiration(licenseCardResult, "licenseCard");
    checkCardExpiration(medicalCardResult, "medicalCard");
  }

  res.status(200).json({ staffExpCardDates });

  //! moment package install to calculate dates.
  //!search expired cards in the staff db where status = 'Verified' if true->
  //?get license.expiryDate, medicalCard.expiryDate
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
