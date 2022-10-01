const Notifications = require("../models/Notifications");
const Staff = require("../models/Staff");
const nodemailer = require("nodemailer");
const { emailTemplate } = require("../documents/emailTemplate.js");

exports.checkStaffCards = async (req, res) => {
  const staffExpCardDates = await Staff.find().select(
    "firstName lastName email phoneNumber license medicalCard status"
  );
  const calculateDateDifference = (d2, getBy) => {
    let date1 = new Date(Date.now());
    let date2 = new Date(d2);
    let Difference_In_Time = date1.getTime() - date2.getTime();
    switch (getBy) {
      case "month":
        return Math.round(Difference_In_Time / (1000 * 3600 * 24 * 30));
      case "day":
        return Math.round(Difference_In_Time / (1000 * 3600 * 24));
    }
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
    //* this way gives us a better scope area to access the variable.
    const staffNotification = await Notifications.findOne({
      refId: userID,
    })
      .where("action")
      .equals(cardName);

    if (expDate >= -3 && expDate <= 0 && status !== "In Review") {
      //   console.log(
      //     "Warning : Staff_Searching_Result : ",
      //     staffNotification ? "Found" : "Not Found"
      //   );

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
            // console.log("Warning Notfication_Saved==", result, "\n");
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
        return `warning : ${firstName}'s ${cardName} count updating is comming soon... \n`;

        //?if admin ignore last notification more then 3-days
        //? then -> start Loop : count + 1 and send Email with SMS notification
        //? if count === 3 stop sending notification
        //? else  return empty
      }
    } else if (expDate > 0 && status !== "In Review") {
      // && status !== "Inactive"
      //   const staffNotification = await Notifications.findOne({
      //     refId: userID,
      //   });
      //   console.log(
      //     "Inactive : Staff_Searching_Result : ",
      //     staffNotification ? "Found" : "Not Found"
      //   );
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
              //   console.log("Inactive : Notification_Saved == ", result, "\n");
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
              //   console.log(
              //     "Inactive : Staff_Status_Set_Inactive : ",
              //     result,
              //     "\n"
              //   );
              return result;
            })
            .catch((err) => {
              console.log("Staff_Status_Update_Error = ", err.message);
              return err.message;
            })
        );
      } else {
        // console.log(
        //   `Inactive : ${firstName}'s ${cardName} count updating is comming soon...\n`
        // );
        return `Inactive : ${firstName}'s ${cardName} count updating is comming soon...\n`;
        //?update 'In active' notification-saved user count by adding +1.
      }
    } else {
      return "Empty";
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
      return err.message;
    }
  };

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
