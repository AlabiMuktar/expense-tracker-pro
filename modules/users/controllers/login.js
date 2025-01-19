const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, password } = req.body;

  const checkUser = await usersModel.findOne({
    email: email,
  });

  if (!checkUser) throw "this email does not exist";

  const accessToken = jwtManager(checkUser)

  const comparePassword = await bcrypt.compare(password, checkUser.password);
  if (!comparePassword) throw "password is incorrect. Please try again";

  res.status(200).json({
    status: "success",
    message: "Login successful",
    accessToken: accessToken,
  });
};

module.exports = login;
