const Notifications = require("../models/Notifications");
const Staff = require("../models/Staff");
const nodemailer = require("nodemailer");
const { emailTemplate } = require("../documents/emailTemplate.js");

exports.sendStaffNotification = async (req, res) => {
  const staffExpCardDates = await Staff.find().select(
    "carrierId firstName lastName email phoneNumber license medicalCard status"
  );
  let notificationCreatedResult = {};
  const calculateExpireDates = (d2) => {
    let date1 = new Date(Date.now());
    let date2 = new Date(d2);
    let Difference_In_Time = date1.getTime() - date2.getTime();

    return Math.round(Difference_In_Time / (1000 * 3600 * 24 * 30));
  };
  const checkCardExpiration = async (expDate, cardName) => {
    let = count = 0;
    if (expDate >= -3 && expDate <= 0) {
      const staffNotification = await Notifications.findOne({
        email: staffExpCardDates[0].email,
      });
      //if found update it's cout by ading +1;
      if (!staffNotification) {
        const newNotification = {
          action: cardName,
          notificationType: "staff notification",
          count,
          status: "Warning",
          refId: staffExpCardDates[0]._id,
        };

        return (
          emailSend(
            staffExpCardDates[0].firstName,
            cardName,
            expDate,
            staffExpCardDates[0].email,
            "Warning"
          ),
          await new Notifications(newNotification)
            .save()
            .then((result) => {
              return (
                (notificationCreatedResult = result),
                console.log("notification-saved==", notificationCreatedResult)
              );
            })
            .catch((err) => console.log(err.message))
        );
      } else {
        //?update the count to send another notification.
      }
    } else if (expDate > 0 && staffExpCardDates[0].status !== "Inactive") {
      //Save notification
      //update action
      return emailSend(
        staffExpCardDates[0].firstName,
        cardName,
        expDate,
        staffExpCardDates[0].email,
        "blocking"
      );

      // staffExpCardDates[0].status = "Inactive";
      //?update the user status to inactive becouse it's card is expired.
      // staffExpCardDates[0]
      //   .save()
      //   .then(() => {})
      //   .catch(() => {});
      //? send and email notification to the Admin.
    }
  };
  const emailSend = async (firstName, cardName, expDate, email, type) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      });

      const sendEmail = await transporter.sendMail({
        from: '"Kloud Engineering" <fleet-management@fleet.com>',
        to: "ismailabdulkadirmo@gmail.com",
        replyTo: "naadir@kloudeng.com",
        subject: `Their is a warning from Kloud Engineering  for you Mr/Mss Ismail Abdulkadir`,
        text: "Their is a warning from Kloud Engineering  for you Mr/Mss Ismail Abdulkadir",
        html: emailTemplate(firstName, cardName, expDate, email, type), // html body if warining call warning template_email
      });
      return sendEmail;
    } catch (err) {
      console.log(err.message);
    }
  };

  for (let i = 0; i < staffExpCardDates.length; i++) {
    const licenseCardResult = calculateExpireDates(
      staffExpCardDates[i].license.expiryDate
    );
    const medicalCardResult = calculateExpireDates(
      staffExpCardDates[i].medicalCard.expiryDate
    );
    let licenseNotification = checkCardExpiration(
      licenseCardResult,
      "licenseCard"
    );
    let medicalNotification = checkCardExpiration(
      medicalCardResult,
      "medicalCard"
    );
    console.log("license = ", licenseNotification);
    console.log("medical = ", medicalNotification);
  }
  console.log("notifcation saved=", notificationCreatedResult);
  //?result of save notification.
  //* res.status(200).json()

  res.status(200).json({ staffExpCardDates });

  //?search expired cards in the staff db where status = 'Verified' if true->
  //?then call send notification function to the admin if true->
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
