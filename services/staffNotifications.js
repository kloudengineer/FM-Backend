const Notifications = require("../models/Notifications");
const nodemailer = require("nodemailer");
const Staff = require("../models/Staff");

const {
  emailTemplate,
  emailTemplate2,
} = require("../documents/emailTemplate.js");

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
const checkAdminNotifRes = async (
  firstName,
  cardName,
  expDate,
  email,
  type,
  emailType,
  userID
) => {
  const staffNotification = await Notifications.findOne({
    refId: userID,
  })
    .where("action")
    .equals(cardName);

  const differenceInDay = calculateDateDifference(
    staffNotification.createdAt,
    "day"
  );
  if (
    staffNotification.count == 1 &&
    staffNotification.notificationStatus !== "limited"
  ) {
    if (differenceInDay == 3) {
      staffNotification.count += 1;
      staffNotification
        .save()
        .then((result) => {
          emailSend(firstName, cardName, expDate, email, type, emailType);
          console.log(
            "an email sent to the admin about : ",
            firstName,
            "'s",
            cardName
          );
          console.log("result=", result);
          return result;
        })
        .catch((err) => {
          return err.message;
        });
    } else {
      //? There aren't three days left from the last notification
      //return nothing.
      return "Clear";
    }
  } else if (
    staffNotification.count == 2 &&
    staffNotification.notificationStatus !== "limited"
  ) {
    if (differenceInDay == 6) {
      staffNotification.count += 1;
      staffNotification
        .save()
        .then((result) => {
          emailSend(firstName, cardName, expDate, email, type, emailType);
          return result;
        })
        .catch((err) => {
          return err.message;
        });
    } else {
      //? There aren't three days left from the last notification
      //return nothing.
      return "you are already have a notification please check you email.";
    }
  } else if (
    staffNotification.count == 3 &&
    staffNotification.notificationStatus !== "limited"
  ) {
    if (differenceInDay == 9) {
      staffNotification.count += 1;
      staffNotification
        .save()
        .then((result) => {
          emailSend(
            firstName,
            cardName,
            expDate,
            email,
            type,
            emailType,
            staffNotification.count
          );
          return result;
        })
        .catch((err) => {
          return err.message;
        });
    } else {
      //? There aren't three days left from the last notification
      //?if admin say ok to the first notification then don's send any notification

      return "you are already have a notification please check you email.";
    }
  } else {
    return "You reached notifications limit.";
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
  //* this way gives us a better scope area to access the variable.
  const staffExpCardDates = await Staff.find().select(
    "firstName lastName email phoneNumber license medicalCard status"
  );

  const staffNotification = await Notifications.findOne({
    refId: userID,
  })
    .where("action")
    .equals(cardName);

  if (expDate >= -3 && expDate <= 0 && status !== "In Review") {
    if (!staffNotification) {
      const newNotification = {
        action: cardName,
        notificationType: "staff notification",
        status: "Warning",
        refId: userID,
      };

      return await new Notifications(newNotification)
        .save()
        .then((result) => {
          emailSend(
            firstName,
            result.action,
            expDate,
            email,
            "Warning",
            "first"
          );
          return result;
        })
        .catch((err) => {
          console.log(err.message);
          return err.message;
        });
    } else {
      return await checkAdminNotifRes(
        firstName,
        cardName,
        expDate,
        email,
        "Warning",
        "second",
        userID
      );
    }
  } else if (expDate > 0 && status !== "In Review") {
    if (!staffNotification || staffNotification.status !== "Inactive") {
      const newNotification = {
        action: cardName,
        notificationType: "staff notification",
        status: "Inactive",
        refId: userID,
      };

      staffExpCardDates[0].status = "Inactive";
      return (
        await new Notifications(newNotification)
          .save()
          .then((result) => {
            emailSend(
              firstName,
              result.action,
              expDate,
              email,
              "Inactive",
              "first"
            );
            return result;
          })
          .catch((err) => {
            console.log("NotificationDB_Save_Error = ", err.message);
            return err.message;
          }),
        await staffExpCardDates[0].save().catch((err) => {
          console.log("Staff_Status_Update_Error = ", err.message);
          return err.message;
        })
        //?no nedd to display in active staff from staff model.
        //   .then((result) => {
        //     const { firstName, lastName, email, status } = result;
        //     return {
        //       name: firstName + lastName,
        //       email,
        //       status,
        //     };
        //   })
      );
    } else {
      return await checkAdminNotifRes(
        firstName,
        cardName,
        expDate,
        email,
        "Inactive",
        "second",
        userID
      );
    }
  } else {
    return "Clear";
  }
};
const emailSend = async (
  firstName,
  cardName,
  expDate,
  email,
  type,
  emailType,
  count
) => {
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
    if (emailType == "first") {
      const sendFirstEmail = await transporter.sendMail({
        from: '"Kloud Engineering" <fleet-management@fleet.com>',
        to: "abdiaziiz1856@gmail.com",
        replyTo: "naadir@kloudeng.com",
        subject: `Their is a warning from Kloud Engineering  for you Mr/Mss Abdiaziiz Abdullahi`,
        text: "Their is a warning from Kloud Engineering  for you Mr/Mss Abdiaziiz Abdullahi",
        html: emailTemplate(firstName, cardName, expDate, email, type), // html body if warining call warning template_email
      });
      return sendFirstEmail;
    } else {
      const sendSecondEmail = await transporter.sendMail({
        from: '"Kloud Engineering" <fleet-management@fleet.com>',
        to: "abdiaziiz1856@gmail.com",
        replyTo: "naadir@kloudeng.com",
        subject: `Their is a warning from Kloud Engineering  for you Mr/Mss Abdiaziiz Abdullahi`,
        text: "Their is a warning from Kloud Engineering  for you Mr/Mss Abdiaziiz Abdullahi",
        html: emailTemplate2(firstName, cardName, expDate, email, type, count), // html body if warining call warning template_email
      });
      return sendSecondEmail;
    }
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  calculateDateDifference,
  checkCardExpiration,
};
