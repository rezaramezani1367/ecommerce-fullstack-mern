const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  res.send(req.user);
});
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = new User(req.body);
  const token = await user.newAuthToken();
  res.status(201).send({ user });
});
exports.loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.checkValidCredentials(
    req.body.email,
    req.body.password
  );
  const token = await user.newAuthToken();
  user["token1"] = token;
  res.send({ user });
});
exports.logoutUser = asyncHandler(async (req, res, next) => {
  req.user.tokens = [];
  await req.user.save();
  res.send({ success: "ok", data: "logout successful" });
});
exports.changeProfileImage = asyncHandler(async (req, res, next) => {
  const defaultImage = "/profile-image/images.png";
  if (req.user.image !== defaultImage) {
    fs.unlink(path.join(__basedir, "/public", req.user.image), (err) => {
      if (err) {
        new Error(err);
      }
    });
  }
  if (!req.body.image) {
    throw new Error("image field is empty!");
  }

  // if()
  await User.findByIdAndUpdate(req.user._id, { image: req.body.image });
  res.send(await User.findOne({ _id: req.user._id }).populate("profile"));
});
exports.changeProfile = asyncHandler(async (req, res, next) => {
  const userCheckProfile = await User.findOne({ _id: req.user._id });
  if (userCheckProfile.profile) {
    await Profile.findByIdAndUpdate(userCheckProfile.profile, req.body, {
      runValidators: true,
    });
  } else {
    // when profile not exists
    const profile = new Profile(req.body);
    await profile.save();
    await User.findByIdAndUpdate(req.user._id, { profile: profile._id });
  }
  res.send(await User.findOne({ _id: req.user._id }).populate("profile"));
});
exports.changePassword = asyncHandler(async (req, res, next) => {
  // oldPassword & newPassword
  if (!(req.body.oldPassword && req.body.newPassword)) {
    throw new Error("oldPassword & newPassword require ");
  }
  // check old password
  const user = await User.findOne({ _id: req.user._id }).populate("profile");

  if (!user) {
    throw new Error("old password worng");
  }
  const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);

  if (!isMatch) {
    throw new Error("old password worng");
  }
  user.password = req.body.newPassword;
  await user.save();
  res.send(user);
});
