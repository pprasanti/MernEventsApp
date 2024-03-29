import authJwt from "./authJwt.js";
import User from "./../db/mongo/models/userModel.js";
import { ROLES } from "./../db/mongo/models/roleModel.js";

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  // console.log(`req.body.username : ${req.body.username} `)
  // User.findOne({
  //   username: req.body.username
  // })
  //   .exec((err, user) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }

  //     if (user) {
  //       res.status(400).send({ message: "Failed! Username is already in use!" });
  //       return;
  //     }

  // Email
  User.findOne({ email: req.body.email })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  // });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    console.log(req.body.roles.length)
    for (let i = 0; i < req.body.roles.length; i++) {
      console.log(req.body.roles[i])
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const authMiddleware = {
  authJwt,
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

export default authMiddleware