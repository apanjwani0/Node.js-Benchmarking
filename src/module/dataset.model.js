const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  country: String,
  phoneNumber: String,
  createdAt: Date,
  indexField: {
    type: Number,
  }
});

datasetSchema.index({indexField: -1})

const Dataset = mongoose.model("Dataset", datasetSchema);
module.exports = Dataset;
