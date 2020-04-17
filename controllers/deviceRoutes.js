const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Device = require('./../models/device');
const SuppliesAquired = require('./../models/suppliesAquired');
const DeviceChange = require('./../models/deviceChange');
const DeviceFailure = require('./../models/deviceFailure');

// get all user devices

router.get('/:user_id', verify, (req, res) => {
    Device.find({ user_id: req.params.user_id }, (err, index) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.status(200).json(index);
        }
    });
});

// get single device

router.get('/:device_id/get', verify, (req, res) => {
    Device.findOne({ _id: req.params.device_id }, (err, showDev) => {
        if (err) {
            res.status(401);
        } else {
            res.status(200).json(showDev);
        }
    });
});

router.get('/:device_id/aquire', (req, res) => {
    SuppliesAquired.find({ device_id: req.params.device_id }, (err, aqs) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.status(200).json(aqs);
        }
    });
});

router.get('/:device_id/change', (req, res) => {
    DeviceChange.find({ device_id: req.params.device_id }, (err, changes) => {
        if (err) {
            res.sendStatus(400);
        } else {
            res.status(200).json(changes);
        }
    });
});

router.get('/:device_id/failure', (req, res) => {
    DeviceFailure.find({ device_id: req.params.device_id }, (err, failures) => {
        if (err) {
            res.sendStatus(400);
        } else {
            res.status(200).json(failures);
        }
    });
});

// add new device

router.post('/:user_id/create', verify, (req, res) => {
    const sub = {
        user_id: req.params.user_id,
        deviceName: req.body.deviceName,
        brand: req.body.brand,
        model: req.body.model,
        serialNumber: req.body.serialNumber,
        userSpec: req.body.userSpec,
        transmitter_id: req.body.transmitter_id,
    };

    if (req.body.user == sub.user_id) {
        Device.create(sub, (err, addDevice) => {
            if (err) {
                res.status(400);
            } else {
                res.status(200).json(addDevice);
            }
        });
    } else {
        res.status(404);
    }
});

// add supplies aquired

router.post('/:deviceId/add/aquire', verify, (req, res) => {
    console.log(req.body);
    const sub = {
        user_id: req.body.user_id,
        device_id: req.params.deviceId,
        date: req.body.date,
        item: req.body.item,
        boxLabel: req.body.boxLabel,
        note: req.body.note,
    };
    SuppliesAquired.create(sub, (err, newSupplies) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json(newSupplies);
        }
    });
});

// device change

router.post('/:deviceId/add/change', verify, (req, res) => {
    const sub = {
        user_id: req.body.user_id,
        device_id: req.params.deviceId,
        date: req.body.date,
        item: req.body.item,
        note: req.body.note,
    };

    DeviceChange.create(sub, (err, newChange) => {
        if (err) {
            res.status(404);
        } else {
            res.status(200).json(newChange);
        }
    });
});

// add new failure

router.post('/:deviceId/add/failure', verify, (req, res) => {
    const sub = {
        user_id: req.body.user_id,
        device_id: req.params.deviceId,
        date: req.body.date,
        item: req.body.item,
        note: req.body.note,
    };
    DeviceFailure.create(sub, (err, newFail) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json(newFail);
        }
    });
});

router.put('/:deviceId/changeUp/change', (req, res) => {
    const sub = {
        user_id: req.body.user_id,
        device_id: req.params.deviceId,
        date: req.body.date,
        item: req.body.item,
        note: req.body.note,
    };
    DeviceChange.findByIdAndUpdate(sub, (err, update) => {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json(update);
        }
    });
});

// update transmitter id

router.put('/:deviceId/transmitter_update', (req, res) => {
    const sub = {
        user_id: req.body.user_id,
        device_id: req.params.deviceId,
        date: req.body.date,
        transmitter_id: req.body.transmitter_id,
    };
    Device.findByIdAndUpdate(
        sub.device_id,
        {
            $push: {
                transmitter_id: [
                    {
                        transmitter_id: sub.transmitter_id,
                        date_initialized: sub.date,
                    },
                ],
            },
        },
        (err, update) => {
            if (err) {
                res.status(400);
            } else {
                res.status(200).json(update);
            }
        }
    );
});

module.exports = router;
