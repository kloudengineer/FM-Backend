exports.emailTemplate = (firstName, cardName, expDate, email, type) => {
  return type === "Warning"
    ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email} `
    : `Staff inactivation we set ${firstName}'s status to -InActive- because 
      it's ${cardName} expired before ${expDate}-month ago and it's email : ${email} `;
};
exports.emailTemplate2 = (firstName, cardName, expDate, email, type, count) => {
  return count == 9
    ? type === "Warning"
      ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email}\n
   this is the last notification about this event because you reached the limit`
      : `Warning ${firstName}'s status is inactive and he cann't drive because it's ${cardName} expired 
   before ${expDate}-month ago and it's email : ${email} \n 
   and this is the last notification about this event because you reached the limit`
    : type === "Warning"
    ? `Warning ${firstName}'s ${cardName} will expire after ${expDate}-month and it's email : ${email}\n`
    : `Warning for inactivation we set ${firstName}'s status to -InActive- because 
   it's ${cardName} expired before ${expDate}-month ago and it's email : ${email} `;
};
