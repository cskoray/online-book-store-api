const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const authenticateUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const jwtDecode = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.substring("Bearer ".length);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken) {
      req.token = decodedToken;
      return next();
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = { generateToken, authenticateUser, jwtDecode };
