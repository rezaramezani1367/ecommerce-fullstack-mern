const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const profileSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "{PATH} must be least 3 character"],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [3, "{PATH} must be least 3 character"],
    },
    gender: {
      type: String,
      default: "male",
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: [15, "{PATH} must be least 15 character"],
    },
    city: {
      type: String,
      required: true,
      minLength: [3, "{PATH} must be least 3 character"],
    },
  },
  { versionKey: false }
);

const Profile = mongoose.model("Profile", profileSchema);

// Apply the uniqueValidator plugin to profileSchema.
profileSchema.plugin(uniqueValidator, {
  message: "{PATH} already exists(must be unique)",
});
module.exports = Profile;
