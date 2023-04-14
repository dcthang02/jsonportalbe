const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    accountName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    department: {
      type: String,
      require: true,
    },
    accountType: {
      type: String,
      require: true,
    },
    localConfigs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LocalConfig',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
