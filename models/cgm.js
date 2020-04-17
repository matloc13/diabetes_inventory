 const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cgmSchema = new Schema({
    device_id: { type: Schema.Types.ObjectId, ref: 'device'},
    brand: String,
    model: String,
    serialNumber: String,
    transmitter_id:[Object],
    userSpec: Schema.Types.Mixed,
})

const cgm = mongoose.model('cgm', cgmSchema);
module.exports = cgm;