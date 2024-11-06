const router = require('express').Router();

const {
    getAllUser,
    createUser,
} = require('../controllers/UserController');
const {
    verifyToken,
    isAdmin,
} = require('../middlewares/auth');

router.get('/', getAllUser);
router.post('/', verifyToken, isAdmin, createUser);

module.exports = router;