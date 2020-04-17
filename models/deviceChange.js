const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceChangeSchema = new Schema(
    {
        date: Date,
        item: String,
        note: String,
        sensorId: String,
        device_id: { type: Schema.Types.ObjectId, ref: 'device' },
        user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    },
    { timestamps: true }
);

const DeviceChange = mongoose.model('deviceChange', deviceChangeSchema);
module.exports = DeviceChange;
