const express = require('express');

const authController = require('../controllers/auth');

const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.post('/login', authController.postLogin);

router.get('/get-type', isAuth, authController.getType);

module.exports = router;
