const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');


const userSchema = new Schema ({
    email: String,
    firstName: String,
    lastName: String,
    age: {type: Number, min: 0 },
    birthDate: {type: Date, default: Date.now()},
    password: String,
    isAuthenticated: Boolean,
    notes: [{
        date: Date,
        comment: String
    }],
    devices: [{ type: Schema.Types.ObjectId, ref: 'device' }]
})


const User = mongoose.model('user', userSchema);
module.exports = User;