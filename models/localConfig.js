const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const localConfigSchema = new Schema(
  {
    detail: {
      type: String,
    },
    version: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LocalConfig', localConfigSchema);
