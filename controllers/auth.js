const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    //password check, user already registered
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (isPasswordCorrect) {
      //token generation
      const token = jwt.sign(
        { email: candidate.email, userId: candidate._id },
        keys.jwtKey, //key
        { expiresIn: 60 * 60 } //60 minutes
      );
      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      res
        .status(401) //401-unauthorized
        .json({ message: "Password entered incorrectly" });
    }
  } else {
    //user not registered yet
    res
      .status(404)
      .json({ message: "User with the same email not registered yet" });
  }
};

module.exports.register = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    //user already exists
    res
      .status(409) //409-conflict
      .json({ message: "User with the same email already exists" });
  } else {
    //creating a new user
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
    });
    try {
      await user.save();
      res.status(201).json(user); //201-created
    } catch (err) {
      errorHandler(res, err);
    }
  }
};
