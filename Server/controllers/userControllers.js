const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, pic } = req.body;

  if (!name || !username || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields!");
  }
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    res.status(400);
    throw new Error("Email Already Exists!");
  }
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    res.status(400);
    throw new Error("Username Already Exists!");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Opps! failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const user =
    (await User.findOne({ email })) || (await User.findOne({ username }));

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email, Usrname or pasword");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  // res.send("ok");
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
