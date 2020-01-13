const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;

const pumpSchema = new Schema({
    _id: Schema.Types.ObjectId,
    pump: {
        brand: String,
        model: String,
        serialNumber: String,
        pumpSerialModel: String,
        suppliesAquired: [{
            date: Date,
            boxLabel: String
        }]
    },
    deviceChanges: [],
    deviceFailures: [],
    user_id: {type: Schema.Types.ObjectId, ref: 'user'}
});

const Pump = mongoose.model('pump', pumpSchema);
module.exports = Pump;