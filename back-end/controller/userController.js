const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const User = new userModel({
      email,
      username,
      password: hashPassword,
    });
    await User.save();
    return res.status(200).send(User);
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await userModel.findOne({ email: email });
    if (!User) {
      return res.status(404).send("invalid username");
    }

    const match = await bcrypt.compare(password, User.password);
    if (!match) {
      return res.status(404).send("invalid password");
    }
    //jwt token
    const token = jwt.sign({ userId: User._id }, "abcdefghijk", {
      expiresIn: "1d",
    });
    
    return res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
