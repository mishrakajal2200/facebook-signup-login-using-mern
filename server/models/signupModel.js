const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  surname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },

  gender: {
    type: String,
    enum: ["female", "male", "custom"],
    required: true,
  },
});
module.exports = mongoose.model("signupModel", SignupSchema);
