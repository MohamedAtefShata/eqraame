/**
 * User conroller second layer after route layer
 * @desc this layer take request and do maniplaution in request then send data to servies and send respnse
 * @author Mahmoud Atef
 */

const User = require("../models/User.model");
const UserService = require("../services/user.service");

const addUser = async (req, res, next) => {
  try {
    const { name, email, password, birthdate, role, avatar } = req.body;

    let user = new User({ name, email, password, role });
    if (birthdate) user.birthdate = birthdate;
    if (avatar) user.avatar = avatar;

    // register user Servies
    await UserService.register(user);
    // response by token
    const token = user.getToken();
    res.status(201).json({ msg: "user register succufully", token });
  } catch (error) {
    next(error);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    let teachers = await User.find({ role: "teacher" });

    return res.json({ msg: "succuful request", data: teachers });
  } catch (error) {
    next(error);
  }
};

module.exports = { addUser, getAllTeachers };
