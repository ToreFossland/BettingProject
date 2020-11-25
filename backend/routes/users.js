
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

/**
 * @route   POST users/register
 * @desc    Register new user
 * @access  Public
 */

router.post("/register", async (req, res) => {
  try {
    let { email, username, password, passwordCheck } = req.body;

    // validate
    if (!email || !password || !passwordCheck || !username)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserEmail)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const existingUsername = await User.findOne({ username: username });
    if (existingUsername)
      return res
        .status(400)
        .json({ msg: "An account with this username already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_TOKEN, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   POST users/login
 * @desc    Login user
 * @access  Public
 */

router.post("/login", async (req, res) => {
  try {
    let { user, password } = req.body;

    // validate
    if (!user || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const userEmail = await User.findOne({ username: user });
    const username = await User.findOne({ email: user })

    if (!userEmail) {
      if (!username) {
        return res
          .status(400)
          .json({ msg: "No account with this username has been registered." });
      }
      user = username
    }
    else {
      user = userEmail
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: 3600 });
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   DELETE users/
 * @desc    Delete A Item
 * @access  Private
 */
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST users/tokenIsValid
 * @desc    Check if token is valid
 * @access  Private
 */
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET users/
 * @desc    Get user data
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
});

module.exports = router;