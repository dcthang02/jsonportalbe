const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const LocalConfig = require('../models/localConfig');

const SECRET_KEY = process.env.TOKEN_SECRET_KEY;

exports.postLogin = async (req, res, next) => {
  try {
    const accountName = req.body.accountName;
    const password = req.body.password;
    const user = await User.findOne({
      accountName: accountName,
    });

    if (!user) {
      const error = new Error(
        'Wrong accountName or password. Please check again'
      );
      error.statusCode = 401;
      throw error;
    }
    const isMatchPw = await bcrypt.compare(password, user.password);
    if (!isMatchPw) {
      const error = new Error(
        'Wrong accountName or password. Please check again'
      );
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        accountName: user.accountName,
        accountType: user.accountType,
      },
      SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({
      token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getType = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('Wrong');
    }

    res.status(200).json({
      accountType: user.accountType,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
