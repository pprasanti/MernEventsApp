import  authMiddleware   from "./../middleware/authMiddleware.js";
import authController from "../controllers/authController.js";
import express from 'express'
import wrapAsyncErrors from "../utils/AsyncErrorHandle.js";
const router = express.Router()

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/register", 
  [
      authMiddleware.checkDuplicateUsernameOrEmail,
      authMiddleware.checkRolesExisted,
    ],
  wrapAsyncErrors(authController.register))

router.post("/login", wrapAsyncErrors(authController.login))
router.post("/logout", wrapAsyncErrors(authController.logout))


export default router;