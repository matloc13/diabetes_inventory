const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suppliesAquiredSchema = new Schema({
  date: Date,
  boxLabel: String,
  device_id: {
    type: Schema.Types.ObjectId,
    ref: 'device'
  },
  note: String
})

const SuppliesAquired = mongoose.model('suppliesAquired', suppliesAquiredSchema);
module.exports = SuppliesAquired;