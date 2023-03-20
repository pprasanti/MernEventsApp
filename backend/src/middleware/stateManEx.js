import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const router = express.Router()

router.get('/getSignedCookies', (req, res) => {
    // Signed Cookies
    res.cookie('fruit', 'apple', { signed: true })
    res.send({ msg: `Signed Cookies : ` })
})

router.get('/verifyCookies', (req, res) => {
    res.send({ msg: `Signed Cookies : ` })
})

router.get('/setSession', (req, res) => {
    res.send({ msg: `You have viewed this page ${req.session.count} count!!` })
})

router.get('/verifySession', (req, res) => {
    req.session.count = req.session.count ? req.session.count += 1 : 1
    res.send({ msg: `You have viewed this page ${req.session.count} count!!` })
})