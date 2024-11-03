const router = require('express').Router();

const { getAllUser } = require('../controllers/UserController');

router.get('/', getAllUser);

module.exports = router;