const Notifications = require("../models/Notifications");
const nodemailer = require("nodemailer");
const Staff = require("../models/Staff");
const {
  emailTemplate,
  emailTemplate2,
} = require("../documents/emailTemplate.js");
//twilio
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

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
        await staffNotification.save();
        emailSend(firstName, cardName, expDate, email, type, emailType);
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
        await staffNotification.save();
        emailSend(firstName, cardName, expDate, email, type, emailType);
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
        await staffNotification.save();
        emailSend(
          firstName,
          cardName,
          expDate,
          email,
          type,
          emailType,
          staffNotification.count
        );
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
  carrierId,
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
  console.log("carrierID=", carrierId);

  if (expDate >= -3 && expDate <= 0 && status !== "In Review") {
    if (!staffNotification) {
      try {
        const newNotification = {
          carrierId,
          action: cardName,
          title: `Warning about : ${firstName}'s ${cardName}`,
          message: `Warning : ${firstName}'s ${cardName} will expire after ${expDate} month`,
          type: "staff notification",
          refId: userID,
        };
        await new Notifications(newNotification).save();
        emailSend(firstName, cardName, expDate, email, "Warning", "first");
        return `Warning : ${firstName}'s ${cardName}  will expire after ${expDate} month`;
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
          carrierId,
          action: cardName,
          title: `Inactivation : ${firstName}'s ${cardName}`,
          message: `User inactivation : ${firstName}'s ${cardName} expired before ${expDate} month ago`,
          type: "staff notification",
          refId: userID,
        };
        await new Notifications(newNotification).save();
        //staff status updating.
        staffExpCardDates[0].status = "Inactive";
        await staffExpCardDates[0].save();
        emailSend(firstName, cardName, expDate, email, "Inactive", "first");
        return `User inactivation : ${firstName}'s ${cardName} expired before ${expDate} month ago, and we set it's status : ${staffExpCardDates[0].status}`;
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
        text: emailTemplate(firstName, cardName, expDate, email, type), // html body if warining call warning template_email
      });
      return sendFirstEmail;
    } else {
      const sendSecondEmail = await transporter.sendMail({
        from: '"Kloud Engineering" <fleet-management@fleet.com>',
        to: "abdiaziiz1856@gmail.com",
        replyTo: "naadir@kloudeng.com",
        subject: `Their is a warning from Kloud Engineering  for you Mr/Mss Abdiaziiz Abdullahi`,
        text: emailTemplate2(firstName, cardName, expDate, email, type, count), // html body if warning call warning template_email
      });
      return sendSecondEmail;
    }
  } catch (err) {
    return err.message;
  }
};
const sendSms = async () => {
  try {
    const message = await client.messages.create({
      body: "hye ibrahim iska waram ",
      from: "+252617156305",
      to: "+252617631793",
    });
    console.log("Body == ", message.body);
    return console.log(console.log("msgSID = ", message.sid));
  } catch (err) {
    console.log("Error =", err.message);
    return err.message;
  }
};

const checkStaffCardsService = async (carrierId) => {
  const staffExpCardDates = await Staff.find().select(
    "firstName lastName email phoneNumber license medicalCard status"
  );
  //? testing sms service
  /* thei is an error :-
  The From phone number +252617156305 is not a valid, SMS-capable 
  inbound phone number or short code for your account.
  */
  // sendSms();

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
      carrierId,
      staffExpCardDates[i]._id,
      staffExpCardDates[i].firstName,
      staffExpCardDates[i].email,
      staffExpCardDates[i].status,
      "licenseCard"
    );
    let medical_Result = await checkCardExpiration(
      medicalCardResult,
      carrierId,
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

const getNotificationsList = async (page, limit, carrierId) => {
  try {
    //where type == staff-notification
    const notification = await Notifications.find({ carrierId: carrierId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return {
      data: notification,
    };
  } catch (err) {
    console.log("err = ", err.message);
    return err.message;
  }
};

module.exports = { checkStaffCardsService, getNotificationsList };
