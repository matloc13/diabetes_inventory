const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceChangeSchema = new Schema ({
  _id: Schema.Types.ObjectId,
  date: Date,
  note: String,
  device_id: {type: Schema.Types.ObjectId, ref: 'device'}

}, {timestamps: true})

const DeviceChange = mongoose.model('deviceChange', deviceChangeSchema);
module.exports = DeviceChange;