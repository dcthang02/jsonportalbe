const express = require('express');

const isAuth = require('../middlewares/is-auth');

const localConfigController = require('../controllers/localconfig');

const router = express.Router();

router.get('/get-versions', isAuth, localConfigController.getVersions);

router.get('/get-version', isAuth, localConfigController.getVersion);

router.post('/add-version', isAuth, localConfigController.addVersion);

module.exports = router;
