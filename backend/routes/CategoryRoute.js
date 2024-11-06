const router = require('express').Router();

const {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/CategoryController');   

router.get('/', getAllCategory);
router.post('/', createCategory);
router.route('/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;