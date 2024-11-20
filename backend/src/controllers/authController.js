const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  try {
    // Attempt to create a new user
    await User.create({ name, email, password });
    res.json({ status: "Signup successful" });
  } catch (error) {
    // Handle Mongoose validation errors or other errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    } else {
      console.error('Error during user signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
  //   const user = await User.findOne({ email, password });

  //   if (!user)
  //     return res.render("login", {
  //       error: "Invalid email or Password",
  //     });

  //   const sessionId = uuidv4();
  //   setUser(sessionId, user);
  //   res.cookie("uid", sessionId);
  //   return res.redirect("/");


  try {
    const user = await User.findOne({ email, password }); // Update the field to match your schema
    if (!user) return res.status(404).json({ error: 'User not found' });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    res.json({ status : "login Successful"});
  } catch (error) {
    console.error('Login error:', error); // Log the error for debugging
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};