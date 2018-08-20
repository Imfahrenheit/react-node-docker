const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", async (req, res, next) => {
  const user = await User.find({ email: req.body.email }).exec();

  try {
    if (user.length >= 1) {
      return res.status(409).send({
        message: "This Email already exists"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({
            message: err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            password: hash
          });
          user
            .save()
            .then(result => {
              res.status(201).json({
                message: "User created"
              });
            })
            .catch(err => {
              res.status(500).send({
                message: err
              });
            });
        }
      });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user =await User.find({ email: req.body.email }).exec();

    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed Check email and password "
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed Check email and password "
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            name: user[0].name,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1d"
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          name: user[0].name
        });
      }
      res.status(401).send({
        message: "Auth failed Check email and password "
      });
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: err
      });
    });
});

module.exports = router;
