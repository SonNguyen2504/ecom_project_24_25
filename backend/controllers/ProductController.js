const Product = require('../models/Product');
const Category = require('../models/Category');

const getAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.find();

        if(!allProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Get all product successfully',
            data: allProduct,
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const createProduct = async (req, res) => { 
    const { name, description, price, image, category } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            image,
            category,
        });

        await newProduct.save();
        console.log(newProduct);

        return res.status(200).json({
            success: true,
            message: 'Create product successfully',
            data: newProduct,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getProductById = async(req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        const category = await Category.findById(product.category);
        product.category = category;

        return res.status(200).json({
            success: true,
            message: 'Get product by id successfully',
            data: product,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;

    try {
        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.image = image;
        product.category = category;

        await product.save();

        return res.status(200).json({
            success: true,
            message: 'Update product successfully',
            data: product,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Delete product successfully',
            data: product,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = {
    getAllProduct,
    createProduct, 
    getProductById,
    updateProduct,
    deleteProduct,
};