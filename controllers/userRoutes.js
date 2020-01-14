const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
// const {createValidation }= require('./../validation')

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

router.post("/create", async (req, res) => {
  // console.log(req.body);
  // const {error} = createValidation(req.body);
  //   if (e) {
  //     return res.status(400).send(error.details[0].message);
  //   }

  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) {
    return res.status(400).send('this email already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const sub = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    birthDate: req.body.birthDate,
    password: hashPassword
  }
  // console.log(sub);
  
  await User.create(sub, (err, addUser) => {
    if (err) {
      console.error(err);    
    } else {
      res.status(200).json(addUser);
    }
  })
});

  router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(400).send('<p>Email or Password is incorrect</p>')
    }

   const validPass = await bcrypt.compare(req.body.password, user.password);
   if (!validPass) {
     return res.status(400).send('<p>Email or Password is incorrect</p>');
   }
   const token = jwt.sign({_id: user._id}, process.env.SECRET)
   res.header('auth-token', token).status(200).json(token);
  })

module.exports = router;