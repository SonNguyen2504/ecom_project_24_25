const router = require('express').Router();

const { 
    getAllProduct,
    createProduct,
    getProductById,
    deleteProduct,
} = require('../controllers/ProductController');
const {
    verifyToken,
    isAdmin
} = require('../middlewares/auth');

router.get('/', getAllProduct);
router.post('/', verifyToken, isAdmin, createProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

module.exports = router;  