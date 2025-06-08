const router = require('express').Router();

const {
    getAllProduct,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProduct,
} = require('../controllers/ProductController');
const {
    verifyToken,
    isAdmin
} = require('../middlewares/auth');

router.get('/', getAllProduct);
router.post('/', verifyToken, isAdmin, createProduct);
router.get('/search', searchProduct);
router.route('/:id')
    .get(getProductById)
    .put(verifyToken, isAdmin, updateProduct)
    .delete(verifyToken, isAdmin, deleteProduct);

module.exports = router;  