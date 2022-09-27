const Notifications = require("../models/Notifications");
const Staff = require("../models/Staff");
const nodemailer = require("nodemailer");
const { emailTemplate } = require("../documents/emailTemplate.js");

exports.sendStaffNotification = async (req, res) => {
  const staffExpCardDates = await Staff.find().select(
    "firstName lastName email phoneNumber license medicalCard status"
  );
  console.log("Staff_List = ", staffExpCardDates);
  //   let notificationCreatedResult = {};
  const calculateExpireDates = (d2) => {
    let date1 = new Date(Date.now());
    let date2 = new Date(d2);
    let Difference_In_Time = date1.getTime() - date2.getTime();

    return Math.round(Difference_In_Time / (1000 * 3600 * 24 * 30));
  };
  const checkCardExpiration = async (
    expDate,
    userID,
    firstName,
    email,
    status,
    cardName
  ) => {
    let = count = 0;
    // let laterSendWarnNotif = {};

    if (expDate >= -3 && expDate <= 0) {
      const staffNotification = await Notifications.findOne({
        refId: userID,
      });
      console.log(
        "1-user searching is =",
        staffNotification == true ? "found" : "false"
      );

      if (!staffNotification) {
        const newNotification = {
          action: cardName,
          notificationType: "staff notification",
          count,
          status: "Warning",
          refId: userID,
        };

        return await new Notifications(newNotification)
          .save()
          .then((result) => {
            console.log("Warning Notfication_Saved==", result);
            //?this object only taking values.
            // laterSendWarnNotif = {
            //   firstName,
            //   cardName: result.action,
            //   expDate,
            //   email,
            // };
            emailSend(firstName, result.action, expDate, email, "Warning");
            return result;
          })
          .catch((err) => {
            console.log(err.message);
            return err.message;
          });
      } else {
        console.log("Warning count updating is comming soon...");
        //?update the count to send another notification.
      }
    } else if (expDate > 0 && status !== "Inactive") {
      //todo: if expDate greater then 0 and his status not equal to inactive -> second step :
      //todo: search user id from ref id's in the notification_DB
      const staffNotification = await Notifications.findOne({
        refId: userID,
      });
      console.log(
        "2-In active_user is : =",
        staffNotification == true ? "found" : "false"
      );
      //todo: if user not registered to the DB or it's ID === refId -> second step :
      if (!staffNotification || staffNotification.status !== "Inactive") {
        const newNotification = {
          action: cardName,
          notificationType: "staff notification",
          count,
          status: "Inactive",
          refId: userID,
        };

        staffExpCardDates[0].status = "Inactive";
        return (
          await new Notifications(newNotification)
            .save()
            .then((result) => {
              console.log("Inactive Notification_saved == ", result);
              //   emailSend(
              //     laterSendWarnNotif.firstName,
              //     laterSendWarnNotif.cardName,
              //     laterSendWarnNotif.expDate,
              //     laterSendWarnNotif.email,
              //     "Warning"
              //   );
              emailSend(firstName, result.action, expDate, email, "Inactive");
              return result;
            })
            .catch((err) => {
              console.log("NotificationDB_Save_Error = ", err.message);
              return err.message;
            }),
          await staffExpCardDates[0]
            .save()
            .then((result) => {
              console.log("set staff status Inactive = ", result);
              return result;
            })
            .catch((err) => {
              console.log("Staff_Status_Update_Error = ", err.message);
              return err.message;
            })
        );
      } else {
        console.log("Inactive count updating is comming soon...");
        //?update 'In active' notification-saved user count by adding +1.
      }
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
        to: "abdiaziiz1856@gmail.com",
        replyTo: "naadir@kloudeng.com",
        subject: `Their is a warning from Kloud Engineering  for you Mr/Mss Abdiaziiz Abdullahi`,
        text: "Their is a warning from Kloud Engineering  for you Mr/Mss Abdiaziiz Abdullahi",
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

    //?add this function arugments to first name and email.
    checkCardExpiration(
      licenseCardResult,
      staffExpCardDates[i]._id,
      staffExpCardDates[i].firstName,
      staffExpCardDates[i].email,
      staffExpCardDates[i].status,
      "licenseCard"
    );

    checkCardExpiration(
      medicalCardResult,
      staffExpCardDates[i]._id,
      staffExpCardDates[i].firstName,
      staffExpCardDates[i].email,
      staffExpCardDates[i].status,
      "medicalCard"
    );
  }
  //   console.log("notifcation saved=", notificationCreatedResult);
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
