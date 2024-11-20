const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.json({ status : "login Successful"}); // here , we might have to see, if gets any error
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