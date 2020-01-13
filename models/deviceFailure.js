const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceFailureSchema = new Schema ({
  _id: Schema.Types.ObjectId,
  date: Date,
  note: String,
  device_id: {type: Schema.Types.ObjectId, ref: 'device'}
}, {timestamps: true})

const DeviceFailure = mongoose.model('deviceFailure', deviceFailureSchema);
module.exports = DeviceFailure;