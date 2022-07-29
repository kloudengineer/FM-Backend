const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema(
  {
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inspection", inspectionSchema);