const router = require('express').Router();

const {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/CategoryController');  

const {
    isAdmin,
    verifyToken,
} = require('../middlewares/auth');

router.get('/', getAllCategory);
router.post('/', createCategory);
router.route('/:id')
    .get(getCategoryById, verifyToken, isAdmin)
    .put(updateCategory, verifyToken, isAdmin)
    .delete(deleteCategory, verifyToken, isAdmin);

module.exports = router;