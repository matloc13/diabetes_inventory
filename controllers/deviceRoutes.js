const express = require("express");
const router = express.Router();
const verify = require('./verifyToken');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const Device = require('./../models/device');
const SuppliesAquired = require('./../models/suppliesAquired');
const DeviceChange = require('./../models/deviceChange');
const DeviceFailure = require('./../models/deviceFailure');

router.get("/:user_id", verify, (req, res) => {

  Device.find({ user_id: req.params.user_id },(err, index) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.status(200).json(index);
    }
  })
});

router.get("/:deviceId/aquire", (req, res) => {
  
});

router.get("/:deviceId/change", (req, res) => {
  
});

router.get("/:deviceId/failure", (req, res) => {
  
});

// add new device

router.post("/:user_id/create", verify, (req, res) => {

  const sub = {
    user_id: req.params.user_id,
    deviceName: req.body.deviceName,
    brand: req.body.brand,
    model: req.body.model,
    serialNumber: req.body.serialNumber,
    userSpec: req.body.userSpec
  }

  if (req.body.user == sub.user_id) {
    Device.create(sub, (err, addDevice) => {
      if (err) {
        res.status(400)
      } else {
        res.status(200).json(addDevice)
      }
    })
  } else {
    res.status(404);
  }

});

// add supplies aquired

router.post("/:deviceId/:userId/aquire", csrfProtection, verify, (req, res) => {
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

router.post("/:deviceId/:userId/change", csrfProtection, verify, (req, res) => {
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

router.post("/:deviceId/:userId/failure", csrfProtection,verify, (req, res) => {
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

