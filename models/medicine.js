const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now},
    prescriptionNumber: { type: String },
    doctor: { type: String },
    pharmacy: { type: String },
    size: { type: String },
    refillLength: { type: Number},
    user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    malfunction: { type: String },
    finished: { type: Boolean, default: false }
})

const Medicine = mongoose.model('medicine', medicineSchema);

module.exports =  Medicine;