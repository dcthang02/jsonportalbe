const User = require('../models/user');
const LocalConfig = require('../models/localConfig');

const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('Wrong');
    }

    const users = await User.find().select('-password -accountName');
    res.status(200).json({
      users: users,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('Wrong');
    }

    const accountName = req.body.accountName;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const department = req.body.department;
    const accountType = req.body.accountType;

    const checkUser = await User.findOne({ accountName: accountName });
    if (checkUser) {
      const error = new Error('Account name already exists');
      error.statusCode = 409;
      throw error;
    }

    const hashPw = await bcrypt.hash(password, 12);

    const newUser = new User({
      accountName: accountName,
      password: hashPw,
      firstName: firstName,
      lastName: lastName,
      department: department,
      accountType: accountType,
    });

    await newUser.save();

    res.status(200).json({
      mes: 'success',
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
