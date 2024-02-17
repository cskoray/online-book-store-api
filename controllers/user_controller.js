const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/auth_middleware");
const User = require("../models/user");

exports.register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, address, phone, paymentCard } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      address,
      phone,
      paymentCard,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error(err.message);
  }
});
