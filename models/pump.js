const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;

const pumpSchema = new Schema({
  profile : {
    firstName: String,
    lastName: String,
    age: Number,
    isAuthenticated: Boolean,
  },
  pump: {
    model: String,
    serialNumber: String,
    pumpSerialModel: String,
    suppliesAquired: Date,
    siteChanged: Date,
    comments: String
  }
});

const Pump = mongoose.model('pump', pumpSchema);
module.exports = Pump;