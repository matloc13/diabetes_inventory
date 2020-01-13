const express = require("express");
const router = express.Router();

const Device = require('./../models/device');
// const User = require('./../models/user');
const SuppliesAquired = require('./../models/suppliesAquired');
const DeviceChange = require('./../models/deviceChange');
const DeviceFailure = require('./../models/deviceFailure');

//replace with authenticated user
const currentUser = "5e1a8912b87b60661dae6321";

router.get("/", (req, res) => {
  res.send(req.params)
});

// add new device

router.post("/create", (req, res) => {
const sub = {
  user_id: currentUser,
  deviceName: req.body.deviceName,
  brand: req.body.brand,
  model: req.body.model,
  serialNumber: req.body.serialNumber,
  userSpec: req.body.userSpec
}
  Device.create(sub, (err, addDevice) => {
    if (err) {
      res.status(400)
    } else {
      res.status(200).json(addDevice)
    }
  })
});

// add supplies aquired

router.post("/aquire", (req, res) => {
  console.log(req.body);
  const sub = {
    user_id: currentUser,
    device_id: req.body.device,
    date: req.body.date,
    boxLabel: req.body.boxLabel,
    note: req.body.note
  }
  SuppliesAquired.create(sub, (err, newSupplies) => {
    User.findAndUpdate()
    if (err) {
      res.status(400)
    } else {
      res.status(200).json(newSupplies);
    }
  })
});

// device change

router.post("/change", (req, res) => {
  const sub = {
    user_id: currentUser,
    device_id: req.body.device,
    date: req.body.date,
    note: req.body.note
  }
  DeviceChange.create(sub, (err, newChange) => {
    if (err) {
      res.status(400)
    } else {
      res.status(200).json(newChange)
    }
  })
});

// add new failure

router.post("/failure", (req, res) => {
  const sub = {
    user_id: currentUser,
    device_id: req.body.device,
    date: req.body.date,
    note: req.body.note
  }
  DeviceFailure.create(sub, (err, newFail) => {
    if (err) {
      res.status(400);
    } else {
      res.status(200).json(newFail);
    }
  })
});


module.exports = router;

