import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
// const { initializeApp } = require("firebase-admin/app");
const {firebaseConfig}  from './credentials.js'
const router = express.Router();

const authMiddleware = () => {
  // const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  }

  router.use(async (req, res, next) => {
    const { authToken } = req.headers;

    // using auth token extract user details after verification
    if (authToken) {
      try {
        req.user = (await admin.auth().verifyIdToken(authToken)) || {};
      } catch (e) {
        res.sendStatus(400);
      }

      if (req.user) {
        next();
      } else {
        res.sendStatus(401);
      }
    }
  });
};

export default authMiddleware;
