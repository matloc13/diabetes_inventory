const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suppliesAquiredSchema = new Schema({
  date: Date,
  boxLabel: String,
  item: String,
  note: String,
  device_id: { type: Schema.Types.ObjectId, ref: 'device' },
  user_id: { type: Schema.Types.ObjectId, ref: 'user'}
})

const SuppliesAquired = mongoose.model('suppliesAquired', suppliesAquiredSchema);
module.exports = SuppliesAquired;