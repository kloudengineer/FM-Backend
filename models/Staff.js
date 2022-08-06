const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    avatarUrl: {
      path: { type: String },
      preview: { type: String }
    },
    firstName: { type: String },
    lastName: { type: String },
    email: {
      type: String,
      index: true,
    },
    phoneNumber: { type: String },
    dateOfBirth: { type: String },
    ssn: { type: String },
    address: [
      {
        streetAddress1: String,
        streetAddress2: String,
        city: String,
        state: String,
        zipCode: String,
        moveInDate: String,
        moveOutDate: String
      },
    ],
    workHistory: [
      {
        companyName: String,
        companyAddress: String,
        position: String,
        startDate: String,
        endDate: String,
        referenceName: String,
        referencePhone: String,
        referenceEmail: String,
      },
    ],
    license: {
      number: String,
      state: String,
      issueDate: String,
      expiryDate: String,
    },
    medicalCard: {
      issueDate: String,
      expiryDate: String
    },
    status: {
      type: String,
      enum: ["In Review", "Verified", "Active", "Inactive", "Banned"],
      default: "In Review",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);