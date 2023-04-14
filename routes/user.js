const express = require('express');

const isAuth = require('../middlewares/is-auth');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/get-users', isAuth, userController.getUsers);

router.post('/add-user', isAuth, userController.addUser);

module.exports = router;
