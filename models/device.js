const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema ({
    user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    deviceName: { type: String, default: "Insulin Pump"},
    brand: String,
    model: String,
    serialNumber: String,
    userSpec: Schema.Types.Mixed,
    suppliesAquired: [{type: Schema.Types.ObjectId, ref: 'suppliesAquired'}],
    deviceChanges: [{type: Schema.Types.ObjectId, ref: 'deviceChange'}],
    deviceFailures: [{type: Schema.Types.ObjectId, ref: 'deviceFailure'}]
})

const Device = mongoose.model('device', deviceSchema);
module.exports = Device;


