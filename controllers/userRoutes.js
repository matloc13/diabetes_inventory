const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const User = require('./../models/user');
// const verify = require('./verifyToken');
// const {createValidation }= require('./../validation')

router.get("/", (req, res) => {
  // console.log(req.body);
  console.log(req.cookies['x-access-token']);
  
  User.find({}, (err, index) => {
    if (err) {
      console.error(err);
      } else {
      res.send(index).status(200);
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
    userName: req.body.userName,
    age: req.body.age,
    birthDate: req.body.birthDate,
    password: hashPassword
  }
  // console.log(sub);
  
   User.create(sub, (err, addUser) => {
    if (err) {
      res.status(503);    
    } else {
      res.status(200).json(addUser);
    }
  })
});

  router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(400).send('Email or Password is incorrect')
    }
    // console.log(user);
    
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if (!validPass) {
     return res.status(400).send('Email or Password is incorrect');
   }
   const token = jwt.sign({ user }, process.env.SECRET, {expiresIn: '1h' });

   await new Promise(resolve => {
     if (token) {
       return resolve(   
         res.status(200).header('X-Access-Token', token).json({user, token})
         )
     }
   })
    // if (token) {
    //   return    res.status(200).header('X-Access-Token', token).json({user, token});
    // }

    // res.status(200).cookie('x-access-token', token, { sameSite: "Lax", secure: false, httpOnly: true }).json({user, token});

  });

  router.put("/:user_id/update", (req, res) => {
    
    User.findOneAndUpdate(req.params.user_id, req.body, (err, upUser) => {
      if (err) {
        res.status(400);
      } else {
        res.status(200).json(upUser);
      }
    })
  });

module.exports = router;