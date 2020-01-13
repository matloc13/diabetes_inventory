const express = require("express");
const router = express.Router();
const User = require('./../models/user');

router.get("/", (req, res) => {
  console.log(req.body);
  
  User.find({}, (err, index) => {
    if (err) {
      console.error(err);
      } else {
      res.send(index)
    }
  })
});

router.post("/create", (req, res) => {

  User.create(req.body, (err, addUser) => {
    if (err) {
      console.error(err);    
    } else {
      res.status(200).json(addUser)
    }
  })
});

module.exports = router;