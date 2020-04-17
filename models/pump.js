const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pumpSchema = new Schema({
    device_id: { type: Schema.Types.ObjectId, ref: 'device'},
    
})