const express = require("express");
const router = express.Router();
const Medicine = require('./../models/medicine').default;
const verify = require('./verifyToken');

router.get("/:user_id", verify, (req, res) => {
  Medicine.find({ user_id: req.params.user_id }, (err, meds) => {
      if (err) {
          res.sendStatus(404);
      } else {
          res.status(200).json(meds);
      }
  })
});

router.get("/medOne/:med_id", verify, (req, res) => {
  Medicine.findOne({ _id: req.params.med_id }, (err, medOne) => {
      if (err) {
          res.sendStatus(404);
      } else {
          res.status(200).json(medOne);
      }
  })
});

router.post("/addMed", verify, (req, res) => {
    const sub = {
        user_id: req.body.user_id,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        prescriptionNumber: req.body.prescriptionNumber,
        doctor: req.body.doctor,
        pharmacy: req.body.pharmacy,
        size: req.body.size
    }
  Medicine.create(sub, (err, newMed) => {
      if (err) {
          res.sendStatus(408);
      } else {
          res.status(201).json(newMed);
      }
  })
});

router.put("/malfuncion", verify, (req, res) => {
  Medicine.findOneAndUpdate({ _id: req.body.id}, {
 $set: { malfuncion: req.body.malfuncion }
  }, (err, mal) => {
      if (err) {
          res.status(408).send(' failed to update');
      } else {
          res.status(200).json(mal);
      }
  })
});

router.put("/finish", verify, (req, res) => {
    Medicine.findOneAndUpdate({ _id: req.body.id}, {
   $set: { finished: true }
    }, (err, fin) => {
        if (err) {
            res.status(408).send(' failed to update');
        } else {
            res.status(200).json(fin);
        }
    })
  });

module.exports = router;
