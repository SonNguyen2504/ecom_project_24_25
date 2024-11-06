const router = require('express').Router();

const {
    createCategory,
    getAllCategory,
} = require('../controllers/CategoryController');   

router.get('/', getAllCategory);
router.post('/', createCategory);

module.exports = router;