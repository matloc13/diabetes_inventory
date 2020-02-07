const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medRefillSchema = new Schema ({
    med_id: { type: Schema.Types.ObjectId, ref: 'medicineSchema'},
    date: {type: Date},
    details: { type: String }
}, {timestamps: true})

const MedRefill = mongoose.model('medRefill', medRefillSchema);
module.exports = MedRefill;