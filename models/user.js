const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');


const userSchema = new Schema ({
    email: { type: String, required: true, unique: true},
    firstName: String,
    lastName: String,
    userName: { type: String, required: true },
    age: {type: Number, min: 0 },
    birthDate: { type: Date },
    password: { type: String, required: true },
    isAuthenticated: Boolean,
    notes: [{
        date: Date,
        comment: String
    }],
    devices: [{ type: Schema.Types.ObjectId, ref: 'device' }]
})


const User = mongoose.model('user', userSchema);
module.exports = User;