// import fs from 'fs';
// import admin from 'firebase-admin';
// import express from 'express';

// const router = express.Router();

// const authMiddleware = () => {
//   const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

//   if (admin.apps.length === 0) {
//     admin.initializeApp({
//       credential: admin.credential.cert(credentials),
//     });
//   }

//   router.use(async (req, res, next) => {
//     const { authtoken } = req.headers;

//     // using auth token extract user details after verification
//     if (authtoken) {
//       try {
//         req.user = (await admin.auth().verifyIdToken(authtoken)) || {};
//       } catch (e) {
//         res.sendStatus(400);
//       }

//       if (req.user) {
//         next();
//       } else {
//         res.sendStatus(401);
//       }
//     }
//   });
// };

// export default authMiddleware;
