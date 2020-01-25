const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceFailureSchema = new Schema ({
  date: Date,
  item: String,
  note: String,
  device_id: {type: Schema.Types.ObjectId, ref: 'device'},
  user_id: {type: Schema.Types.ObjectId, ref: 'user'}
}, {timestamps: true})

const DeviceFailure = mongoose.model('deviceFailure', deviceFailureSchema);
module.exports = DeviceFailure;