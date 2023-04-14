const User = require('../models/user');
const LocalConfig = require('../models/localConfig');

exports.getVersions = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('Wrong');
    }

    res.status(200).json({
      vNumber: user.localConfigs.length,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getVersion = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .populate('localConfigs')
      .exec();
    if (!user) {
      throw new Error('Wrong');
    }

    const version = req.query?.v;
    const index = user.localConfigs.findIndex(
      value => value.version === Number(version)
    );

    if (index === -1) {
      throw new Error('Can not find version');
    }

    res.status(200).json({
      version: user.localConfigs[index],
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addVersion = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('Wrong');
    }
    const localConfigString = req.body.localConfigString;

    const newVersion = new LocalConfig({
      detail: localConfigString,
      version: user.localConfigs.length + 1,
    });
    await newVersion.save();
    user.localConfigs.push(newVersion._id);
    await user.save();

    res.status(200).json({
      mes: 'success',
      vNumber: user.localConfigs.length,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
