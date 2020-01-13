const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstName: String,
    lastName: String,
    age: {type: Number, min: 0 },
    birthDate: Date,
    isAuthenticated: Boolean,
    notes: [{
        date: Date,
        comment: String
    }],
    devices: [{ type: Schema.Types.ObjectId, ref: 'device' }]
})


const User = mongoose.model('user', userSchema);
module.exports = User;