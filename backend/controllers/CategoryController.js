const Category = require('../models/Category');

const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = new Category({
            name,
            description,
        })

        await newCategory.save();
        // console.log(newCategory);

        return res.status(200).json({
            success: true,
            message: 'Create category successfully',
            data: newCategory,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();

        if(!allCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Get all category successfully',
            data: allCategory,
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: `Get category: ${category.name} with id: ${id} successfully`,
            data: category,
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        category.name = name;
        category.description = description;

        await category.save();

        return res.status(200).json({
            success: true,
            message: 'Update category successfully',
            data: category,
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        await category.delete();

        return res.status(200).json({
            success: true,
            message: 'Delete category successfully',
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
}