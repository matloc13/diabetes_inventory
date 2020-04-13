 const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cgmSchema = new Schema({
    device_id: { type: Schema.Types.ObjectId, ref: 'device'},
    transmitterId: {type: String, required: true },
    date_upated: {type: Date, required: true}
})

const cgm = mongoose.model('cgm', cgmSchema);
module.exports = cgm;