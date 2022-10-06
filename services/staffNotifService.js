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
      try {
        staffNotification.count += 1;
        const newNotif = await staffNotification.save();
        const { action, status } = newNotif;
        emailSend(firstName, action, expDate, email, type, emailType);
        return `an email sent about : ${firstName}'s ${action} and it's status : ${status} \nplease check your email`;
      } catch (err) {
        return err.message;
      }
    }
  } else if (
    staffNotification.count == 2 &&
    staffNotification.notificationStatus !== "limited"
  ) {
    if (differenceInDay == 6) {
      try {
        staffNotification.count += 1;
        const newNotif = await staffNotification.save();
        const { firstName, cardName } = newNotif;
        emailSend(firstName, cardName, expDate, email, type, emailType);
        return `an email sent about : ${firstName}'s ${cardName} to your email please check it`;
      } catch (err) {
        return err.message;
      }
    }
  } else if (
    staffNotification.count == 3 &&
    staffNotification.notificationStatus !== "limited"
  ) {
    if (differenceInDay == 9) {
      try {
        staffNotification.count += 1;
        const newNotif = await staffNotification.save();
        const { firstName, cardName } = newNotif;
        emailSend(
          firstName,
          cardName,
          expDate,
          email,
          type,
          emailType,
          staffNotification.count
        );
        return `an email sent about : ${firstName}'s ${cardName} to your email please check it`;
      } catch (err) {
        return err.message;
      }
    }
  } else {
    return `You reached notifications limit that is : ${staffNotification.count} times`;
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
      try {
        const newNotification = {
          action: cardName,
          notificationType: "staff notification",
          status: "Warning",
          refId: userID,
        };
        const newNotif = await new Notifications(newNotification).save();
        const { action, status } = newNotif;
        emailSend(firstName, action, expDate, email, "Warning", "first");
        return `an email sent about : ${firstName}'s ${action} and it's status : ${status} \nplease check your email`;
      } catch (err) {
        return err.message;
      }
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
      try {
        const newNotification = {
          action: cardName,
          notificationType: "staff notification",
          status: "Inactive",
          refId: userID,
        };
        const newNotif = await new Notifications(newNotification).save();
        const { action, status } = newNotif;
        //staff status updating.
        staffExpCardDates[0].status = "Inactive";
        await staffExpCardDates[0].save();
        emailSend(
          firstName,
          result.action,
          expDate,
          email,
          "Inactive",
          "first"
        );
        return `an email sent about : ${firstName}'s ${action} and it's status : ${status} we set staff status : ${staffExpCardDates[0].status}\nplease check your email`;
      } catch (err) {
        return err.message;
      }
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
  }
  // else {
  //   return "Clear";
  // }
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
        html: emailTemplate2(firstName, cardName, expDate, email, type, count), // html body if warning call warning template_email
      });
      return sendSecondEmail;
    }
  } catch (err) {
    return err.message;
  }
};

const checkStaffCardsService = async () => {
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
    let medical_Result = await checkCardExpiration(
      medicalCardResult,
      staffExpCardDates[i]._id,
      staffExpCardDates[i].firstName,
      staffExpCardDates[i].email,
      staffExpCardDates[i].status,
      "medicalCard"
    );
    reusltOfCards.push({ license_Result, medical_Result });
  }
  return reusltOfCards;
};

module.exports = checkStaffCardsService;
